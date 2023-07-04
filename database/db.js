const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password1',
    database: 'task_manager',
});

module.exports = db;
