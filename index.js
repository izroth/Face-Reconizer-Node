const express = require('express');
const app = express();

const { loadWeights } = require('./weightsLoader');
const { getFaceImage } = require('./faceImageProcessor');
const { getFaceDetection } = require('./faceDetectionProcessor');

app.get('/loadWeights', async (req, res) => {
    await loadWeights();
    res.send('Weights loaded successfully.');
});

app.get('/processFaceImage', (req, res) => {
    // Assuming you have an image in req.query.img
    // You need to pass the 'detections' parameter here
    // Example: getFaceImage(req.query.img, detections);
    getFaceImage(req.query.img, detections);
    res.send('Face image processed successfully.');
});

app.get('/detectFace', async (req, res) => {
    // Assuming you have an image in req.query.img
    await getFaceDetection(req.query.img);
    res.send('Face detection completed.');
});

app.listen(3000, () => console.log('Server running on port 3000'));
