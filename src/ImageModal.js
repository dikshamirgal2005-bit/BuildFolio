import React from 'react';
import './ImageModal.css';

const ImageModal = ({ image, title, onClose }) => {
  if (!image) return null;

  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="image-modal-close" onClick={onClose}>✕</button>
        <img src={image} alt={title || 'Preview'} className="image-modal-img" />
        {title && <div className="image-modal-title">{title}</div>}
      </div>
    </div>
  );
};

export default ImageModal;
