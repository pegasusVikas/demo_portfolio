import React, { useState } from 'react';
import { Home, User, Briefcase, Heart } from 'lucide-react';
import HomePage from './components/HomePage';
import AboutMe from './components/AboutMe';
import MyProjects from './components/MyProjects';
import MyHobbies from './components/MyHobbies';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState('home');

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutMe />;
      case 'projects':
        return <MyProjects />;
      case 'hobbies':
        return <MyHobbies />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Side Navigation */}
      <nav className="fixed left-0 top-0 h-full w-16 bg-gray-900 flex flex-col items-center justify-center space-y-8">
        <NavIcon icon={<Home />} onClick={() => setActivePage('home')} active={activePage === 'home'} />
        <NavIcon icon={<User />} onClick={() => setActivePage('about')} active={activePage === 'about'} />
        <NavIcon icon={<Briefcase />} onClick={() => setActivePage('projects')} active={activePage === 'projects'} />
        <NavIcon icon={<Heart />} onClick={() => setActivePage('hobbies')} active={activePage === 'hobbies'} />
      </nav>

      {/* Main Content */}
      <main className="flex-1 ml-16">
        {renderPage()}
      </main>
    </div>
  );
};

const NavIcon: React.FC<{ icon: React.ReactNode; onClick: () => void; active: boolean }> = ({ icon, onClick, active }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-full transition-colors duration-200 ${
      active ? 'bg-blue-500 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
    }`}
  >
    {icon}
  </button>
);

export default App;