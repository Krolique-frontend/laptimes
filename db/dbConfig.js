const sqlQueries = require('./sqlQueries');
const dotenv = require('dotenv').config();

class DbConfig {
    constructor() {
        this.connConfig = JSON.parse(process.env.DBCONFIG);
    }

    selectString(table, selectRow, selectValue) {
        this._table = table;
        this._selectRow = selectRow;
        this._selectValue = selectValue;

        if (this._selectValue.match(/6km/gi)) {
            // return `SELECT * FROM alltimes WHERE ${this._selectRow} LIKE "%6km%"`;

            return sqlQueries.select6km
                .replace('[table]', this._table)
                .replace('[selectrow]', this._selectRow)
                .replace('[fieldValue]', this._selectValue);
        } else if (this._selectRow !== undefined && this._selectValue !== undefined) {
            return sqlQueries.select
                .replace('[table]', this._table)
                .replace('[selectrow]', this._selectRow)
                .replace('[fieldValue]', this._selectValue);
        } else return sqlQueries.selectDefault;
    }

    updateString(value, newRow, newValue) {
        this._newRow = newRow;
        this._newValue = newValue;
        this._value = value;


        return sqlQueries.update
            .replace('[row]', this._selectRow)
            .replace('[value]', this._value)
            .replace('[newRow]', this._newRow)
            .replace('[newValue]', this._newValue);
    }

    insertTable(object) {
        this._object = object;

        return sqlQueries.insert
            .replace('[date]', this._object.date)
            .replace('[event]', this._object.event)
            .replace('[track]', this._object.track)
            .replace('[pilot]', this._object.pilot)
            .replace('[make]', this._object.make)
            .replace('[model]', this._object.model)
            .replace('[engine]', this._object.engine)
            .replace('[aspiration]', this._object.aspiration)
            .replace('[drivetrain]', this._object.drivetrain)
            .replace('[tyre]', this._object.tyre)
            .replace('[class]', this._object.class)
            .replace('[time]', this._object.time);
    }

    deleteRows(field, value) {
        this._field = field;
        this._value = value;

        return sqlQueries.delete
            .replace('[delRow]', this._field)
            .replace('[delValue]', this._value);
    }

    createUserTable() {
        return sqlQueries.createUsersTable;
    }

    addUser(pass, mail, login) {

        return sqlQueries.addUser
            .replace('[password]', pass)
            .replace('[email]', mail)
            .replace('[login]', login);
    }
}

module.exports = DbConfig;
// (date, event, track, pilot, make, model, engine, aspiration, drivetrain, tyre, class, time)
