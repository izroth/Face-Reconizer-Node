const express = require('express');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const { loadWeights } = require('./weightsLoader');
const faceapi = require('face-api.js');

const faceDetectionOptions = { minConfidence: 0.5 };

const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

async function startLiveDetection() {
    await loadWeights();
    const faceDetectionNet = faceapi.nets.ssdMobilenetv1;
    await faceDetectionNet.loadFromDisk(MODELS_URL);

    server.listen(3001, () => {
        console.log('Live detection server running on port 3001');
    });

    faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('WebSocket connected');

        ws.on('message', async (message) => {
            if (message === 'start') {
                // Start live face detection and send results to the client
                // You'll need to implement this part based on your use case
            }
        });
    });
}

module.exports = { startLiveDetection };
