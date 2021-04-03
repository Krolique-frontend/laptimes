'use strict';

const fs = require('fs');
const cors = require('cors');
const url = require('url');
const mysql2 = require('mysql2/promise');
const express = require('express');
const app = express();

const DbConfig = require('./dbConfig');
const Converter = require('./utils/csvToJSON');

app.use(cors());
app.use(express.static('public/www'));

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

const urlWare = async (req, res, next) => {
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

    console.log(`get request with params ${field} ${fieldValue}`);

    if (method === 'GET' && pathname === '/initialtable' || pathname === '/event' || pathname === '/car') {
        await res.set({'content-type': 'application/json; charset=utf-8'});
        await fetchTable(field, fieldValue).then(data => res.json(data));
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

    await next();
};

app.use(urlWare);

const unknownPath = (req, res) => {
    res.status(404).send({error: 'no such page/resource'});
};

app.use(unknownPath);

app.listen(80, () => {
    console.log('server running at port 3001...');
});