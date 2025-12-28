import React, { useState } from 'react';
import './ImageUpload.css';

const ImageUpload = ({ image, onImageChange, onImageRemove, label = "Upload Image" }) => {
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(image || null);

  const validateImage = (file) => {
    // Check file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload only JPG, JPEG, PNG, or WEBP images');
      return false;
    }

    setError('');
    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (validateImage(file)) {
        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);
        onImageChange(imageUrl);
      }
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setError('');
    if (onImageRemove) {
      onImageRemove();
    }
  };

  return (
    <div className="image-upload-container">
      <label className="image-upload-label">{label}</label>
      
      {!preview ? (
        <div className="image-upload-box">
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleFileChange}
            className="image-upload-input"
            id="image-upload-input"
          />
          <label htmlFor="image-upload-input" className="image-upload-trigger">
            <div className="upload-icon">📷</div>
            <p className="upload-text">Click to upload image</p>
            <p className="upload-hint">JPG, JPEG, PNG, WEBP</p>
          </label>
        </div>
      ) : (
        <div className="image-preview-card">
          <div className="image-preview-header">
            <span className="preview-badge">Preview</span>
            <button onClick={handleRemove} className="remove-btn" type="button">
              ✕ Remove
            </button>
          </div>
          <div className="image-preview-wrapper">
            <img src={preview} alt="Preview" className="preview-image" />
          </div>
        </div>
      )}

      {error && <div className="image-upload-error">{error}</div>}
    </div>
  );
};

export default ImageUpload;
