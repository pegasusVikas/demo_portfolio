import React from 'react';

const projects = [
  { name: 'Cosmic Chat', description: 'A real-time messaging app with end-to-end encryption' },
  { name: 'Nebula Notes', description: 'A cloud-based note-taking application with AI-powered insights' },
  { name: 'Stellar Stocks', description: 'A modern stock tracking and analysis platform' },
  { name: 'Quantum Quizzer', description: 'An educational app that makes learning quantum physics fun' },
];

const MyProjects: React.FC = () => {
  return (
    <div className="h-full bg-gradient-to-br from-gray-900 to-black p-8 overflow-auto">
      <h2 className="text-4xl font-bold mb-6 text-center text-blue-400">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-2 text-purple-400">{project.name}</h3>
            <p className="text-gray-300">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProjects;