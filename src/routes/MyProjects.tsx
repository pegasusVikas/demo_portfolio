import React from 'react';import { ScrollText, Bot, SlidersHorizontal, Gamepad2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const projects = [
  { 
    name: 'Path Of Fate', 
    description: 'An interactive story game where your choices shape the adventure—choose wisely to keep the story alive!',
    icon: <Gamepad2 size={32} className="text-purple-400" />,
    path: '/pathOfFate'
  },
  {
    name: 'Chat Clone',
    description: 'Fine Tunning Model based on your WhatsApp chat',
    icon: <SlidersHorizontal size={32} className="text-blue-400" />,
    url: 'https://github.com/pegasusVikas/Chat-Clone'
  }
  /*{
    name: 'AI Chat Bot',
    description: 'A conversational AI bot built using OpenAI API.',
    icon: <Bot size={32} className="text-green-400" />
  }*/
];

const MyProjects: React.FC = () => {
  const navigate = useNavigate();

  const navigateLink =(path:string|undefined,url:string|undefined) =>{
    if(path)
      navigate(path);
    else
      window.open(url, '_blank', 'noopener,noreferrer');
  }
  return (
    <div className="h-full bg-gradient-to-br from-gray-900 to-black p-8 overflow-auto">
      <h2 className="text-4xl font-bold mb-6 text-center text-blue-400">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div 
            key={index} 
            className="bg-gray-800 p-6 rounded-lg shadow-xl 
              hover:shadow-2xl hover:scale-105 hover:ring-2 hover:ring-purple-400 
              active:scale-95 
              transition-all duration-300 ease-in-out 
              cursor-pointer" 
            onClick={()=>navigateLink(project.path,project.url)}
          >
            <div className="flex items-center gap-4 mb-4">
              {project.icon}
              <h3 className="text-2xl font-semibold text-purple-400">{project.name}</h3>
            </div>
            <p className="text-gray-300">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProjects;