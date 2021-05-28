import {useCallback, useState, useEffect} from 'react';

const storageName = 'userData';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [ready, setReady] = useState(false);
    const [userLogin, setUserLogin] = useState(null);

    const login = useCallback((jwtToken, name) => {
        setToken(jwtToken);
        setUserLogin(name);

        localStorage.setItem(storageName, JSON.stringify({userLogin: name, token: jwtToken}));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserLogin(null);

        localStorage.removeItem(storageName);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));

        if (data && data.token) {
            login(data.token, data.userLogin);
        }

        setReady(true);
    }, [login]);

    return {login, logout, token, userLogin, ready};
};