import React, {useContext, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import styles from './Auth.module.css';

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const {request} = useHttp();
    const [form, setForm] = useState({
        login: '',
        password: ''
    });

    const changeHandler = event => {
        if (event.target.value.toLowerCase() === 'go back') {
            window.history.back();
        }
        setForm({...form, [event.target.name]: event.target.value});
    };

    const loginHandler = async () => {
        try {
            const data = await request('/api/admin/login', 'POST', {...form});
            auth.login(data.token, data.userLogin);
        } catch (e) {
            console.log(JSON.stringify(e));
        }
    };

    const keyPressHandler = async event => {
        loginHandler();
    };

    return (
        <div id={styles.accessPoint}>
            <form id={styles.loginForm}>
                <div>
                    <label htmlFor="login" className={styles.accessLabel}>$login</label>
                    <input
                        type="text"
                        id={styles.login}
                        name="login"
                        autoComplete="off"
                        autoFocus="autofocus"
                        required
                        className={styles.accessInput}
                        value={form.login}
                        onChange={changeHandler}
                    />
                    <span className={styles.cursor}>{form.login}</span>
                </div>
                <div>
                    <label
                        htmlFor="password"
                        className={form.login.length <= 7 ? styles.hide : styles.accessLabel}
                    >$password</label>
                    <input
                        type="password"
                        autoComplete="off"
                        required
                        id={styles.password}
                        name="password"
                        className={form.login.length <= 7 ? styles.hide : styles.accessInput}
                        value={form.password}
                        onChange={changeHandler}
                        onKeyPress={keyPressHandler}
                    />
                    <span className={styles.cursor}></span>

                </div>
            </form>
            <span className={styles.tip}>Шобы выйти напишите go back в поле login</span>
        </div>
    );
};