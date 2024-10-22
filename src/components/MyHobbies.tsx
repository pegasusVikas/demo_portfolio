import React from 'react';
import { Music, Book, Camera, Gamepad } from 'lucide-react';

const hobbies = [
  { name: 'Music Production', icon: <Music className="w-8 h-8" /> },
  { name: 'Reading Sci-Fi Novels', icon: <Book className="w-8 h-8" /> },
  { name: 'Astrophotography', icon: <Camera className="w-8 h-8" /> },
  { name: 'Video Gaming', icon: <Gamepad className="w-8 h-8" /> },
];

const MyHobbies: React.FC = () => {
  return (
    <div className="h-full bg-gradient-to-br from-gray-900 to-black p-8 overflow-auto">
      <h2 className="text-4xl font-bold mb-6 text-center text-blue-400">My Hobbies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {hobbies.map((hobby, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-xl flex items-center space-x-4">
            <div className="text-purple-400">{hobby.icon}</div>
            <span className="text-xl text-gray-300">{hobby.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHobbies;