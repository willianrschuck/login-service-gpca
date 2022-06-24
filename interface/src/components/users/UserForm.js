import { ActionIcon, Alert, Button, Container, Paper, Space, Tabs, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AlertCircle, DeviceFloppy, Paperclip, Settings, User } from "tabler-icons-react";
import { useAuth } from "../../hooks/useAuth";
import { getUserById, persistUser } from "../../service/user-service";
import Shell from "../shell/Shell";
import Toolbar from "../shell/Toolbar";

export default () => {

  const { jwt } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const form = useForm({
    initialValues: {
      username: '',
      email: '',
      password: ''
    }
  });

  useEffect(async () => {
    if (id) {
      const [data, err] = await getUserById(id);
      if (err) return;
      form.setValues(data);
    }
  }, [])

  const handleSubmit = async (user) => {
    const [data, error] = await persistUser(user, jwt);
    if (error) {
      console.log(error)
      form.setErrors({ erro: error?.message || '' });
    } else {
      navigate('/users');
    }
  };

  return <Shell>
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Toolbar>
        <Button type="submit" leftIcon={<DeviceFloppy size={20} />}>Salvar</Button>
      </Toolbar>
        
      <Tabs>
        <Tabs.Tab label="Geral" icon={<User size={14} />}><UserForm form={form}/></Tabs.Tab>
        <Tabs.Tab label="Atributos" icon={<Paperclip size={14} />}>attrs</Tabs.Tab>
        <Tabs.Tab label="Ações" icon={<Settings size={14} />}>Settings tab content</Tabs.Tab>
      </Tabs>
    </form>
  </Shell>;

}

const UserForm = ({form}) => {

  return (
    <div>

        {form.getInputProps('erro').error && 
          <Alert icon={<AlertCircle size={16} />} color="red">
            {form.getInputProps('erro').error}
          </Alert>
        }

        <TextInput
          label="Usuário"
          placeholder="Seu nome de usuário"
          disabled={(form.getInputProps("id").value) != null}
          required={(form.getInputProps("id").value) == null}
          {...form.getInputProps("username")}
        />
        <Space h={15} />
        <TextInput
          label="E-mail"
          placeholder="Seu e-mail"
          required
          {...form.getInputProps("email")}
        />
        <Space h={15} />
        <TextInput
          label="Senha"
          placeholder="Senha"
          required
          {...form.getInputProps("password")}
        />

    </div>
  );

}