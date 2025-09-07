import React from "react"
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts"
import {motion} from "motion/react"
const SentimentTrendChart = ({selectedState, sentimentData}) => {
  return (
    <motion.div 
    initial={{opacity: 0.2, x: 100}}
      transition={{duration: 1.3}}
      whileInView={{opacity: 1, x: 0}}
      viewport={{once: true}}
    className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Sentiment Trend - {selectedState}
      </h3>
      <ResponsiveContainer
        width="100%"
        height={250}
      >
        <LineChart data={sentimentData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="Positive"
            stroke="#10B981"
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="Negative"
            stroke="#F59E0B"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Positive</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Negative</span>
        </div>
      </div>
    </motion.div>
  )
}

export default SentimentTrendChart
