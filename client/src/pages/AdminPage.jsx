import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
    Redirect,
    useHistory
} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import admin from './admin.module.css';
import RacersDataTab from "../components/admin/RacersDataTab";
import StatusTab from "../components/admin/StatusTab";

// const socket = new WebSocket('ws://localhost:3001/'); // dev
const socket = new WebSocket('ws://35.195.249.169:8080/'); // gcloud compute engine prod

socket.addEventListener('open', function (event) {
    // socket.send('Hello Server!');
    console.log('connected to server');
});

export const AdminPage = () => {
    const {request} = useHttp();
    const history = useHistory();
    const auth = useContext(AuthContext);

    const [pilotsList, setList] = useState();

    const getList = useCallback(async () => {
        try {
            const data = await request('/api/tables/pilotsadmin', 'GET', null);
            setList(data);
        } catch (e) {
            console.log(JSON.stringify(e));
        }
    }, [request]);

    useEffect(() => getList(), [getList]);

    const logoutHandler = event => {
        event.preventDefault();
        auth.logout();
        history.push('/');
    };

    const sendData = (data) => {
        socket.send(JSON.stringify(data));
    };

    return (
        <Router>
            <header className={admin.header}>
                <nav>
                    <Link to="/admin/status" className={admin.navLink}>Статусы/Времена</Link>
                    <Link to="/admin/racersData" className={admin.navLink}>Гонщиков форма</Link>
                    <button onClick={logoutHandler} className={admin.button}>Logout</button>
                </nav>
            </header>

            <Switch>
                <Route path="/admin/status">
                    <StatusTab list={pilotsList} sendWs={sendData}/>
                </Route>

                <Route path="/admin/racersData">
                    <RacersDataTab sendDb={sendData} />
                </Route>

                <Redirect to="/admin/racersData" />
            </Switch>
        </Router>
    );
};