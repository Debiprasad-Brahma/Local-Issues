import React from "react"
import {TrendingUp, BarChart3, Users, CheckCircle} from "lucide-react"
import {motion} from "motion/react"
const Stats = () => {
  const stats = [
    {title: "Total Issues", value: "1,234", icon: BarChart3, color: "bg-blue-500"},
    {title: "Active Citizens", value: "856", icon: Users, color: "bg-green-500"},
    {title: "Issues Resolved", value: "742", icon: CheckCircle, color: "bg-purple-500"},
    {title: "This Month", value: "89", icon: TrendingUp, color: "bg-orange-500"},
  ]
  return (
    <>
      <motion.section
        initial={{opacity: 0.2, y: 100}}
        transition={{duration: 1}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true}}
        className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-sm border border-gray-100 hover:scale-[1.02] transition-all duration-300 "
                >
                  <div
                    className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.title}</div>
                </div>
              )
            })}
          </div>
        </div>
      </motion.section>
    </>
  )
}

export default Stats
