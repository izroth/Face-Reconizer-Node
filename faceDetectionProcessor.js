const faceapi = require('face-api.js');
const fs = require('fs');
const { loadWeights } = require('./weightsLoader');

const faceDetectionOptions = { minConfidence: 0.5 };

const getFaceDetection = async (img) => {
    await loadWeights();
    const detections = await faceapi.detectAllFaces(img, faceDetectionOptions);

    const out = fs.createWriteStream(__dirname + '/face.jpg');
    const stream = faceImage.createJPEGStream();
    
    stream.pipe(out);
    out.on('finish', () => console.log('The JPEG file was created.'));
};

module.exports = { getFaceDetection };
