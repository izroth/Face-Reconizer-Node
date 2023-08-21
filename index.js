const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { loadWeights } = require('./weightsLoader');
const faceapi = require('face-api.js');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const faceDetectionOptions = { minConfidence: 0.5 };
const MODELS_URL = './models';

async function startFaceDetection(socket) {
    await loadWeights();
    const faceDetectionNet = faceapi.nets.ssdMobilenetv1;
    await faceDetectionNet.loadFromDisk(MODELS_URL);

    const videoWidth = 640;
    const videoHeight = 480;

    socket.on('imageData', async (imageData) => {
        const img = new ImageData(imageData.data, videoWidth, videoHeight);
        const detections = await faceapi.detectAllFaces(img, faceDetectionOptions);

        // Process detections and send back to the client
        // You'll need to implement this part based on your use case
        socket.emit('detections', detections);
    });
}

io.on('connection', (socket) => {
    console.log('A user connected');
    startFaceDetection(socket);

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
