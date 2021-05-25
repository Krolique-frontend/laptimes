const mysql2 = require('mysql2/promise');
const DbConfig = require('./dbConfig');

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

module.exports = addNewData;