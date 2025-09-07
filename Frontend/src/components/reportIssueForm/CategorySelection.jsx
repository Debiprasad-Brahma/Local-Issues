import React from "react"
import {AlertCircle} from "lucide-react"

const CategorySelection = ({categories, selectedCategory, onCategoryChange, error}) => {
  return (
    <>
      <div>
        {/* SECTION - Category Selection Header */}
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Category <span className="text-red-500">*</span>
        </label>

        {/* SECTION - Category Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {categories.map((category) => (
            <button
              key={category.value}
              type="button"
              onClick={() => onCategoryChange(category.value)}
              className={`p-4 border-2 rounded-xl text-left transition-all hover:shadow-md ${
                selectedCategory === category.value
                  ? "border-blue-500 bg-blue-50 shadow-md"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{category.icon}</span>
                <div>
                  <div className="font-medium text-gray-900">{category.label}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* SECTION - Error Message */}
        {error && (
          <p className="mt-2 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {error}
          </p>
        )}
      </div>
    </>
  )
}

export default CategorySelection
