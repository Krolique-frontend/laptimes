const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const DbConfig = require('../db/dbConfig');
const mysql2 = require('mysql2/promise');
const config = require('config');

router.post('/register', async (req, res) => {
    try {
        const db = new DbConfig();
        const connConf = db.connConfig;
        const connection = await mysql2.createConnection(connConf);

        const email = req.body.email.toLowerCase();
        const password = req.body.password;
        const login = req.body.login.toLowerCase();

        const findUser = db
            .selectString('users', 'email', email)
            .replace('*', 'email');

        let [user] = await connection.execute(findUser);
        user = user.map(u => u.email).join('');

        if (user === email) return res.status(400).json({message: 'User exists'});

        const hashedPassword = await bcrypt.hash(password, 12);
        const addUser = db.addUser(hashedPassword, email, login);
        await connection.execute(addUser);
        await connection.end();

        res.json({message: 'User registered, но это не точно'});

    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'something gone wrong, try again...'});
    }
});

router.post('/login', async (req, res) => {
    try {
        const db = new DbConfig();
        const connConf = db.connConfig;
        const connection = await mysql2.createConnection(connConf);
        const {login, password} = req.body;

        const findUser = db
            .selectString('users', 'login', login);

        let [user] = await connection.execute(findUser);
        user.map(u => {
            user = {login: u.login, password: u.password};
        });

        if (!user) return res.status(400).json({message: 'User not found'});

        const passMatch = await bcrypt.compare(password, user.password);

        if (!passMatch) return res.status(400).json({message: 'incorrect password'});

        const token = jwt.sign(
            {userLogin: user.login},
            config.get('jwtSecret'),
            {expiresIn: '1d'}
        );

        res.json({token, userLogin: user.login});

    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'something gone wrong, try again'});
    }
});

router.post('/createuserstable', async (req, res) => {
    try {
        const db = new DbConfig();
        const connConf = db.connConfig;
        const connection = await mysql2.createConnection(connConf);

        await connection.execute(db.createUserTable());
        await connection.end();

        res.json({message: 'table created'});
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'something gone wrong, try again'});
    }
});

module.exports = router;