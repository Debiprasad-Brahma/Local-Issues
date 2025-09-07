import React from "react"
import {AlertCircle, Star} from "lucide-react"

const PrioritySelection = ({priorityLevels, selectedPriority, onPriorityChange, error}) => {
  return (
    <>
      <div>
        {/* SECTION - Priority Selection Header */}
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Priority Level <span className="text-red-500">*</span>
        </label>

        {/* SECTION - Priority Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {priorityLevels.map((priority) => (
            <button
              key={priority.value}
              type="button"
              onClick={() => onPriorityChange(priority.value)}
              className={`p-4 border-2 rounded-xl text-left transition-all hover:shadow-md ${
                selectedPriority === priority.value
                  ? "border-blue-500 bg-blue-50 shadow-md"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${priority.color}`}>
                  {priority.label}
                </span>
                {priority.value === "critical" && <Star className="w-4 h-4 text-red-500" />}
              </div>
              <p className="text-xs text-gray-600">{priority.description}</p>
            </button>
          ))}
        </div>

        {/* SECTION - Priority Selection Error */}
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

export default PrioritySelection
