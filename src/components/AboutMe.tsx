import React from 'react';

const AboutMe: React.FC = () => {
  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-8">
      <div className="max-w-2xl bg-gray-800 p-8 rounded-lg shadow-xl">
        <h2 className="text-4xl font-bold mb-6 text-blue-400">About Me</h2>
        <p className="text-gray-300 mb-4">
          Hello! I'm JUNO, a passionate developer with a love for creating innovative solutions. 
          My journey in the tech world has been as vast and mysterious as the cosmos itself.
        </p>
        <p className="text-gray-300 mb-4">
          With expertise in various programming languages and a keen eye for design, 
          I strive to build applications that are not only functional but also visually stunning.
        </p>
        <p className="text-gray-300">
          When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
          or gazing at the stars, wondering about the next big idea.
        </p>
      </div>
    </div>
  );
};

export default AboutMe;