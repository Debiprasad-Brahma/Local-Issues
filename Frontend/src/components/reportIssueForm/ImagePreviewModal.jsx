import React from "react"
import {X} from "lucide-react"

const ImagePreviewModal = ({image, onClose}) => {
  if (!image) return null

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="relative max-w-4xl max-h-full">
        <img
          src={image.preview}
          alt={image.name}
          className="max-w-full max-h-full object-contain rounded-lg"
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-6 h-6 text-gray-700" />
        </button>
        <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 rounded-lg p-3">
          <div className="font-medium text-gray-900">{image.name}</div>
          <div className="text-sm text-gray-600">{formatFileSize(image.size)}</div>
        </div>
      </div>
    </div>
  )
}

export default ImagePreviewModal
