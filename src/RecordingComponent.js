import React, { useState, useRef } from 'react';
import RecordRTC from 'recordrtc';
import Button from 'react-bootstrap/Button';
import './Styles.css';

function RecordingComponent() {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaStream, setMediaStream] = useState(null);
  const recordedChunks = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      setMediaStream(stream);

      const recorder = new RecordRTC(stream, {
        type: 'video',
        mimeType: 'video/webm',
      });

      recorder.ondataavailable = event => {
        if (event.data && event.data.size > 0) {
          recordedChunks.current.push(event.data);
        }
      };

      recorder.startRecording();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
    }
    setIsRecording(false);
  };

  const saveRecording = () => {
    if (recordedChunks.current.length > 0) {
      const blob = new Blob(recordedChunks.current, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);

      // Save the recording URL to local storage
      localStorage.setItem('recordingURL', url);
      console.log('Recording URL saved:', url);
    }
  };

  const restartRecording = () => {
    stopRecording();
    startRecording();
  };

  return (
    <div>
      <h1>Recording Component</h1>
      {isRecording ? (
        <>
          <Button onClick={stopRecording} variant="danger">
            Stop Recording
          </Button>
          <Button onClick={saveRecording} variant="primary">
            Save Recording
          </Button>
        </>
      ) : (
        <>
          <Button onClick={startRecording} variant="success">
            Start Recording
          </Button>
          <br></br>
          
          <Button onClick={restartRecording} variant="info">
            Restart Recording
          </Button>
        </>
      )}
    </div>
  );
}

export default RecordingComponent;
