const mysql2 = require('mysql2/promise');
const DbConfig = require('./dbConfig');

async function fetchData(f, v) {
    try {
        let field = f ? f : 'track';
        let value = v ? v : '6km';
        let table = 'alltimes';
        console.log('fetchtable.js:9', field, value)

        const data = new DbConfig().selectLike(table, field, value);
        const connConf = new DbConfig().connConfig;
        console.log('fetchTable() data:', data);
        // console.log('conn config', connConf);

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
    } catch (e) {
        console.log(e);
    }
}

module.exports = fetchData;
