import { useState, useEffect } from 'react';

const Learning = ({ isAdmin }) => {
  const [notes, setNotes] = useState([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteFile, setNoteFile] = useState(null);

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem('learningNotes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    } else {
      const defaultNotes = [
        {
          id: 1,
          title: 'Lab 1: Introduction to React (PDF)',
          url: '#',
          fileName: 'react_intro.pdf',
          uploadDate: '2024-01-10'
        },
        {
          id: 2,
          title: 'Lab 2: State Management (DOCX)',
          url: '#',
          fileName: 'state_mgmt.docx',
          uploadDate: '2024-01-25'
        }
      ];
      setNotes(defaultNotes);
      localStorage.setItem('learningNotes', JSON.stringify(defaultNotes));
    }
  }, []);

  const handleNoteUpload = () => {
    if (!noteTitle || !noteFile) return;

    const fileUrl = URL.createObjectURL(noteFile);

    const newNote = {
      id: Date.now(),
      title: noteTitle,
      fileName: noteFile.name,
      url: fileUrl,
      uploadDate: new Date().toISOString().split('T')[0]
    };

    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem('learningNotes', JSON.stringify(updatedNotes));

    setNoteTitle('');
    setNoteFile(null);
    setShowUploadForm(false);
  };

  const handleDelete = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('learningNotes', JSON.stringify(updatedNotes));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Learning Notes</h2>
          {isAdmin && (
            <button
              onClick={() => setShowUploadForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Add Note
            </button>
          )}
        </div>

        {/* Upload Form */}
        {showUploadForm && (
          <div className="mb-6 p-4 border-2 border-dashed border-gray-300 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Upload New Note</h3>
            <div className="grid gap-4 mb-4">
              <input
                type="text"
                placeholder="Note Title"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={(e) => setNoteFile(e.target.files[0])}
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleNoteUpload}
                disabled={!noteTitle || !noteFile}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400 transition-colors"
              >
                Upload Note
              </button>
              <button
                onClick={() => {
                  setShowUploadForm(false);
                  setNoteTitle('');
                  setNoteFile(null);
                }}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Notes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div
              key={note.id}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {note.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Uploaded: {note.uploadDate}
                </p>
                <a
                  href={note.url}
                  download={note.fileName}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors mr-2"
                >
                  View / Download
                </a>
                {isAdmin && (
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {notes.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No learning notes uploaded yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Learning;
