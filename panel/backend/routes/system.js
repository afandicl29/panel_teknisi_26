const router = require("express").Router();
const os = require("os");

router.get("/stats", (req, res) => {
    const totalMem = os.totalmem();
    const freeMem = os.freemem();

    res.json({
        ram: ((totalMem - freeMem) / totalMem) * 100,
        cpu: os.loadavg()[0]
    });
});

module.exports = router;