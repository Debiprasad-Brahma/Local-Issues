import { useState } from 'react';

export const useImageUpload = () => {
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      if (file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024) { // 5MB limit
        const reader = new FileReader();
        reader.onload = (e) => {
          const newImage = {
            id: Date.now() + Math.random(),
            file: file,
            preview: e.target.result,
            name: file.name,
            size: file.size
          };
          
          setImages(prev => [...prev, newImage].slice(0, 5)); // Max 5 images
        };
        reader.readAsDataURL(file);
      }
    });
    
    e.target.value = ''; // Reset input
  };

  const removeImage = (imageId) => {
    setImages(prev => prev.filter(img => img.id !== imageId));
  };

  const clearImages = () => {
    setImages([]);
  };

  return {
    images,
    handleImageUpload,
    removeImage,
    clearImages,
    setImages
  };
};
