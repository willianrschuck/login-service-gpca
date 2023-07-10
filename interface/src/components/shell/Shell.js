import { Button, Center, Container, Title } from "@mantine/core";
import { useAuth } from "../../hooks/useAuth";

export default () => {
    const { user, signOut } = useAuth();

    return (
        <div style={{ display: 'grid', placeItems: 'center', height: '100%' }}>
            <Container>
                <Title size="x-large" align="center">Você está logado como "{ user.login } ({ user.e_mail })" e pronto para acessar as demais aplicações.</Title>
                <Center mt="md">
                    <Button onClick={signOut}>Sair</Button>
                </Center>
            </Container>
        </div>
    )
}