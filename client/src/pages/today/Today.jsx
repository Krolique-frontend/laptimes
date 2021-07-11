import React, {useCallback, useEffect, useState} from 'react';
import {useHttp} from "../../hooks/http.hook";

import today from './today.module.css';
import Pilot from '../../components/today/Pilot';
import Menu from "../../components/Menu";
import Socket from "../../hooks/websocket";

const socket = new Socket();
let ws = socket.connect();
ws.onopen = socket.open();
ws.onclose = function(){
    ws = socket.connect();
    ws.onopen = socket.open();
};

export function Today() {
    const listUrl = '/api/tables/pilotslist';

    const {request} = useHttp();
    const [list, setList] = useState([]);
    const getList = useCallback(async () => {
        try {
            const data = await request(listUrl, 'GET', null);
            setList(data);
        } catch (e) {
            console.log('ERROR', e);
        }
    }, [request]);

    useEffect(() => getList(), [getList]);

    ws.onmessage = socket.message(setList);

    return (
        <div className={today.table}>
            {/*<h2 className={today.title}>Race Of Masters {new Date().toLocaleDateString()}</h2>*/}
            <header className={today.header}>
                <span className={today.h__item}>№</span>
                <span className={today.h__item}>имя</span>
                <span className={today.h__item}>статус</span>
                <span className={today.h__item}>времена</span>
            </header>

            {list.map(el => <Pilot key={el.number} list={el}/>)}

            <Menu racemode={true}/>
        </div>
    );
}

// export  Today;