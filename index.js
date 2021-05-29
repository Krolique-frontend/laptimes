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
const sortByStatus = require('./utils/sortByStatus');
const checkData = require('./utils/checkData');
const todayDemo = require('./utils/todayDemo');

app.use(express.json({extended: true}));
app.use(cors());

app.use('/api/tables', require('./routes/tables.routes'));
app.use('/api/admin', require('./routes/admin.routes'));

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

wss.on('connection', function connection(ws) {
    console.log(`Incoming websocket connection...`);

    ws.on('message', function incoming(msg) {
        let jsonDB = require('./todayDB/todayPilots.json');

        if (checkData(msg) === 'start') {
            console.log('>> checkData(msg)', checkData(msg));
            todayDemo();
        }

        else if (checkData(msg)) {
            const fileName = JSON.parse(msg)[0].date.split('.').join('_');

            fs.writeFile(fileName, msg, (err) => {
                if (err) throw err;
                // console.log(`file ${fileName}.json - created`);
            });
        } else {
            const statusData = JSON.parse(msg);

            jsonDB.forEach(obj => {
                obj['status'] = statusData.find(el => {
                    return el.name === obj.pilot ? el.status : null;
                });
                if (obj.status) obj.status = obj.status.status;
            });

            statusData.forEach(obj => {
                if (obj.times) {
                    jsonDB.forEach(el => {
                        if (el.pilot === obj.name) el['times'] = obj.times;
                    });
                }
            });

            sortByStatus(jsonDB);

            fs.writeFile(`./todayDB/todayPilots.json`, JSON.stringify(jsonDB), (err) => {
                if (err) throw err;
                console.log('file todayPilots.json updated');
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

const PORT = config.get('port') || 3001;

server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`server running at port ${PORT}...`);
});
