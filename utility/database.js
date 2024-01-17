const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'node-app',
    user: 'root',
    password: '654333'
});

module.exports = connection.promise();