import React from "react"
import {motion} from "motion/react"
const DashboardFilters = ({
  selectedState,
  dateRange,
  onDateRangeChange,
  sentimentFilter,
  onSentimentFilterChange,
}) => {
  return (
    <motion.div
      initial={{opacity: 0.2, x: -100}}
      transition={{duration: 1.3}}
      whileInView={{opacity: 1, x: 0}}
      viewport={{once: true}}
      className="bg-white p-6 rounded-lg shadow-sm"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Selected State</label>
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
            <span className="text-blue-800 font-medium">{selectedState}</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
          <div className="space-y-2">
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) => onDateRangeChange({...dateRange, from: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            />
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) => onDateRangeChange({...dateRange, to: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sentiment</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={sentimentFilter.positive}
                onChange={(e) =>
                  onSentimentFilterChange({...sentimentFilter, positive: e.target.checked})
                }
                className="mr-2"
              />
              <span className="text-sm">Positive</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={sentimentFilter.negative}
                onChange={(e) =>
                  onSentimentFilterChange({...sentimentFilter, negative: e.target.checked})
                }
                className="mr-2"
              />
              <span className="text-sm">Negative</span>
            </label>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default DashboardFilters
