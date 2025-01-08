import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RotateCw } from 'lucide-react';
import { GameAction, GameState } from '../../types';
import axios from 'axios';
const BACKEND_API = import.meta.env.VITE_BACKEND_API;

const Play: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
  React.useEffect(() => {
    if(storyData.isGameOver === true) {
      setStoryData({...storyData,
        gameId: '',
        stateId: '',
        nextStateId: '', 
        options: { A: '', B: '', C: '' },
    });
    }
  }, [storyData.isGameOver]);

  const handleSubmit = async (choice: string) => {
    setLoading(true)
    try {
      const body : GameAction = {
        "chosen option": choice,
        gameId: storyData.gameId ?? '',
        stateId: storyData.stateId ?? '',
        nextStateId: storyData.nextStateId ?? '',
        "story summary": storyData['story summary'],
        "current state": storyData['current state']
      }
      const response = await axios.post(`${BACKEND_API}/generateStory`,
        body
        );
      const gameData = response.data;
      gameData.image = BACKEND_API+gameData.image;
      setStoryData({...gameData});
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false)
  };

  const handleRetry = () => {
    navigate('/pathOfFate');
  };


  return (
    <>
      {/* Game Over Modal */}
      {storyData.isGameOver && (
        <div className="modal modal-open">
          <div className="modal-box relative flex flex-col items-center justify-center">
            <h3 className="font-bold text-3xl text-black mb-6 text-center">Game Over</h3>
            <p className="py-4 text-black text-center mb-6">{storyData['current state']}</p>
            <div className="modal-action flex justify-center w-full">
              <button 
                className="btn btn-active w-32"
                onClick={handleRetry}
              >
                <RotateCw size={30} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {isLoading ? (
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
              {storyData?.storyTitle}
            </h1>

            {/* Story Image */}
            <div className="w-full mb-8">
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
              <button className="btn btn-neutral w-full text-left" onClick={() => handleSubmit("A")}>
                {storyData?.options.A}
              </button>
              <button className="btn btn-neutral w-full text-left" onClick={() => handleSubmit("B")}>
                {storyData?.options.B}
              </button>
              <button className="btn btn-neutral w-full text-left" onClick={() => handleSubmit("C")}>
                {storyData?.options.C}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Play;