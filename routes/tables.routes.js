const {Router} = require('express');
const url = require('url');
const fs = require('fs/promises');
const path = require('path');
const router = Router();
const fetchData = require('../db/fetchData');
const addNewData = require('../db/addNewData');
const deleteData = require('../db/deleteData');
const Converter = require('../utils/csvToJSON');
const todayDb = require('../todayDB/todayPilots.json');
const raceDateState = require("../todayDB/raceDayStatus.json");

router.get('/:pathname', async (req, res) => {
    try {
        const query = url.parse(req.url, true).query;
        const pathname = req.params.pathname ? req.params.pathname : null;
        console.log('tables.riytes.js: request param -', pathname);
        let field, fieldValue;

        if (!!Object.keys(query).length) {
            for (let key in query) {
                field = key;
                fieldValue = query[key];
            }
        }

        if (pathname === 'initialtable') {
            const data = await fetchData(field, fieldValue);

            return res.status(200).json(data);
        }

        else if (pathname === 'track') {
            if (fieldValue === 'nikoring') fieldValue = "никоринг";
            else if (fieldValue === '6km') fieldValue = '6km';
            console.log('tables.routes:35', query, field, fieldValue)

            const data = await fetchData(field, fieldValue);

            console.log('tables.routes:39', data);

            return res.status(200).json(data);
        }

        else if (pathname === 'pilotsadmin' || 'pilotslist') {
            todayDb.forEach(el => {
               if (typeof el.times !== 'object') el.times = [];
            });
            return res.status(200).json(todayDb);
        }
        else if (pathname === 'raceDayStatus') {
            console.log('raceDayStatus request')
            const raceDateState = require('../todayDB/raceDayStatus.json');
            console.log('raceDateState >>>', raceDateState)
            return res.status(200).json(raceDateState);
        }

        // console.log(`get request with params ${field} ${fieldValue}`);
    } catch (e) {
        console.log(e);
        res.status(500).json({message: "Request error, try again maybe", e});
    }
});

router.post('/:reqPath', async (req, res) => {
    try {
        const reqPath = req.params.reqPath;

        switch (reqPath) {
            case 'convert-csv':
                const converter = new Converter('../laptimes-ua/brd_2018_09_22.csv');
                converter.convert();
                res.send('converted');
                break;

            case 'writetabletodb':
                const data = JSON.parse(await fs.readFile('./todayDB/tosql.json'));

                data.forEach(obj => {
                    obj['event'] = 'rom';
                    obj['track'] = 'никоринг';
                });
                // console.log(data);
                // await fs.writeFile('./todayDB/tosql.json', JSON.stringify(data));
                await addNewData(data);
                res.send('Данные внесены в базу... но это не точно, лучше проверьте');
                break;

            case 'deleterows':
                const query = url.parse(req.url, true).query;

                let field, fieldValue;

                if (!!Object.keys(query).length) {
                    for (let key in query) {
                        field = key;
                        fieldValue = query[key];
                    }
                }

                await deleteData(field, fieldValue);

                res.status(200).json({message: "data deleted... but you better check it"});
                break;
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({message: "Request error, try again maybe", e});
    }
});

module.exports = router;

/** http queries
 * initialtable - 6km alltimes
 * track - 6km || nikoring
 * date - list depends on track
 * today
 * admin
 *
 * даты, тачки и прочие обернуть в форму под кнопкой ФИЛЬТРы
 * использовать чекбоксы, values добавлять в строку типа "?param=value&param=value..."
 * по каждому onChange обновлять строку заброса и отправлять на сервер запрос
 */