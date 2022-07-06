import jwtDecode from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
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
    const [validating, setValidating] = useState(true);
    
    useEffect(() => {
        if (user && jwt) {

            console.log(jwt)

            fetch("http://localhost:3001/api/validate",
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({
                        token: jwt
                    })
                }) 
                .then((res) => {
                    if (res.status != 200) {
                        setUser(null);
                        setJwt(null);
                    }
                    setValidating(false);
                })
                .catch((e) => {
                    setUser(null);
                    setJwt(null);
                    setValidating(false);
                });
                
        } else {

            setValidating(false);

        }
    }, []);

    const signIn = async (username, password) => {
        const [data, err] = await login(username, password);
        if (!err) {
            setJwt(data.token)
            setUser(jwtDecode(data.token));
        }
        return [data, err];
    }

    const signOut = async () => {

        await fetch("http://localhost:3001/api/logout",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                token: jwt
            })
        });

        setUser(null);
        setJwt(null);
    }

    return {
        user,
        jwt,
        validating,
        signIn,
        signOut
    }

}