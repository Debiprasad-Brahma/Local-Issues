import React from "react"
import {motion} from "motion/react"
const DashboardHeader = ({selectedState}) => {
  return (
    <motion.div
      initial={{opacity: 0.2, y: 100}}
      transition={{duration: 1}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true}}
      className="mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <motion.h1
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 0.4, duration: 2}}
            className="text-3xl font-bold text-gray-900"
          >
            State Feedback Dashboard
          </motion.h1>
          <motion.p
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.6, duration: 0.8}}
            className="text-gray-600 mt-1"
          >
            Analyzing feedback data for {selectedState}
          </motion.p>
        </div>
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.6, duration: 0.8}}
          className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-medium"
        >
          Current State: {selectedState}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default DashboardHeader
