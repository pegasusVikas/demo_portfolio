import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Wand2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const BACKEND_API = import.meta.env.VITE_BACKEND_API;

const PathOfFate: React.FC = () => {
  const [textInput, setTextInput] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState(0);
  const navigate = useNavigate();

  const loadingMessages = [
    "Reincarnation inprogress...",
    "Tip : Only 1 option will lead you to next path",
    "Weaving the threads of fate...",
    "Reincarnating you into a new world...",
    "Preparing your adventure...",
  ];

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingText((prev) => (prev + 1) % loadingMessages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await axios.post(`${BACKEND_API}/createStory`, {
        prompt: textInput 
      });
      
      console.log('Story data:', response.data);
      navigate('/pathOfFate/play', { 
        state: { 
          storyData: {...response.data, image: BACKEND_API+response.data.image}
        } 
      });
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false)
  };

  return (
    isLoading ? (
      <div className="min-h-screen bg-base-200 flex items-center justify-center flex-col gap-8">
        <span className="loading loading-infinity loading-lg text-black size-24"></span>
        <p className="text-xs text-gray-500">Hang on, this might take a few seconds....</p>
        <p className="text-xl text-black font-medium transition-all duration-1000 ease-in-out">
          {loadingMessages[loadingText]}
        </p>
      </div>
    ) : (
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center flex flex-col">
          <h1 className="text-5xl font-bold mb-8 text-black">Path of Fate</h1>
          <div className="form-control w-full max-w-xl">
            <div className="relative">
              <textarea 
                className="textarea textarea-bordered h-32 mb-4 text-black resize-none w-full pr-24"  
                placeholder="Describe your destiny..."
                maxLength={50}
                value={textInput}
                onChange={(e) => {
                  setTextInput(e.target.value);
                }}
              />
              <button 
                onClick={handleSubmit}
                className="absolute bottom-8 right-4 btn btn-circle btn-sm btn-black"
              >
                <Wand2  size={20} />
              </button>
              <div className="absolute bottom-8 right-16 text-sm text-gray-300">
                {textInput.length}/50
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              <button 
                className="btn btn-sm btn-neutral" onClick={() => setTextInput("Adventure")} >
                Adventure
              </button>
              <button 
                className="btn btn-sm btn-neutral" onClick={() => setTextInput("Horror")} >
                Horror
              </button>
              <button 
                className="btn btn-sm btn-neutral" onClick={() => setTextInput("Ice World")} >
                Ice World
              </button>
              <button 
                className="btn btn-sm btn-neutral" onClick={() => setTextInput("Apocolypse")} >
                Apocolypse
              </button>
              <button 
                className="btn btn-sm btn-neutral" onClick={() => setTextInput("Romance")} >
                Romance
              </button>
              <button 
                className="btn btn-sm btn-neutral" onClick={() => setTextInput("Zombie")} >
                Zombie
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default PathOfFate;