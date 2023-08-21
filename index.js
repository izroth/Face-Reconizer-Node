const express = require('express');
//npm i face-api.js
const faceapi = require('face-api.js');
const canvas = require('canvas');
const fs = require('fs');
const faceDetectionNet = faceapi.nets.ssdMobilenetv1;
const faceDetectionOptions = { minConfidence: 0.5 };
const MODELS_URL = './models';
const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });
const loadWeights = async () => {
    await faceDetectionNet.loadFromDisk(MODELS_URL);
    await faceapi.nets.faceLandmark68Net.loadFromDisk(MODELS_URL);
    await faceapi.nets.faceRecognitionNet.loadFromDisk(MODELS_URL);
}
loadWeights();
const getFaceImage = (img) => {
    const faceImage = faceapi.createCanvasFromMedia(img);
    faceapi.draw.drawDetections(faceImage, faceapi.resizeResults(detections, displaySize));
    const out = fs.createWriteStream(__dirname + '/face.jpg');
    const stream = faceImage.createJPEGStream();
    stream.pipe(out);
    out.on('finish', () => console.log('The JPEG file was created.'));
}
const getFaceDetection = async (img) => {
    const detections = await faceapi.detectAllFaces(img, faceDetectionOptions);
    const out = fs.createWriteStream(__dirname + '/face.jpg');
    const stream = faceImage.createJPEGStream();
    stream.pipe(out);
    out.on('finish', () => console.log('The JPEG file was created.'));
}

const app = express();
app.listen(3000, () => console.log('Server running on port 3000'));