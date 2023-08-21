const faceapi = require('face-api.js');
const MODELS_URL = './models';

const loadWeights = async () => {
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODELS_URL);
    await faceapi.nets.faceLandmark68Net.loadFromDisk(MODELS_URL);
    await faceapi.nets.faceRecognitionNet.loadFromDisk(MODELS_URL);
};

module.exports = { loadWeights };
