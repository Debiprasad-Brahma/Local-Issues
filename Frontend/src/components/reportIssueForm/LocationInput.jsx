import React from "react"
import {MapPin, AlertCircle} from "lucide-react"

const LocationInput = ({value, onChange, error}) => {
  return (
    <>
      <div>

        {/* SECTION - Location Header */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location <span className="text-red-500">*</span>
        </label>

        {/* SECTION - Location */}
        <div className="relative">
          <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="e.g., Near City Hospital, Main Street, Mumbai - 400001"
            className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all ${
              error ? "border-red-300" : "border-gray-200"
            }`}
          />
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

export default LocationInput
