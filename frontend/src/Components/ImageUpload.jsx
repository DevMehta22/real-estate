import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../url";

const ImageUpload = ({ listingId }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    // Preview images before upload
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  // Cleanup URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      previewImages.forEach((src) => URL.revokeObjectURL(src));
    };
  }, [previewImages]);

  // Handle Image Upload
  const handleUpload = async () => {
    if (!listingId) {
      alert("Listing ID is required!");
      return;
    }

    if (selectedFiles.length === 0) {
      alert("Please select images to upload.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("images", file); // Ensure multer is configured correctly
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

      alert("Images uploaded successfully!");
      setSelectedFiles([]);
      setPreviewImages([]);
    } catch (error) {
      alert("Image upload failed! Check console for details.");
      console.error("Upload Error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Upload Property Images</h2>

      {/* File Input */}
      <input type="file" multiple accept="image/*" onChange={handleFileChange} className="mb-2" />

      {/* Image Previews */}
      <div className="flex gap-2 flex-wrap">
        {previewImages.map((src, index) => (
          <img key={index} src={src} alt="preview" className="w-24 h-24 object-cover rounded-md" />
        ))}
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload Images"}
      </button>
    </div>
  );
};

export default ImageUpload;