// backend/services/dbService.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'PASSWORD_KAMU'
});

// CREATE DATABASE
exports.createDatabase = async (dbName) => {
    await pool.query(`CREATE DATABASE \`${dbName}\``);
};

// DELETE DATABASE
exports.deleteDatabase = async (dbName) => {
    await pool.query(`DROP DATABASE \`${dbName}\``);
};

// CREATE USER
exports.createUser = async (username, password) => {
    await pool.query(`CREATE USER '${username}'@'localhost' IDENTIFIED BY '${password}'`);
};

// GRANT ACCESS
exports.grantAccess = async (username, dbName) => {
    await pool.query(`GRANT ALL PRIVILEGES ON \`${dbName}\`.* TO '${username}'@'localhost'`);
};

// LIST DATABASE
exports.listDatabases = async () => {
    const [rows] = await pool.query(`SHOW DATABASES`);
    return rows;
};