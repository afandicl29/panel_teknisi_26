const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const bodyParser = require("body-parser");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(bodyParser.json());
app.use(express.json());

// routes
app.use('/api/files', require('./routes/fileManager'));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/system", require("./routes/system"));
app.use("/api/files", require("./routes/files"));
app.use("/api/service", require("./routes/service"));
app.use('/api/pm2', require('./routes/pm2'));

// TERMINAL (real-time)
wss.on("connection", (ws) => {
    const { spawn } = require("child_process");
    const shell = spawn("cmd.exe");

    shell.stdout.on("data", (data) => {
        ws.send(data.toString());
    });

    ws.on("message", (msg) => {
        shell.stdin.write(msg);
    });

    ws.on("close", () => shell.kill());
});

server.listen(3000, () => {
    console.log("Server jalan di http://localhost:3000");
});