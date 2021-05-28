import React, {useState, useEffect, useCallback} from 'react';
import {useHttp} from "../../hooks/http.hook";

import today from './today.module.css';
import Pilot from '../../components/today/Pilot';
import Menu from "../../components/Menu";

// const socket = new WebSocket('ws://localhost:3001/'); // dev
const socket = new WebSocket('ws://35.195.249.169:8080/'); // gcloud compute engine prod

socket.addEventListener('open', function (event) {
    // socket.send('Hello Server!');
    console.log('connected to server');
});

export function Today() {
    // const listUrl = 'http://localhost:3001/api/tables/pilotslist'; // dev
    const listUrl = '/api/tables/pilotslist'; // gcloud prod

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


    socket.addEventListener('message', function (event) {
        // console.log('Message from server ', event.data);

        if (event.data === '[object Event]') return;
        else {
            let temp = JSON.parse(event.data);
            setList(temp);
        }
    });

    const startDemo = () => {
        const demo = JSON.stringify({demo: 'start'});
        socket.send(demo);
    };

    return (
        <div className={today.table}>
            {list.map(el => <Pilot key={el.id} list={el}/>)}

            {/*<button className={today.demoButton} onClick={startDemo}>demo</button>*/}

            <Menu racemode={true}/>
        </div>
    );
}

// export  Today;