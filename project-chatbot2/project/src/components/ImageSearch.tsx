import React, { useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { Upload, X } from 'lucide-react';

interface ImageSearchProps {
  onClose: () => void;
  onResult: (text: string) => void;
}

export default function ImageSearch({ onClose, onResult }: ImageSearchProps) {
  const [image, setImage] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      if (e.target?.result) {
        setImage(e.target.result as string);
        
        try {
          const model = await mobilenet.load();
          const imgElement = new Image();
          imgElement.src = e.target.result as string;
          
          await new Promise((resolve) => {
            imgElement.onload = resolve;
          });
          
          const results = await model.classify(imgElement);
          setPredictions(results);
          
          // Use the top prediction for search
          if (results.length > 0) {
            onResult(results[0].className);
          }
        } catch (error) {
          console.error('Error analyzing image:', error);
        }
        
        setLoading(false);
      }
    };
    
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Image Search</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="text-center">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          
          {!image ? (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full p-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 transition-colors"
            >
              <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-gray-600">Click to upload an image</p>
            </button>
          ) : (
            <div>
              <img
                src={image}
                alt="Uploaded"
                className="w-full h-48 object-contain mb-4"
              />
              
              {loading ? (
                <p className="text-gray-600">Analyzing image...</p>
              ) : (
                <div className="space-y-2">
                  <h3 className="font-semibold">Detected Items:</h3>
                  {predictions.map((pred, idx) => (
                    <div
                      key={idx}
                      className="p-2 bg-gray-100 rounded flex justify-between"
                    >
                      <span>{pred.className}</span>
                      <span>{Math.round(pred.probability * 100)}%</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}