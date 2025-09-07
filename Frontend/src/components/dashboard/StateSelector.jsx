import React from "react"
import {ChevronDown, MapPin} from "lucide-react"
import {motion} from "motion/react"

const StateSelector = ({selectedState, onStateChange, availableStates, stateData}) => {
  return (
    <motion.div
      initial={{opacity: 0.2, x: -100}}
      transition={{duration: 1}}
      whileInView={{opacity: 1, x: 0}}
      viewport={{once: true}}
      className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6 h-80"
    >
      <div className="absolute top-4 left-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-2">Select State for Analysis</h4>
        <div className="relative">
          <select
            value={selectedState}
            onChange={(e) => onStateChange(e.target.value)}
            className="w-64 p-3 border border-gray-300 rounded-lg appearance-none bg-white shadow-sm text-lg font-medium"
          >
            {availableStates.map((state) => (
              <option
                key={state}
                value={state}
              >
                {state}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className="absolute bottom-6 left-6 bg-white p-4 rounded-lg shadow-lg border">
        <div className="flex items-center space-x-2 mb-3">
          <MapPin className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-gray-800">{selectedState}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-600">Total Feedback</div>
            <div className="font-bold text-lg">{stateData.totalFeedback.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-gray-600">Top City</div>
            <div className="font-bold text-lg">{stateData.topCity}</div>
          </div>
          <div>
            <div className="text-gray-600">Positive Rate</div>
            <div className="font-bold text-lg text-green-600">{stateData.positivePercentage}%</div>
          </div>
          <div>
            <div className="text-gray-600">Urgent Cases</div>
            <div className="font-bold text-lg text-red-600">{stateData.urgentCases}%</div>
          </div>
        </div>
      </div>

      <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-sm">
        <div className="text-sm font-medium text-gray-700 mb-2">Analysis for:</div>
        <div className="text-2xl font-bold text-blue-600">{selectedState}</div>
      </div>
    </motion.div>
  )
}

export default StateSelector
