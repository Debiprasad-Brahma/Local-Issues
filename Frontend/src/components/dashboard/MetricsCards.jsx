import React from 'react';
import {motion} from "motion/react"
const MetricsCards = ({ stateData, selectedState }) => {
  return (
    <motion.div 
    initial={{opacity: 0.2, y: 100}}
      transition={{duration: 1}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true}}
    className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Total Feedback</h3>
        <p className="text-3xl font-bold text-gray-900">{stateData.totalFeedback.toLocaleString()}</p>
        <p className="text-sm text-gray-500 mt-1">in {selectedState}</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Positive Sentiment</h3>
        <div className="flex items-center space-x-3 mb-2">
          <div className="flex-1 bg-gray-200 rounded-full h-3">
            <div 
              className="bg-green-500 h-3 rounded-full transition-all duration-500" 
              style={{ width: `${stateData.positivePercentage}%` }}
            ></div>
          </div>
          <span className="text-2xl font-bold text-green-600">{stateData.positivePercentage}%</span>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Urgent Cases</h3>
        <p className="text-3xl font-bold text-red-600">{stateData.urgentCases}%</p>
        <p className="text-sm text-gray-500 mt-1">require attention</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Top City</h3>
        <p className="text-3xl font-bold text-purple-600">{stateData.topCity}</p>
        <p className="text-sm text-gray-500 mt-1">most active</p>
      </div>
    </motion.div>
  );
};

export default MetricsCards;