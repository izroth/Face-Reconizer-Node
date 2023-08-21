const express = require('express');
const app = express();

const { loadWeights } = require('./weightsLoader');
const { startLiveDetection } = require('./liveDetection');

app.get('/loadWeights', async (req, res) => {
    await loadWeights();
    res.send('Weights loaded successfully.');
});

app.get('/startLiveDetection', async (req, res) => {
    await startLiveDetection();
    res.send('Live face detection started.');
});

app.listen(3000, () => console.log('Server running on port 3000'));
