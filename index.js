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
const checkData = require('./utils/checkData');

app.use(express.json({extended: true}));
app.use(cors());

app.use('/api/tables', require('./routes/tables.routes'));
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/img', express.static(path.resolve(__dirname, 'public/www/static/img')));

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

        const statusData = JSON.parse(msg);

        if (statusData.hasOwnProperty('raceDayStatus')) {
            fs.writeFile('todayDB/raceDayStatus.json', msg, (result)=> console.log(result));
            return;
        }

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

        jsonDB.sort((a, b) => a.number < b.number);

        fs.writeFile(`./todayDB/todayPilots.json`, JSON.stringify(jsonDB), (err) => {
            if (err) throw err;
            console.log('file todayPilots.json updated');
            // console.log(data);
        });


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
    // console.log('index.js:83 - process.env.NODE_ENV', process.env.NODE_ENV);
});
