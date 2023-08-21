const socket = io();

socket.on('connect', () => {
    console.log('Connected to WebSocket');
    socket.send('start');
});

socket.on('message', (data) => {
    // Process the data received from the server (face detection results)
    // You'll need to implement this part based on your use case
});

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// Access user media and set up video element
navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        video.srcObject = stream;
        startFaceDetection();
    })
    .catch((error) => {
        console.error('Error accessing user media:', error);
    });

function startFaceDetection() {
    // Set up canvas dimensions to match video
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;
    canvas.width = videoWidth;
    canvas.height = videoHeight;

    // Continuously draw video frames and perform face detection
    function detectFaces() {
        context.drawImage(video, 0, 0, videoWidth, videoHeight);
        const imageData = context.getImageData(0, 0, videoWidth, videoHeight);

        // Send image data to the server for face detection
        socket.emit('imageData', imageData);

        requestAnimationFrame(detectFaces);
    }

    // Start the face detection loop
    detectFaces();
}
