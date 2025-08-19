import { useState, useEffect } from 'react';

const Gallery = ({ isAdmin }) => {
  const [images, setImages] = useState([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [imageTitle, setImageTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  // Load images from localStorage
  useEffect(() => {
    const savedImages = localStorage.getItem('galleryImages');
    if (savedImages) {
      setImages(JSON.parse(savedImages));
    } else {
      // Default images for demo
      const defaultImages = [
        {
          id: 1,
          title: 'Certificate of Completion - React Course',
          url: '/api/placeholder/400/300',
          uploadDate: '2024-01-15',
          type: 'certificate'
        },
        {
          id: 2,
          title: 'JavaScript Certification',
          url: '/api/placeholder/400/300',
          uploadDate: '2024-02-10',
          type: 'certificate'
        },
        {
          id: 3,
          title: 'Project Showcase Photo',
          url: '/api/placeholder/400/300',
          uploadDate: '2024-02-20',
          type: 'photo'
        }
      ];
      setImages(defaultImages);
      localStorage.setItem('galleryImages', JSON.stringify(defaultImages));
    }
  }, []);

  const handleImageUpload = () => {
    if (!uploadFile || !imageTitle) return;

    const newImage = {
      id: Date.now(),
      title: imageTitle,
      url: URL.createObjectURL(uploadFile),
      uploadDate: new Date().toISOString().split('T')[0],
      type: 'uploaded'
    };

    const updatedImages = [...images, newImage];
    setImages(updatedImages);
    localStorage.setItem('galleryImages', JSON.stringify(updatedImages));
    
    setUploadFile(null);
    setImageTitle('');
    setShowUploadForm(false);
  };

  const handleDelete = (id) => {
    const updatedImages = images.filter(image => image.id !== id);
    setImages(updatedImages);
    localStorage.setItem('galleryImages', JSON.stringify(updatedImages));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Gallery</h2>
          {isAdmin && (
            <button
              onClick={() => setShowUploadForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Upload Image
            </button>
          )}
        </div>

        {/* Upload Form */}
        {showUploadForm && (
          <div className="mb-6 p-4 border-2 border-dashed border-gray-300 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Upload New Image</h3>
            <div className="grid gap-4 mb-4">
              <input
                type="text"
                placeholder="Image Title"
                value={imageTitle}
                onChange={(e) => setImageTitle(e.target.value)}
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setUploadFile(e.target.files[0])}
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleImageUpload}
                disabled={!uploadFile || !imageTitle}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400 transition-colors"
              >
                Upload
              </button>
              <button
                onClick={() => {
                  setShowUploadForm(false);
                  setUploadFile(null);
                  setImageTitle('');
                }}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Image Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((image) => (
            <div key={image.id} className="relative group">
              <div 
                className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="mt-2">
                <h3 className="text-sm font-medium text-gray-800 truncate">{image.title}</h3>
                <p className="text-xs text-gray-500">{image.uploadDate}</p>
              </div>
              {isAdmin && (
                <button
                  onClick={() => handleDelete(image.id)}
                  className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        {images.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No images in gallery yet.</p>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              ✕
            </button>
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white p-3 rounded">
              <h3 className="font-medium">{selectedImage.title}</h3>
              <p className="text-sm opacity-80">{selectedImage.uploadDate}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;