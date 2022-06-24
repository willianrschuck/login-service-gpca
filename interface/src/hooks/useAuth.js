import jwtDecode from "jwt-decode";
import { createContext, useContext } from "react";
import { login } from "../service/user-service";
import { useLocalStorage } from './useLocalStorage'

const authContext = createContext();

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
    return useContext(authContext);
}

function useProvideAuth() {
    const [user, setUser] = useLocalStorage('user');
    const [jwt, setJwt] = useLocalStorage('jwt');

    const signIn = async (username, password) => {
        const [data, err] = await login(username, password);
        if (!err) {
            setJwt(data.token)
            setUser(jwtDecode(data.token));
        }
        return [data, err];
    }

    const signOut = () => {
        setUser(null);
        setJwt(null);
    }

    return {
        user,
        jwt,
        signIn,
        signOut
    }

}