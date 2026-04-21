const pm2 = require('pm2');

exports.startApp = (req, res) => {
    const { name, script } = req.body;

    pm2.connect(() => {
        pm2.start({
            name,
            script
        }, (err, apps) => {
            pm2.disconnect();
            if (err) return res.status(500).json(err);
            res.json({ success: true, apps });
        });
    });
};

exports.stopApp = (req, res) => {
    const { name } = req.body;

    pm2.connect(() => {
        pm2.stop(name, (err) => {
            pm2.disconnect();
            if (err) return res.status(500).json(err);
            res.json({ success: true });
        });
    });
};

exports.listApps = (req, res) => {
    pm2.connect(() => {
        pm2.list((err, list) => {
            pm2.disconnect();
            if (err) return res.status(500).json(err);
            res.json(list);
        });
    });
};