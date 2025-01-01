import React from 'react';
import BlackHoleAnimation from '../components/BlackHoleAnimation';

const HomePage: React.FC = () => {
  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      {/* Black Hole Animation */}
      <BlackHoleAnimation />

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-cosmic-pulse">
          JUNO
        </h1>
        <p className="mt-4 text-2xl text-gray-300">Welcome to my cosmic portfolio</p>
      </div>
    </div>
  );
};

export default HomePage;