const router = require("express").Router();

const USER = "admin";
const PASS = "admin123";

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === USER && password === PASS) {
        return res.json({ success: true });
    }

    res.status(401).json({ success: false });
});

module.exports = router;