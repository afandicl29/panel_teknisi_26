const WebSocket = require('ws');
const pty = require('node-pty');

const wss = new WebSocket.Server({ port: 3001 });

wss.on('connection', (ws) => {
    const shell = process.platform === 'win32' ? 'cmd.exe' : 'bash';

    const ptyProcess = pty.spawn(shell, [], {
        name: 'xterm-color',
        cols: 80,
        rows: 24,
        cwd: process.env.HOME,
        env: process.env
    });

    // kirim output ke frontend
    ptyProcess.onData(data => {
        ws.send(data);
    });

    // terima input dari frontend
    ws.on('message', (msg) => {
        ptyProcess.write(msg);
    });

    ws.on('close', () => {
        ptyProcess.kill();
    });
});