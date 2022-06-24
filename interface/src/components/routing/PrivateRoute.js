import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default () => {
    let { user } = useAuth();
    return user ? <Outlet /> : <Navigate to="/" replace />;
}