'use strict';

const express = require('express');
const app = express();
const mysql2 = require('mysql2/promise');
const DbConfig = require('./dbConfig');
const csv = require('csv-parser');
const fs = require('fs');
const cors = require('cors');
const url = require('url');

app.use(cors());
app.use(express.static('public/www'));

app.listen(3001, () => {
    console.log('server running at port 3001...');
});

async function fetchTable(f, v) {
    let field = f ? f : 'track';
    let value = v ? v : '6km classic';
    const data = new DbConfig().selectString(field, value);
    const connConf = new DbConfig().connConfig;
    console.log('fetchTable() data:', data);

    const connection = await mysql2.createConnection(connConf);
    const [rows] = await connection.execute(data);
    connection.end();

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

const converter = (csvFilePath) => {
    const arr = [];

    fs.createReadStream(csvFilePath)
        .pipe(csv({separator: ';'}))
        .on('data', result => arr.push(result))
        .on('end', () => {
            // console.log(arr);

            fs.writeFile(`dbJSON.json`, JSON.stringify(arr), (err) => {
                if (err) console.log('ERROR -', err);
                else console.log('Document succsessfully converted!');
                // console.log(arr);
            });
        });
};

app.get('/', (req, res) => {
    console.log('lalala');
});

app.get('/convert-csv', (req, res) => {
    converter('../laptimes-ua/brd_2018_09_22.csv');
});

// app.get('/initialtable', (req, res) => {
//     // sending initial react-app page when opening site/app
//     res.set({'content-type': 'application/json; charset=utf-8'});
//     fetchTable().then(data => res.json(data));
// });

// app.get('/event', (req, res) => {
//     let query = url.parse(req.url, true).query;
//     let field, fieldValue;
//     for (let key in query) {
//         field = key;
//         fieldValue = query[key];
//     }
//     console.log(`get request with params ${field} ${fieldValue}`);
//
//     res.set({'content-type': 'application/json; charset=utf-8'});
//     fetchTable(field, fieldValue).then(data => res.json(data));
// });
//
// app.get('/car', (req, res) => {
//     let query = url.parse(req.url, true).query;
//     let field, fieldValue;
//     for (let key in query) {
//         field = key;
//         fieldValue = query[key];
//     }
//
//
//     console.log(`get request with params ${field} ${fieldValue}`);
//
//     res.set({'content-type': 'application/json; charset=utf-8'});
//     fetchTable(field, fieldValue).then(data => res.json(data));
// });

const urlWare = async (req, res, next) => {
    const method = await req.method;
    const pathname = await url.parse(req.url, true).pathname;
    const query = await url.parse(req.url, true).query;

    let field, fieldValue;

    for (let key in query) {
        field = key;
        fieldValue = query[key];
    }

    console.log(`get request with params ${field} ${fieldValue}`);

    if (method === 'GET') {
        switch (pathname) {
            case '/initialtable':
                await res.set({'content-type': 'application/json; charset=utf-8'});
                await fetchTable().then(data => res.json(data));
        }
    }

    // await res.set({'content-type': 'application/json; charset=utf-8'});
    // await fetchTable(field, fieldValue).then(data => res.json(data));

    await next();
};

app.use(urlWare);

app.post('/writetabletodb', (req, res) => {
    const data = JSON.parse(fs.readFileSync("dbJSON.json"));
    addNewData(data);
    res.send('Данные внесены в базу... но это не точно.');
});

const unknownPath = (req,res) => {
    res.status(404).send({error: 'no such page/resource'});
};

app.use(unknownPath);