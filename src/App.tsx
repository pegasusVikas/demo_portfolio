import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { Home, User, Briefcase, Heart } from 'lucide-react';
import HomePage from './routes/HomePage';
import AboutMe from './routes/AboutMe';
import MyProjects from './routes/MyProjects';
import MyHobbies from './routes/MyHobbies';
import PathOfFate from './routes/PathOfFate';
import Play from './routes/PathOfFate/Play';

const Layout: React.FC = () => {
  const location = useLocation();
  const hideNavPaths = ['/pathOfFate', '/pathOfFate/play'];
  const showNav = !hideNavPaths.includes(location.pathname);

  return (
    <div className="flex h-screen bg-black text-white">
      {showNav && (
        <nav className="fixed left-0 top-0 h-full w-16 bg-gray-900 flex flex-col items-center justify-center space-y-8">
          <NavIcon icon={<Home />} to="/" />
          <NavIcon icon={<User />} to="/about" />
          <NavIcon icon={<Briefcase />} to="/projects" />
          <NavIcon icon={<Heart />} to="/hobbies" />
        </nav>
      )}

      <main className={`flex-1 ${showNav ? 'ml-16' : ''}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/projects" element={<MyProjects />} />
          <Route path="/hobbies" element={<MyHobbies />} />
          <Route path="/pathOfFate" element={<PathOfFate />} />
          <Route path="/pathOfFate/play" element={<Play />} />
        </Routes>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

const NavIcon: React.FC<{ icon: React.ReactNode; to: string }> = ({ icon, to }) => (
  <Link
    to={to}
    className="p-2 rounded-full transition-colors duration-200 text-gray-400 hover:bg-gray-800 hover:text-white"
  >
    {icon}
  </Link>
);

export default App;