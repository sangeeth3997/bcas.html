import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Mic, X } from 'lucide-react';

interface VoiceSearchProps {
  onClose: () => void;
  onResult: (text: string) => void;
}

export default function VoiceSearch({ onClose, onResult }: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      onResult(transcript);
    }
  }, [transcript, onResult]);

  const handleStart = () => {
    resetTranscript();
    setIsListening(true);
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleStop = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Voice Search</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={isListening ? handleStop : handleStart}
            className={`p-4 rounded-full ${
              isListening ? 'bg-red-500' : 'bg-orange-500'
            } text-white mb-4 hover:opacity-90 transition-opacity`}
          >
            <Mic className={`w-8 h-8 ${isListening ? 'animate-pulse' : ''}`} />
          </button>
          
          <p className="text-gray-600 mb-4">
            {isListening ? 'Listening...' : 'Click to start speaking'}
          </p>
          
          {transcript && (
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="text-gray-800">{transcript}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}