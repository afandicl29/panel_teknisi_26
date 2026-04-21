// backend/controllers/dbController.js
const db = require('../services/dbService');

exports.createDb = async (req, res) => {
    const { name } = req.body;
    await db.createDatabase(name);
    res.json({ success: true });
};

exports.deleteDb = async (req, res) => {
    const { name } = req.body;
    await db.deleteDatabase(name);
    res.json({ success: true });
};

exports.createUser = async (req, res) => {
    const { username, password } = req.body;
    await db.createUser(username, password);
    res.json({ success: true });
};

exports.grant = async (req, res) => {
    const { username, dbName } = req.body;
    await db.grantAccess(username, dbName);
    res.json({ success: true });
};

exports.list = async (req, res) => {
    const data = await db.listDatabases();
    res.json(data);
};