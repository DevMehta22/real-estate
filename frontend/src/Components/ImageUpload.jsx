import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  ImagePlus, 
  Trash2, 
  Upload, 
  Images, 
  AlertCircle 
} from "lucide-react";
import BASE_URL from "../url";

const ImageUpload = ({ listingId }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Validate file types and size
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB max
      
      if (!isValidType) {
        setError(`Invalid file type: ${file.name}. Only images are allowed.`);
      }
      
      if (!isValidSize) {
        setError(`${file.name} is too large. Max file size is 5MB.`);
      }
      
      return isValidType && isValidSize;
    });

    setSelectedFiles(validFiles);

    // Preview images before upload
    const previews = validFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  // Remove a specific image from selection
  const removeImage = (indexToRemove) => {
    setSelectedFiles(prev => 
      prev.filter((_, index) => index !== indexToRemove)
    );
    setPreviewImages(prev => 
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  // Cleanup URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      previewImages.forEach((src) => URL.revokeObjectURL(src));
    };
  }, [previewImages]);

  // Handle Image Upload
  const handleUpload = async () => {
    // Reset previous errors
    setError(null);

    if (!listingId) {
      setError("Listing ID is required!");
      return;
    }

    if (selectedFiles.length === 0) {
      setError("Please select images to upload.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      setUploading(true);
      const response = await axios.post(
        `${BASE_URL}api/seller/images/${listingId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer:${localStorage.getItem("token")}`,
          },
        }
      );

      // Success notification or additional handling
      alert("Images uploaded successfully!");
      setSelectedFiles([]);
      setPreviewImages([]);
    } catch (error) {
      setError(
        error.response?.data?.message || 
        "Image upload failed. Please try again."
      );
      console.error("Upload Error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-secondary p-6 rounded-xl shadow-lg">
      <div className="flex items-center mb-6">
        <Images className="text-primary mr-3" size={32} />
        <h2 className="text-2xl font-bold text-text">Upload Property Images</h2>
      </div>

      {/* File Input */}
      <div className="mb-6">
        <label 
          htmlFor="image-upload" 
          className="flex items-center justify-center w-full p-6 border-2 border-dashed border-primary rounded-lg cursor-pointer hover:bg-[#2A2A2A] transition-colors"
        >
          <input 
            id="image-upload"
            type="file" 
            multiple 
            accept="image/*" 
            onChange={handleFileChange} 
            className="hidden"
          />
          <div className="text-center">
            <ImagePlus className="mx-auto mb-2 text-primary" size={48} />
            <p className="text-text">Click to select images</p>
            <p className="text-highlight text-sm">Max 5MB per image</p>
          </div>
        </label>
      </div>

      {/* Error Handling */}
      {error && (
        <div className="bg-red-500 bg-opacity-10 border border-red-500 rounded-lg p-4 mb-4 flex items-center">
          <AlertCircle className="text-red-500 mr-3" size={24} />
          <p className="text-red-300">{error}</p>
        </div>
      )}

      {/* Image Previews */}
      {previewImages.length > 0 && (
        <div className="mb-6">
          <h3 className="text-text mb-4 font-semibold">
            Selected Images ({previewImages.length})
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {previewImages.map((src, index) => (
              <div 
                key={index} 
                className="relative group"
              >
                <img 
                  src={src} 
                  alt={`preview ${index}`} 
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 bg-opacity-70 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} className="text-white" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        className="w-full bg-primary text-secondary py-3 rounded-lg hover:bg-opacity-90 flex items-center justify-center disabled:opacity-50"
        disabled={uploading || selectedFiles.length === 0}
      >
        {uploading ? (
          <>
            <Upload className="mr-2 animate-pulse" size={20} />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="mr-2" size={20} />
            Upload Images
          </>
        )}
      </button>
    </div>
  );
};

export default ImageUpload;