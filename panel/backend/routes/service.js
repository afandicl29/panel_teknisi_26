const router = require("express").Router();
const { spawn } = require("child_process");

let services = {};

router.post("/start", (req, res) => {
    const { name, command } = req.body;

    if (services[name]) {
        return res.json({ msg: "Sudah jalan" });
    }

    const proc = spawn(command, { shell: true });

    services[name] = proc;

    proc.stdout.on("data", (d) => console.log(name + ": " + d));

    proc.on("close", () => delete services[name]);

    res.json({ msg: "Berhasil start" });
});

router.post("/stop", (req, res) => {
    const { name } = req.body;

    if (services[name]) {
        services[name].kill();
        delete services[name];
        return res.json({ msg: "Berhasil stop" });
    }

    res.json({ msg: "Tidak ditemukan" });
});

router.get("/list", (req, res) => {
    res.json(Object.keys(services));
});

module.exports = router;