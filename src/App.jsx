import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import About from './components/About';
import Assignments from './components/Assignments';
import Learning from './components/Learning';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';

function App() {
  const [currentSection, setCurrentSection] = useState('about');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Check if user is already logged in as admin
  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin');
    if (adminStatus === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const handleAdminLogin = () => {
    setIsAdmin(true);
    localStorage.setItem('isAdmin', 'true');
    setShowLogin(false);
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
    setCurrentSection('about');
  };

  if (showLogin) {
    return <Login onLogin={handleAdminLogin} onCancel={() => setShowLogin(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        currentSection={currentSection} 
        setCurrentSection={setCurrentSection}
        isAdmin={isAdmin}
        onAdminClick={() => setShowLogin(true)}
        onLogout={handleAdminLogout}
      />
      
      <main className="container mx-auto px-4 py-8">
        {currentSection === 'about' && <About />}
        {currentSection === 'assignments' && <Assignments isAdmin={isAdmin} />}
        {currentSection === 'learning' && <Learning isAdmin={isAdmin} />}
        {currentSection === 'gallery' && <Gallery isAdmin={isAdmin} />}
        {currentSection === 'contact' && <Contact />}
        {currentSection === 'admin' && isAdmin && <AdminPanel />}
      </main>
    </div>
  );
}

export default App;