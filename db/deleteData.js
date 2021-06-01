const mysql2 = require('mysql2/promise');
const DbConfig = require('./dbConfig');

async function deleteData(field, value) {
    const connConf = new DbConfig().connConfig;
    const connection = await mysql2.createConnection(connConf);
    const dataToDelete = new DbConfig().deleteRows(field, value);

    await connection.execute(dataToDelete);

    await connection.end();
}

module.exports = deleteData;