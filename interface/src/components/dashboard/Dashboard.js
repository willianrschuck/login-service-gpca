import { useAuth } from "../../hooks/useAuth"
import Shell from "../shell/Shell";
import PublicDashboard from "./PublicDashboard";

export default () => {
    const { user } = useAuth();
    return user ? <Shell /> : <PublicDashboard />
}