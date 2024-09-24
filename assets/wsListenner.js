const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (ws) => {
    console.log('Nuevo cliente conectado');

    ws.on('message', (message) => {
        console.log(`Mensaje recibido: ${message}`);
        ws.send(`Servidor responde: ${message}`);
    });

    ws.on('close', () => {
        console.log('Cliente desconectado');
    });
});

console.log('Servidor WebSocket escuchando en ws://localhost:8080');
