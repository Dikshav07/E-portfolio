const Navbar = ({ currentSection, setCurrentSection, isAdmin, onAdminClick, onLogout }) => {
  const navItems = [
    { id: 'about', label: 'About Me' },
    { id: 'assignments', label: 'Assignments' },
    { id: 'learning', label: 'Learning' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' }
  ];

  if (isAdmin) {
    navItems.push({ id: 'admin', label: 'Admin Panel' });
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl font-bold text-gray-800">My Portfolio</h1>
          
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentSection(item.id)}
                className={`text-sm font-medium transition-colors ${
                  currentSection === item.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                } pb-4 pt-4`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {!isAdmin ? (
              <button
                onClick={onAdminClick}
                className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Admin
              </button>
            ) : (
              <button
                onClick={onLogout}
                className="text-sm bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <select
              value={currentSection}
              onChange={(e) => setCurrentSection(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              {navItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;