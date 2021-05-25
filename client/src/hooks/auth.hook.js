import {useCallback, useState, useEffect} from 'react';

const storageName = 'userData';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [ready, setReady] = useState(false);
    const [adminName, setAdminName] = useState(null);

    const login = useCallback((jwtToken, name) => {
        setToken(jwtToken);
        setAdminName(name);

        localStorage.setItem(storageName, JSON.stringify({adminName: name, token: jwtToken}));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setAdminName(null);

        localStorage.removeItem(storageName);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));

        if (data && data.token) {
            login(data.token, data.adminName);
        }

        setReady(true);
    }, [login]);

    return {login, logout, token, adminName, ready};
};