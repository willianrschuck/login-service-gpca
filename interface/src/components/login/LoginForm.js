import React, { useEffect, useMemo, useState } from 'react';
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Text,
  Container,
  Group,
  Button,
  Title
} from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default () => {

  const query = useQuery();
  const [ app, setApp ] = useState({
    name: "GPCA",
    background: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  });
  const { user, jwt, validating, signIn, signOut } = useAuth();
  const [ loggedInLocally, setLoggedInLocally ] = useState(user && !query.has('appId'))

  const form = useForm({
    initialValues: {
      'username': '',
      'password': ''
    }
  });

  useEffect(() => {

    document.title = app.name;

    if (query.has('appId')) {
      fetch("/api/applictions/"+query.get("appId"))
        .then(res => {
          if (res.status != 200) {
            throw "Login inválido!";
          }
          return res.json()
        })
        .then(json => {
          setApp(json);
        })
        .catch(e => {
          signOut();
        });
    }
  }, [jwt, validating]);

  useEffect(() => {
    if (user && app?.callback_url && !validating) {
      window.location.href = app.callback_url + "?token=" + jwt;
    }
  }, [user, app, validating]);

  useEffect(() => {
    setLoggedInLocally(user && !query.has('appId'));
  }, [user])

  const handleSubmit = async ({username, password}) => {
    const [data, error] = await signIn(username, password);
    form.setErrors({ erro: error?.message || '' });
  };

  return loggedInLocally ? <Navigate to="/" /> : (
    <div style={{ 
        backgroundImage: `url('${app.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'grid', placeItems: 'center', height: '100%' }}>
      <Container style={{width: 400}}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Paper withBorder shadow="md" p={30} radius="md">
            <Text
              size='sm'
              weight={700}
              variant="gradient"
              gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
            >
              Realizando login em
            </Text>
            <Title order={1} mb="md">{ app.name }</Title>
            <TextInput 
              label="Usuário"
              placeholder="Seu nome de usuário"
              required
              {...form.getInputProps("username")}
            />
            <PasswordInput
              label="Senha"
              placeholder="Sua senha"
              required
              mt="md"
              {...form.getInputProps('password')}
            />
            <Button fullWidth mt="md" type="submit">
              Entrar
            </Button>
            {form.getInputProps('erro').error && 
              <Text align='center' size='sm' mt='xs' color="red">{form.getInputProps('erro').error}</Text>
            }
          </Paper>
        </form>
      </Container>
    </div>
  );

}