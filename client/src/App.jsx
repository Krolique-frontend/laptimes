import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";

import './App.css';

function App() {
    const {login, logout, token, userLogin} = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);

    return (
        <AuthContext.Provider value={{token, login, logout, userLogin, isAuthenticated}}>
            <Router>
                <div>{routes}</div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
