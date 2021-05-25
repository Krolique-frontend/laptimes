import React, {useState, useEffect} from 'react';
import axios from "axios";

import today from './today.module.css';
import Pilot from '../../components/Pilot';

const socket = new WebSocket('ws://localhost:3001/'); // dev
// const socket = new WebSocket('ws://35.195.249.169:8080/'); // gcloud compute engine prod

socket.addEventListener('open', function (event) {
    // socket.send('Hello Server!');
    console.log('connected to server');
});

const Today = () => {
    const listUrl = 'http://localhost:3001/api/tables/pilotslist'; // dev
    // const listUrl = '/api/tables/pilotslist'; // gcloud prod
    const [list, setList] = useState([]);

    useEffect(() => {
        axios
            .get(listUrl)
            .then(res => {
                console.log(res.data);
                setList(res.data.sort((a, b) => {
                    return +a.number > +b.number ? 1 : -1;
                }));
            })
            .catch(err => console.log(err));
    }, []);



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
            {list.map(el => <Pilot list={el}/>)}

            <button className={today.demoButton} onClick={startDemo}>demo</button>
        </div>
    )
};

export default Today;