const faceapi = require('face-api.js');
const fs = require('fs');
const { Canvas, Image, ImageData } = require('canvas');
const { loadWeights } = require('./weightsLoader');

faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

const getFaceImage = (img, detections) => {
    const faceImage = faceapi.createCanvasFromMedia(img);
    faceapi.draw.drawDetections(faceImage, faceapi.resizeResults(detections, displaySize));
    
    const out = fs.createWriteStream(__dirname + '/face.jpg');
    const stream = faceImage.createJPEGStream();
    
    stream.pipe(out);
    out.on('finish', () => console.log('The JPEG file was created.'));
};

module.exports = { getFaceImage };
