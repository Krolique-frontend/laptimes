import React, {useState, useContext} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const {request} = useHttp();
    const [form, setForm] = useState({
        login: '',
        password: ''
    });

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value});
    };

    const loginHandler = async () => {
        try {
            const data = await request('/api/admin/login', 'POST', {...form});
            auth.login(data.token, data.adminName);
        } catch (e) {
            console.log(JSON.stringify(e));
        }
    };

    return (
            <div id="accessPoint">
                <form id="loginForm">
                    <label htmlFor="" className="accessLabel">$login</label>
                    <input
                        type="text"
                        id="login"
                        name="login"
                        className="accessInput"
                        value={form.login}
                        onChange={changeHandler}
                    />

                    <label htmlFor="" className="accessLabel">$password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="accessInput"
                        value={form.password}
                        onChange={changeHandler}
                    />
                </form>
            </div>
    );
};