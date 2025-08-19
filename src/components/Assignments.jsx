import { useState, useEffect } from 'react';

const Assignments = ({ isAdmin }) => {
  const [assignments, setAssignments] = useState([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);

  // Load assignments from localStorage (simulating backend)
  useEffect(() => {
    const savedAssignments = localStorage.getItem('assignments');
    if (savedAssignments) {
      setAssignments(JSON.parse(savedAssignments));
    } else {
      // Default assignments for demo
      const defaultAssignments = [
        {
          id: 1,
          title: 'Assignment 1',
          fileName: 'assignment1.pdf',
          uploadDate: '2024-01-15',
          fileUrl: '#'
        },
        {
          id: 2,
          title: 'Assignment 2',
          fileName: 'assignment2.pdf',
          uploadDate: '2024-02-20',
          fileUrl: '#'
        }
      ];
      setAssignments(defaultAssignments);
      localStorage.setItem('assignments', JSON.stringify(defaultAssignments));
    }
  }, []);

  const handleFileUpload = () => {
    if (!uploadFile) return;

    const nextId = assignments.length + 1;
    const newAssignment = {
      id: Date.now(),
      title: `Assignment ${nextId}`,
      fileName: uploadFile.name,
      uploadDate: new Date().toISOString().split('T')[0],
      fileUrl: URL.createObjectURL(uploadFile)
    };

    const updatedAssignments = [...assignments, newAssignment];
    setAssignments(updatedAssignments);
    localStorage.setItem('assignments', JSON.stringify(updatedAssignments));
    
    setUploadFile(null);
    setShowUploadForm(false);
  };

  const handleDelete = (id) => {
    const updatedAssignments = assignments.filter(assignment => assignment.id !== id);
    setAssignments(updatedAssignments);
    localStorage.setItem('assignments', JSON.stringify(updatedAssignments));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Assignments</h2>
          {isAdmin && (
            <button
              onClick={() => setShowUploadForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Upload Assignment
            </button>
          )}
        </div>

        {/* Upload Form */}
        {showUploadForm && (
          <div className="mb-6 p-4 border-2 border-dashed border-gray-300 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Upload New Assignment</h3>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setUploadFile(e.target.files[0])}
              className="mb-4 w-full p-2 border border-gray-300 rounded"
            />
            <div className="flex space-x-4">
              <button
                onClick={handleFileUpload}
                disabled={!uploadFile}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400 transition-colors"
              >
                Upload
              </button>
              <button
                onClick={() => {
                  setShowUploadForm(false);
                  setUploadFile(null);
                }}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Assignments List */}
        <div className="grid gap-4">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{assignment.title}</h3>
                  <p className="text-gray-600 text-sm">File: {assignment.fileName}</p>
                  <p className="text-gray-600 text-sm">Uploaded: {assignment.uploadDate}</p>
                </div>
                <div className="flex space-x-2">
                  <a
                    href={assignment.fileUrl}
                    download={assignment.fileName}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    Download
                  </a>
                  {isAdmin && (
                    <button
                      onClick={() => handleDelete(assignment.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {assignments.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No assignments uploaded yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assignments;