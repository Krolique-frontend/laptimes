class DbConfig {
    constructor(){
        // for db at https://vh366.timeweb.com/
        this.connConfig = {
            host: '188.225.40.161',
            port: '3306',
            database: "cq61504_laptimes",
            user: "cq61504_laptimes",
            password: "Baseracedays"
        };

        // for local db
        // this.connConfig = {
        //     host: 'localhost',
        //     database: "laptimes",
        //     user: "root",
        //     password: "rhjkbret"
        // };
    }

    selectString(selectRow, selectValue) {
        this._selectRow = selectRow;
        this._selectValue = selectValue;

        if (this._selectValue.match(/6km/gi)) {
            return `SELECT * FROM alltimes WHERE ${this._selectRow} LIKE "%6km%"`;
        }

        else if (this._selectRow !== undefined && this._selectValue !== undefined) {
            return `SELECT * FROM alltimes WHERE ${this._selectRow}="${this._selectValue}"`;
        }

        else return 'SELECT * FROM alltimes';
    }

    updateString(updValue, forRow, forValue) {
        this._forRow = forRow;
        this._forValue = forValue;
        this._updValue = updValue;

        return `UPDATE alltimes SET ${this._selectRow}="${this._updValue}" WHERE ${this._forRow}="${this._forValue}"`;
    }

    insertTable(object) {
        this._object = object;

        return `INSERT INTO alltimes (date, event, track, pilot, make, model, engine, aspiration, drivetrain, tyre, class, time) 
VALUES ('${this._object.date}', '${this._object.event}', '${this._object.track}', '${this._object.pilot}', '${this._object.make}', '${this._object.model}', '${this._object.engine}', '${this._object.aspiration}', '${this._object.drivetrain}', '${this._object.tyre}', '${this._object.class}', '${this._object.time}');`;
    }
}

module.exports = DbConfig;
// (date, event, track, pilot, make, model, engine, aspiration, drivetrain, tyre, class, time)