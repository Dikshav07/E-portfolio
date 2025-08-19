const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Profile Photo */}
          <div className="flex-shrink-0">
            <img
              src="/api/placeholder/200/200"
              alt="Profile"
              className="w-48 h-48 rounded-full object-cover border-4 border-gray-200"
            />
          </div>
          
          {/* Bio and Skills */}
          <div className="flex-grow text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">About Me</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              I am a passionate developer and learner, dedicated to creating innovative solutions 
              and continuously expanding my knowledge in technology. This portfolio showcases my 
              journey through various assignments, projects, and achievements.
            </p>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Skills</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="text-gray-700">C and c++ Programming</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-gray-700">DSA</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span className="text-gray-700">React</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span className="text-gray-700">Collaborative</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span className="text-gray-700">Problem Solver</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                  <span className="text-gray-700">Git</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;