import React, {useRef} from "react"
import {Upload, Camera, Eye, Trash2} from "lucide-react"

const ImageUpload = ({images, onImageUpload, onImageRemove, onImagePreview}) => {
  const fileInputRef = useRef(null)

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
  }

  return (
    <>
      <div>
        {/* SECTION - Image Upload Header */}
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Upload Images (Optional)
        </label>

        {/* SECTION - Image Upload */}
        <div className="space-y-4">
          {/* NOTE -  Upload Area */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all"
          >
            <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">Upload Images</h3>
            <p className="text-gray-500 mb-4">Drag and drop images here, or click to select</p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
              <Upload className="w-4 h-4" />
              <span>Maximum 5 images, 5MB each</span>
            </div>
          </div>

          {/* NOTE - Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={onImageUpload}
            className="hidden"
          />

          {/* NOTE - Image Previews */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="relative group"
                >
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={image.preview}
                      alt={image.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* NOTE - Image Controls */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">

                    {/* NOTE - Image Preview Button */}
                    <button
                      type="button"
                      onClick={() => onImagePreview(image)}
                      className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Eye className="w-4 h-4 text-gray-700" />
                    </button>

                    {/* NOTE - Image Remove Button */}
                    <button
                      type="button"
                      onClick={() => onImageRemove(image.id)}
                      className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>

                  {/* NOTE - Image Info */}
                  <div className="mt-2 text-xs text-gray-500 text-center">
                    <div className="truncate">{image.name}</div>
                    <div>{formatFileSize(image.size)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ImageUpload
