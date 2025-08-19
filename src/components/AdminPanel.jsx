const AdminPanel = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Admin Panel</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Stats */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Total Assignments</h3>
            <p className="text-3xl font-bold text-blue-600">
              {JSON.parse(localStorage.getItem('assignments') || '[]').length}
            </p>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Learning Videos</h3>
            <p className="text-3xl font-bold text-green-600">
              {JSON.parse(localStorage.getItem('learningVideos') || '[]').length}
            </p>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-800 mb-2">Gallery Images</h3>
            <p className="text-3xl font-bold text-purple-600">
              {JSON.parse(localStorage.getItem('galleryImages') || '[]').length}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg text-center">
              <div className="text-2xl mb-2">📝</div>
              <h4 className="font-medium text-gray-800">Manage Assignments</h4>
              <p className="text-sm text-gray-600 mt-1">Go to Assignments section to upload or delete files</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg text-center">
              <div className="text-2xl mb-2">🎥</div>
              <h4 className="font-medium text-gray-800">Manage Videos</h4>
              <p className="text-sm text-gray-600 mt-1">Go to Learning section to add or remove videos</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg text-center">
              <div className="text-2xl mb-2">🖼️</div>
              <h4 className="font-medium text-gray-800">Manage Gallery</h4>
              <p className="text-sm text-gray-600 mt-1">Go to Gallery section to upload or delete images</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg text-center">
              <div className="text-2xl mb-2">⚙️</div>
              <h4 className="font-medium text-gray-800">Settings</h4>
              <p className="text-sm text-gray-600 mt-1">Update profile information and site settings</p>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-medium text-yellow-800 mb-2">📋 Admin Instructions</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Navigate to each section (Assignments, Learning, Gallery) to manage content</li>
            <li>• Upload buttons appear in admin mode for adding new content</li>
            <li>• Delete buttons allow you to remove unwanted items</li>
            <li>• All data is currently stored locally in browser storage</li>
            <li>• For production, connect to a proper backend database</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;