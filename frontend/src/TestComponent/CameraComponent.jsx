import React, { useRef, useState } from 'react';

function CameraComponent() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);

  // Start the camera
  const startCamera = async () => {
    try {
      const videoStream = await navigator.mediaDevices.getUserMedia({
        video: true
      });
      videoRef.current.srcObject = videoStream;
      setStream(videoStream);
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  // Capture a photo
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    // Set canvas dimensions to match the video stream
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current video frame onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas data to an image file (Blob)
    canvas.toBlob((blob) => {
      // Now you can send the blob to your backend
      const formData = new FormData();
      formData.append('file', blob, 'photo.png');

      // Example: Upload to your backend
      fetch('/upload', {
        method: 'POST',
        body: formData,
      }).then(response => {
        console.log('Image uploaded successfully:', response);
      }).catch(err => {
        console.error('Upload failed:', err);
      });
    }, 'image/png');
  };

  // Stop the camera
  const stopCamera = () => {
    stream.getTracks().forEach(track => track.stop());
    setStream(null);
  };

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline style={{ width: '100%', maxHeight: '500px' }} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <div>
        {!stream ? (
          <button onClick={startCamera}>Start Camera</button>
        ) : (
          <div className='flex gap-6'>
            <button onClick={capturePhoto}>Capture Photo</button>
            <button onClick={stopCamera}>Stop Camera</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CameraComponent;
