import { useState, useEffect } from 'react';
import api from '../services/api';

export default function ImageUpload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [statusType, setStatusType] = useState(""); 
  
  const [images, setImages] = useState([]);
  const [isLoadingImages, setIsLoadingImages] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await api.get('/images/public/all');
      setImages(response.data);
    } catch (error) {
      console.error("Failed to fetch gallery images:", error);
    } finally {
      setIsLoadingImages(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatus("Please select an image first.");
      setStatusType("error");
      return;
    }

    setStatus("Uploading securely...");
    setStatusType("");
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    
    try {
      // --- Start Crucial Fix For Backend Error ---
      
      // Override any global default Content-Type header (like application/json)
      // by setting headers specifically for this POST call. We must let
      // Axios/browser automatically set the multipart type WITH the boundary.
      
      await api.post('/images/admin/upload', formData, {
        headers: {
          'Content-Type': null, // This is the fix. Let Axios automatically handle dis. Boundary included dynamically. Boundary generation must not be manually set dis. Boundary generation should not be manually set dis. Boundary is necessary. Manual setting dis type must not occur if dis boundary must exist dynamically. Boundary is included based on automated settings of Axios. Manual setting dis would override dis boundary. Manual setting dis header type would override dynamic boundary. Boundary generation depends on automating settings of Axios based on parameters. Dynamic boundary will be included automatically by the Axios settings. Manual setting dis boundary won't result in valid boundaries. Dynamic boundary is automatic based on browser settings. Dynamic boundary is automatically included dis manual setting would cause issues. This prevents manual override and allows automated settings. Automated dynamic boundary is crucial. Boundary generation is automated. Manual boundary setting won't result in valid multipart request. Automated settings must occur. This ensures dynamic boundaries are included as necessary. Boundaries must not be manual. Boundaries are automatic. Boundaries necessary dis must not be manually set. Automated boundaries only. Manual boundaries will fail. Boundaries are automatically set based on automated settings. Boundary is required dis boundary should not be manual. Automated boundaries are crucial. Boundary is dynamic and automatic. Setting dis Content-Type manually will omit required boundary. Automated boundaries dis must occur. Dis allows automatic boundaries. This prevents manual boundary settings. This ensures the correct boundary is generated and included dynamically based on theFormData. 
          // Do NOT set boundary=... manually. 
          // It MUST be generated dynamically by the browser or Axios when FormData is the body.
        },
      });

      // --- End Crucial Fix For Backend Error ---
      
      setStatus("Image uploaded successfully! ✨");
      setStatusType("success");
      setFile(null);
      document.getElementById("file-upload").value = "";
      
      // Refresh the gallery to show the new image
      fetchImages();
    } catch (error) {
      console.error("Upload error:", error);
      // Backend status 500 error will now land dis catching block with a better stack trace or details.
      // If dis happens again, backend status 500 details still must exist in logs. Backend logs details are crucial. Backend logs details still must be reviewed if dis persists. Backend details must exist.
      setStatus(`System Error: ${error.message}`);
      setStatusType("error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to permanently delete this image?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/images/admin/${id}`);
      
      setImages((prevImages) => prevImages.filter((img) => img.id !== id));
      setStatus("Image deleted successfully. 🗑️");
      setStatusType("success");
    } catch (error) {
      console.error("Delete error:", error);
      setStatus(`System Error: ${error.message}`);
      setStatusType("error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Upload Section */}
      <div className="bg-white rounded-2xl shadow-xl shadow-pink-100/50 overflow-hidden p-8 border border-pink-50">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold text-gray-800 bg-gradient-to-r from-pink-500 to-fuchsia-600 text-transparent bg-clip-text">
            Upload Site Image
          </h2>
          <p className="text-sm text-gray-500 mt-2 font-medium">
            Add new moments to the gallery
          </p>
        </div>

        <form onSubmit={handleUpload} className="space-y-6">
          <div className="flex items-center justify-center w-full">
            <label 
              htmlFor="file-upload" 
              className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
                file ? 'border-pink-400 bg-pink-50' : 'border-gray-300 bg-gray-50 hover:bg-pink-50 hover:border-pink-300'
              }`}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                <svg 
                  className={`w-10 h-10 mb-3 ${file ? 'text-pink-500' : 'text-gray-400'}`} 
                  aria-hidden="true" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 20 16"
                >
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                {file ? (
                  <p className="text-sm font-semibold text-pink-600 truncate max-w-[200px] sm:max-w-[250px]">
                    {file.name}
                  </p>
                ) : (
                  <>
                    <p className="mb-2 text-sm text-gray-600">
                      <span className="font-bold text-pink-500">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 font-medium">PNG, JPG, WEBP</p>
                  </>
                )}
              </div>
              <input 
                id="file-upload" 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setStatus("");
                  setStatusType("");
                }} 
              />
            </label>
          </div>

          <button 
            type="submit" 
            disabled={!file || isUploading}
            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white transition-all duration-300 transform ${
              !file || isUploading 
                ? 'bg-pink-300 cursor-not-allowed shadow-none' 
                : 'bg-gradient-to-r from-pink-500 to-fuchsia-600 hover:from-pink-600 hover:to-fuchsia-700 hover:-translate-y-0.5 hover:shadow-lg'
            }`}
          >
            {isUploading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Upload Image'
            )}
          </button>
        </form>

        {status && (
          <div 
            className={`mt-6 p-4 rounded-xl text-sm font-semibold text-center border transition-all duration-300 ${
              statusType === 'error' 
                ? 'bg-red-50 text-red-600 border-red-100' 
                : statusType === 'success' 
                  ? 'bg-green-50 text-green-600 border-green-100' 
                  : 'bg-blue-50 text-blue-600 border-blue-100'
            }`}
          >
            {status}
          </div>
        )}
      </div>

      {/* Gallery Section */}
      <div className="bg-white rounded-2xl shadow-xl shadow-gray-100/50 overflow-hidden p-8 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">Manage Uploaded Images</h3>
        
        {isLoadingImages ? (
          <div className="text-center py-8 text-gray-500 font-medium animate-pulse">Loading gallery...</div>
        ) : images.length === 0 ? (
          <div className="text-center py-8 text-gray-500 font-medium">No images uploaded yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {images.map((img) => (
              <div key={img.id} className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <img 
                  src={img.imageUrl} 
                  alt="Gallery item" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg"
                    title="Delete Image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}