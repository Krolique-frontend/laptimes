const fs = require('fs');
const csv = require('csv-parser');

module.exports = {
    constructor(csvFilePath) {
        this._csvPath = csvFilePath;
        this._arr = [];
    },

    convert() {
        fs.createReadStream(this._csvPath)
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
    }
};