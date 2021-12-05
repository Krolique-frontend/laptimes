import React, {useCallback, useContext, useEffect, useState} from 'react';
import {BrowserRouter as Router, Link, Redirect, Route, Switch, useHistory} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import admin from './admin.module.css';
import RacersDataTab from "../components/admin/RacersDataTab";
import StatusTab from "../components/admin/StatusTab";

import Socket from "../hooks/websocket";

const socket = new Socket();
let ws = socket.connect();
ws.onopen = socket.open();

export const AdminPage = () => {
        ws.onclose = function(){
            ws = socket.connect();
            ws.onopen = socket.open();
        };

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
        ws.send(JSON.stringify(data));
    };

    return (
        <Router>
            <header className={admin.header}>
                <nav>
                    <Link to="/admin/status" className={admin.navLink}>Времена</Link>
                    <Link to="/admin/racersData" className={admin.navLink}>Админка</Link>
                    <button onClick={logoutHandler} className={admin.button}>Logout</button>
                </nav>
            </header>

            <Switch>
                <Route path="/admin/status">
                    <StatusTab list={pilotsList} sendWs={sendData}/>
                </Route>

                <Route path="/admin/racersData">
                    <RacersDataTab addNewRacer={sendData} switchRaceDay={sendData}/>
                </Route>

                <Redirect to="/admin/status"/>
            </Switch>
        </Router>
    );
};