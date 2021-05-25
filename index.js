'use strict';

const http = require('http');
const fs = require('fs');
const express = require('express');
const app = express();
const server = http.createServer(app);
const Socket = require('ws');
const config = require('config');
const cors = require('cors');
const path = require('path');
const wss = new Socket.Server({server});
const db = require('./todayDB/today.json');

app.use(express.json({extended: true}));
app.use(cors());

app.use(express.static('./public/www'));
app.set('view engine', 'pug');

app.use('/api/tables', require('./routes/tables.routes'));
app.use('/api/admin', require('./routes/admin.routes'));

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

function checkData(arr) {
    if (JSON.parse(arr).demo === 'start') return 'start';
    else return JSON.parse(arr)[0].hasOwnProperty('date');
}

function sortByStatus(arr) {
    return arr.sort((a, b) => {
        let as = a.status === 'session'
            ? 3
            : a.status === 'standby'
                ? 2
                : 1;

        let bs = b.status === 'session'
            ? 3
            : b.status === 'standby'
                ? 2
                : 1;

        return as > bs ? -1 : 1;
    });
}

wss.on('connection', function connection(ws) {
    console.log(`somebody connected`);

    function random(num) {
        return Math.floor(Math.random() * num);
    }

    function todayDemo() {
        const list = db.map(el => {
            el.status = 'park';
            el.times = [];
            return el;
        });

        let p1 = list[5];
        let p2 = list[7];
        let p3 = list[12];
        let p4 = list[28];
        let p5 = list[20];
        let p6 = list[25];
        let p7 = list[14];
        let p8 = list[6];
        let p9 = list[3];

        setTimeout(() => {
            [p1, p2, p3].forEach(p => p.status = 'session');
            [p4, p5, p6].forEach(p => p.status = 'standby');
            sortByStatus(list);

            wss.clients.forEach(function each(client) {
                client.send(JSON.stringify(list));
            } );
        }, 3000);

        setTimeout(() => {
            [p1, p2, p3].forEach(p => {
                let time = `01:0${random(2)}:${
                    random(59) < 10 ? `0${random(9)}` : random(59)
                }`;

                p.times.push(time);
            });

            wss.clients.forEach(function each(client) {
                client.send(JSON.stringify(list));
            } );
        }, 10000);

        setTimeout(() => {
            [p1, p2, p3].forEach(p => {
                p.status = 'park';
            });

            [p4, p5, p6].forEach(p => {
                p.status = 'session';
            });

            [p7, p8, p9].forEach(p => {
                p.status = 'standby';
            });

            wss.clients.forEach(function each(client) {
                client.send(JSON.stringify(list));
            } );
        }, 14000);

        setTimeout(() => {
            sortByStatus(list);

            wss.clients.forEach(function each(client) {
                client.send(JSON.stringify(list));
            } );
        }, 17500);

        setTimeout(() => {
            [p4, p5, p6].forEach(p => {
                let time = `01:0${random(2)}:${
                    random(59) < 10 ? `0${random(9)}` : random(59)
                }`;

                p.times.push(time);
            });

            wss.clients.forEach(function each(client) {
                client.send(JSON.stringify(list));
            } );
        }, 21000);

        setTimeout(() => {
            [p4, p5, p6].forEach(p => {
                p.status = 'park';
            });

            [p7, p8, p9].forEach(p => {
                p.status = 'session';
            });

            sortByStatus(list);

            wss.clients.forEach(function each(client) {
                client.send(JSON.stringify(list));
            } );
        }, 24000);
    }

    ws.on('message', function incoming(msg) {
        let jsonDB = db;

        if (checkData(msg) === 'start') {
            console.log('>> checkData(msg)', checkData(msg));
            todayDemo();
        }

        else if (checkData(msg)) {
            // const fileName = JSON.parse(msg)[0].date.split('.').join('_');

            fs.writeFile(`./todayDB/today1.json`, msg, (err) => {
                if (err) throw err;
                // console.log(`file ${fileName}.json - created`);
            });
        } else {
            const statusData = JSON.parse(msg);

            jsonDB.forEach(obj => {
                obj['status'] = statusData.find(el => {
                    return el.name === obj.pilot ? el.status : null;
                });
                obj.status = obj.status.status;
            });

            statusData.forEach(obj => {
                if (obj.times) {
                    jsonDB.forEach(el => {
                        if (el.pilot === obj.name) el['times'] = obj.times;
                    });
                }
            });

            sortByStatus(jsonDB);

            fs.writeFile(`./todayDB/today1.json`, JSON.stringify(jsonDB), (err) => {
                if (err) throw err;
                console.log('file today1.json updated');
                // console.log(data);
            });
        }

        wss.clients.forEach(function each(client) {
            // console.log(client._isServer);
            if (client.readyState === Socket.OPEN) {

                // console.log('data to send >>', jsonDB);
                client.send(JSON.stringify(jsonDB));
            }
        });
    });
});

const PORT = config.get('port') || 4321;

app.listen(3001, (err) => {
    if (err) throw err;
    console.log(`server running at port ${PORT}...`);
});
