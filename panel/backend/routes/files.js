const router = require("express").Router();
const fs = require("fs");

router.get("/", (req, res) => {
    const dir = req.query.dir || "C:/";

    fs.readdir(dir, { withFileTypes: true }, (err, files) => {
        if (err) return res.status(500).send(err);

        res.json(files.map(f => ({
            name: f.name,
            isDir: f.isDirectory()
        })));
    });
});

module.exports = router;