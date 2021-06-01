const sqlQueries = {
    select: `SELECT * FROM [table] WHERE [selectrow] in ("[fieldValue]")`,
    select6km: `SELECT * FROM alltimes WHERE [selectrow] in ("[fieldValue]")`,
    selectDefault: `SELECT * FROM alltimes`,
    insert: `INSERT INTO alltimes (date, event, track, pilot, make, model, engine, aspiration, drivetrain, tyre, class, time) 
VALUES ('[date]', '[event]', '[track]', '[pilot]', '[make]', '[model]', '[engine]', '[aspiration]', '[drivetrain]', '[tyre]', '[class]', '[time]');`,
    update: `UPDATE alltimes SET [row]="[value]" WHERE [newRow]="[newValue]";`,
    delete: `DELETE FROM alltimes.alltimes WHERE [delRow]="[delValue]"`,
    createUsersTable: `CREATE TABLE users (Id INT PRIMARY KEY AUTO_INCREMENT, password VARCHAR(20) NOT NULL, email VARCHAR(255) UNIQUE NOT NULL, login VARCHAR(20) NULL);`,
    addUser: `INSERT INTO users (password, email, login) VALUES ('[password]', '[email]', '[login]')`
};

module.exports = sqlQueries;