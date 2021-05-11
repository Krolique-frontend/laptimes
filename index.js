'use strict';

const http = require('http');
const fs = require('fs');
const cors = require('cors');
const url = require('url');
const mysql2 = require('mysql2/promise');
const express = require('express');
const app = express();
const server = http.createServer(app);
const Socket = require('ws');
const db = require('./todayDB/today1.json');
const pug = require('pug');

const DbConfig = require('./dbConfig');
const Converter = require('./utils/csvToJSON');
const wss = new Socket.Server({server});

app.use(cors());
app.use(express.static('public/www'));
app.set('view engine', 'pug');
app.use(handleRequest);

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
        // let jsonDB = JSON.parse(fs.readFileSync(`./todayDB/today.json`));
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

async function handleRequest(req, res, next) {

    const method = req.method;
    const pathname = url.parse(req.url, true).pathname;
    const query = url.parse(req.url, true).query;

    let field, fieldValue;

    if (!!Object.keys(query).length) {
        for (let key in query) {
            field = key;
            fieldValue = query[key];
        }
    }

    // console.log(`get request with params ${field} ${fieldValue}`);

    if (method === 'GET' && pathname === '/initialtable' || pathname === '/event' || pathname === '/car') {

        await fetchTable(field, fieldValue)
            .then(data => {
                res.set({'content-type': 'application/json; charset=utf-8'});
                res.json(data);
            })
            .catch(err => console.log('fetchtableError', err));
    }
    else if (method === 'GET' && pathname === '/admin') res.render('admin', {data: db});
    else if (method === 'GET' && pathname === '/pilotslist') res.send(db);
    else {
        await res.status(404).render('page404');
    }

    if (method === 'POST') {
        switch (pathname) {
            case '/convert-csv':
                const converter = new Converter('../laptimes-ua/brd_2018_09_22.csv');
                converter.convert();
                res.send('converted');
                break;

            case '/writetabletodb':
                const data = JSON.parse(fs.readFileSync("dbJSON.json"));
                addNewData(data);
                res.send('Данные внесены в базу... но это не точно.');
                break;
        }
    }
    next();
}

async function fetchTable(f, v) {

    let field = f ? f : 'track';
    let value = v ? v : '6km Classic';
    const data = new DbConfig().selectString(field, value);
    const connConf = new DbConfig().connConfig;
    console.log('fetchTable() data:', data);

    const connection = await mysql2.createConnection(connConf);
    const [rows] = await connection.execute(data);
    await connection.end();

    const outputData = [];
    let tempObj = {};

    for (let i = 0; i < rows.length; i++) {

        for (let key in rows[i]) {
            let x = rows[i];

            if (x.tyre.search(/\n/)) {
                x.tyre = x.tyre.replace(/\n/, ' ');
            }
            tempObj[key] = x[key];
        }
        outputData.push(tempObj);
        tempObj = {};
    }
    // console.log(outputData);
    return outputData;
}

async function addNewData(newData) {
    const connConf = new DbConfig().connConfig;
    const data = newData;

    const connection = await mysql2.createConnection(connConf);

    data.forEach(obj => {
        const insertQuery = new DbConfig().insertTable(obj);
        // console.log(insertQuery);
        connection.execute(insertQuery.toString());
    });

    await connection.end();
}

server.listen(3001, (err) => {
    if (err) throw err;
    console.log('server running at port 3001...');
});