import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GameState } from '../../types';
import axios from 'axios';
const BACKEND_API = import.meta.env.VITE_BACKEND_API;

const Play: React.FC = () => {
  const location = useLocation();
  const [storyData, setStoryData] = useState<GameState>({
    image: 'https://placehold.co/600x400',
    'story summary': '',
    'current state': '',
    options: { A: '', B: '', C: '' },
    'isGameOver': false
  });
  const [isLoading, setLoading] = useState(false);

  React.useEffect(() => {
    setStoryData(location.state.storyData);
  }, []);

  const handleSubmit = async (choice: string) => {
    setLoading(true)
    try {
      const response = await axios.post(`${BACKEND_API}/generateStory`,
        {
          "chosen option": choice,
          "story summary": storyData['story summary'],
          "current state": storyData['current state']
        });
      const gameData = response.data;
      gameData.image = BACKEND_API+gameData.image;
      setStoryData(gameData);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false)
  };


  return (
    isLoading ? (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-infinity loading-lg text-black size-24"></span>
      </div>
    ) : (
      <div className="min-h-screen bg-base-200 p-4">
        {/* Brand Name */}
        <div className="mb-8">
          <span className="text-xl font-bold text-black">Path of Fate</span>
        </div>

        <div className="container mx-auto max-w-2xl">
          {/* Story Title */}
          <h1 className="text-4xl font-bold text-center font-serif text-black mb-8">
            The Ancient Forest
          </h1>

          {/* Story Image */}
          <div className="w-full h-64 mb-8">
            <img
              src={`${storyData?.image}`}
              alt="Story Scene"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
          {/* Narrative Section */}
          <div className="card bg-base-100 shadow-xl mb-8">
            <div className="card-body">
              <p className="text-lg text-black">
                {storyData?.['current state']}
              </p>
            </div>
          </div>
          {/* Choice Buttons */}
          <div className="flex flex-col gap-4">
            <button className="btn btn-neutral w-full text-left" onClick={() => handleSubmit(storyData?.options.A)}>
              {storyData?.options.A}
            </button>
            <button className="btn btn-neutral w-full text-left" onClick={() => handleSubmit(storyData?.options.B)}>
              {storyData?.options.B}
            </button>
            <button className="btn btn-neutral w-full text-left" onClick={() => handleSubmit(storyData?.options.C)}>
              {storyData?.options.C}
            </button>
          </div>
        </div>
      </div>
    ));
};

export default Play;