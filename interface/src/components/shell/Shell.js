import { AppShell } from "@mantine/core"
import NavbarMinimal from "./Navbar"

export default ({ children }) => {
    return (
        <AppShell
            padding="md"
            navbar={<NavbarMinimal />}
            styles={(theme) => ({
                main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
            })}
        >
            {children}
        </AppShell>
    )
}