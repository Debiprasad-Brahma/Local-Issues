import React from "react"
import {PieChart, Pie, Cell, Tooltip, ResponsiveContainer} from "recharts"
import {motion} from "motion/react"
const CategoriesChart = ({selectedState, categoriesData}) => {
  return (
    <motion.div
      initial={{opacity: 0.2, y: 100}}
      transition={{duration: 1.3}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true}}
      className="bg-white p-6 rounded-lg shadow-sm"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Issues - {selectedState}</h3>
      <ResponsiveContainer
        width="100%"
        height={200}
      >
        <PieChart>
          <Pie
            data={categoriesData}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={80}
            dataKey="value"
          >
            {categoriesData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="space-y-2 mt-4">
        {categoriesData.map((category, index) => (
          <div
            key={index}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{backgroundColor: category.color}}
              ></div>
              <span className="text-gray-700">{category.name}</span>
            </div>
            <span className="font-medium text-gray-900">{category.value}%</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default CategoriesChart
