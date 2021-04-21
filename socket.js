const Socket = require('ws');
const db = require('./todayDB/today.json');
const pug = require('pug');
const fs = require('fs');
const url = require('url');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.static('public'));
app.set('view engine', 'pug');

app.get('/admin', (req, res) => {
    res.render('admin', {data: db});
});

app.get('/pilotslist', (req, res) => {
    res.send(db);
});

function checkData(arr) {
    return JSON.parse(arr)[0].hasOwnProperty('date');
}

const wss = new Socket.Server({
    port: 3002,
    perMessageDeflate: {
        zlibDeflateOptions: {
            // See zlib defaults.
            chunkSize: 1024,
            memLevel: 7,
            level: 3
        },
        zlibInflateOptions: {
            chunkSize: 10 * 1024
        },
        // Other options settable:
        clientNoContextTakeover: true, // Defaults to negotiated value.
        serverNoContextTakeover: true, // Defaults to negotiated value.
        serverMaxWindowBits: 10, // Defaults to negotiated value.
        // Below options specified as default values.
        concurrencyLimit: 10, // Limits zlib concurrency for perf.
        threshold: 1024 // Size (in bytes) below which messages
        // should not be compressed.
    }
});

wss.on('connection', function connection(ws) {
    console.log(`somebody connected`);

    ws.on('message', function incoming(msg) {
        // let jsonDB = JSON.parse(fs.readFileSync(`./todayDB/today.json`));
        let jsonDB = db;

        if (checkData(msg)) {
            const fileName = JSON.parse(msg)[0].date.split('.').join('_');

            fs.writeFile(`./todayDB/${fileName}.json`, msg, (err) => {
                if (err) throw err;
                // console.log(`file ${fileName}.json - created`);
            });
        } else {
            const adminData = JSON.parse(msg);

            jsonDB.forEach(obj => {
                obj['status'] = adminData.find(el => {
                    return el.name === obj.pilot ? el.status : null;
                });
                obj.status = obj.status.status;
            });

            adminData.forEach(obj => {
                if (obj.times) {
                    jsonDB.forEach(el => {
                        if (el.pilot === obj.name) el['times'] = obj.times;
                    });
                }
            });

            jsonDB.sort((a, b) => {
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

            fs.writeFile(`./todayDB/today.json`, JSON.stringify(jsonDB), (err) => {
                if (err) throw err;
                console.log('file today.json updated');
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


app.listen(3003, (err) => {
    if (err) throw err;
    console.log('server started on port 3003');
});