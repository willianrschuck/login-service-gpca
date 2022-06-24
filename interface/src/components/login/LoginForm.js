import React, { useMemo } from 'react';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Alert,
  Center,
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
  const { user, signIn } = useAuth();

  const form = useForm({
    initialValues: {
      'username': '',
      'password': ''
    }
  });

  const handleSubmit = async ({username, password}) => {
    const [data, error] = await signIn(username, password);
    form.setErrors({ erro: error?.message || '' });
  };

  if (user) {

    const appId = query.get("appId");
    if (appId) {
      window.location.pathname = `/api/login`;
      return null;
    }

    return <Navigate to="/" />;
    
  }

  return (
    <div style={{display: 'grid', placeItems: 'center', height: '100%'}}>
      <Container style={{width: 400}}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Paper withBorder shadow="md" p={30} radius="md">
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
            <Group position="apart" mt="md">
              <Anchor onClick={(event) => event.preventDefault()} href="#" size="sm">
                Esqueceu sua senha?
              </Anchor>
            </Group>
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