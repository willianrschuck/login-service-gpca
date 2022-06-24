import { AppShell } from "@mantine/core"
import NavbarMinimal from "../shell/Navbar"
import Shell from "../shell/Shell"
import UsersList from "./UsersList"

export default () => {
    return (
        <Shell>
            <UsersList />
        </Shell>
    )
}