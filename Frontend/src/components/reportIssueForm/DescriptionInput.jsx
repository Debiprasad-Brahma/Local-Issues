import React from "react"
import {AlertCircle} from "lucide-react"

const DescriptionInput = ({value, onChange, error, maxLength = 500}) => {
  return (
    <>
      <div>
        {/* SECTION - Description Header */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description <span className="text-red-500">*</span>
        </label>

        {/* SECTION - Description */}
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Please describe the issue in detail. Include what happened, when it occurred, and any other relevant information..."
          rows={6}
          maxLength={maxLength}
          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all resize-none ${
            error ? "border-red-300" : "border-gray-200"
          }`}
        />

        {/* SECTION - Description Counter */}
        <div className="mt-2 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {value.length}/{maxLength} characters
          </div>

          {/* SECTION - Error Message */}
          {error && (
            <p className="text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {error}
            </p>
          )}
        </div>
      </div>
    </>
  )
}

export default DescriptionInput
