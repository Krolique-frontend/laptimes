const {Router} = require('express');
const url = require('url');
const router = Router();
const fetchData = require('../db/fetchData');
const addNewData = require('../db/addNewData');
const Converter = require('../utils/csvToJSON');
const todayDb = require('../todayDB/todayPilots.json');

router.get('/:pathname', async (req, res) => {
    try {
        const query = url.parse(req.url, true).query;
        const pathname = req.params.pathname ? req.params.pathname : null;
        console.log(pathname);
        let field, fieldValue;

        if (!!Object.keys(query).length) {
            for (let key in query) {
                field = key;
                fieldValue = query[key];
            }
        }

        if (pathname === 'pilotsadmin') res.status(200).json(todayDb);

        // console.log(`get request with params ${field} ${fieldValue}`);

        const data = await fetchData(field, fieldValue, pathname);

        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({message: "Request error, try again maybe", e});
    }
});

router.get('/pilotslist', (req, res) => {
    res.send(require('../todayDB/today1.json'));
});

router.post('/:reqPath', async (req, res) => {
    try {
        const reqPath = req.params.reqPath;

        switch (reqPath) {
            case '/convert-csv':
                const converter = new Converter('../laptimes-ua/brd_2018_09_22.csv');
                converter.convert();
                res.send('converted');
                break;

            case '/writetabletodb':
                const data = JSON.parse(fs.readFileSync("dbJSON.json"));
                await addNewData(data);
                res.send('Данные внесены в базу... но это не точно.');
                break;
        }
    } catch (e) {
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