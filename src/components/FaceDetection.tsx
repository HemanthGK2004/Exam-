import * as faceapi from 'face-api.js';
import { useEffect, useRef, useState } from 'react';

const FaceDetection = () => {
  const videoRef = useRef(null);
  const [warning, setWarning] = useState('');

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    };

    const startVideo = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
    };

    loadModels().then(startVideo);
  }, []);

  const detectFace = async () => {
    if (!videoRef.current) return;
    const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions());

    if (detections.length === 0) setWarning('⚠️ Face Not Detected!');
    else if (detections.length > 1) setWarning('🚨 Multiple Faces Detected!');
    else setWarning('');
  };

  useEffect(() => {
    const interval = setInterval(detectFace, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay muted width="400" height="300" />
      <p>{warning && <span style={{ color: 'red' }}>{warning}</span>}</p>
    </div>
  );
};

export default FaceDetection;
