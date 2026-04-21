const express = require('express');
const router = express.Router();
const fs = require('fs');
const resolveSafe = require('../middleware/safePath');

// 📁 LIST
router.get('/list', (req, res) => {
    try {
        const dirPath = resolveSafe(req.query.path);

        fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
            if (err) return res.status(500).json(err);

            const result = files.map(f => ({
                name: f.name,
                isDir: f.isDirectory()
            }));

            res.json(result);
        });
    } catch (e) {
        res.status(403).json({ error: e.message });
    }
});

// 📄 READ FILE
router.get('/read', (req, res) => {
    try {
        const filePath = resolveSafe(req.query.path);

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) return res.status(500).json(err);
            res.send(data);
        });
    } catch (e) {
        res.status(403).json({ error: e.message });
    }
});

// ✏️ WRITE FILE
router.post('/write', (req, res) => {
    try {
        const { path, content } = req.body;
        const filePath = resolveSafe(path);

        fs.writeFile(filePath, content, (err) => {
            if (err) return res.status(500).json(err);
            res.json({ success: true });
        });
    } catch (e) {
        res.status(403).json({ error: e.message });
    }
});

// ❌ DELETE
router.delete('/delete', (req, res) => {
    try {
        const filePath = resolveSafe(req.query.path);

        fs.rm(filePath, { recursive: true, force: true }, (err) => {
            if (err) return res.status(500).json(err);
            res.json({ success: true });
        });
    } catch (e) {
        res.status(403).json({ error: e.message });
    }
});

module.exports = router;