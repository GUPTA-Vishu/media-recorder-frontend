import React, { useState } from 'react';
import { ReactMediaRecorder } from 'react-media-recorder';
const BACKEND_URL = "https://media-recorder-backend-app.onrender.com/"

function Recording() {
  const [selectedMode, setSelectedMode] = useState(null)
  const [mediaBlobUrl,setmediaBlobUrl]=useState(null);
const [message,setmessage]=useState('');
const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  
  

  const handleStartRecording = (mode) => {
    setSelectedMode(mode);
    setmediaBlobUrl(null);

  };

  const handleStopRecording = async () => {
    setSelectedMode(null);
    setmessage("your data has been successfully stored in database");

    try {
      const formData = new FormData();
      formData.append('media', new Blob([mediaBlobUrl], { type: 'video/webm' })); 
  
      const response = await fetch(`${BACKEND_URL}/upload-media`, {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        console.log('Media uploaded to backend successfully');
        setmessage("your data has been successfully stored in database");
        setShowSuccessMessage(true);
      } else {
        console.error('Media upload to backend failed');
      }
    } catch (error) {
      console.error('Error uploading media to backend:', error);
    }
  };
  




  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="mb-4">
        <button
          className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleStartRecording('video')}
        >
          Start Webcam Recording
        </button>
        <button
          className="mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleStartRecording('screen')}
        >
          Start Screen Recording
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          

          onClick={() => handleStartRecording('audio')}
        >
          Start Audio Recording
        </button>
        <button
          className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleStopRecording}
          
        >
          save to db
        </button>
      </div>

      {showSuccessMessage && (
        <div className="mb-4 text-green-600 font-bold">{message}</div>
      )}
      
      {selectedMode && (
        <ReactMediaRecorder
          video={selectedMode === 'video'}
          screen={selectedMode === 'screen'}
          audio={selectedMode === 'audio'}
          render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
            <div className="text-center">
              <p className="mb-2 text-lg font-bold">{status}</p>
              <button
                className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={startRecording}
              >
                Start Recording
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={stopRecording}
              >
                Stop Recording
              </button>
              {selectedMode !== 'audio' && (
                <video
                  className="mt-4 max-w-full"
                  src={ mediaBlobUrl}
                  controls
                  autoPlay
                  loop
                />
              )}
            </div>
          )}
        />
      )}
    </div>
  );
}

export default Recording;

