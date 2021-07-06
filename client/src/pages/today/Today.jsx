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
            console.log(JSON.stringify(e));
        }
    }, [request]);

    useEffect(() => getList(), [getList]);

    // socket.addEventListener('message', function (event) {
    //     // console.log('Message from server ', JSON.parse(event.data));
    //
    //     if (event.data === '[object Event]') return;
    //     else {
    //         let temp = JSON.parse(event.data);
    //         setList(temp);
    //     }
    // });

    ws.onmessage = socket.message(setList);

    const startDemo = () => {
        const demo = JSON.stringify({demo: 'start'});
        // socket.send(demo);
    };

    return (
        <div className={today.table}>
            <header className={today.header}>
                <span className={today.h__item}>№</span>
                <span className={today.h__item}>имя</span>
                <span className={today.h__item}>статус</span>
                <span className={today.h__item}>времена</span>
            </header>
            {list.map(el => <Pilot key={el.number} list={el}/>)}

            {/*<button className={today.demoButton} onClick={startDemo}>demo</button>*/}

            <Menu racemode={true}/>
        </div>
    );
}

// export  Today;