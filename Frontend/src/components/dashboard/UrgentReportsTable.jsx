import React from "react"
import {Image} from "lucide-react"
import {motion} from "motion/react"
const UrgentReportsTable = ({selectedState, urgentReports}) => {
  const getUrgencyColor = (urgency) => {
    switch (urgency.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <motion.div
      initial={{opacity: 0.2, x: 100}}
      transition={{duration: 1.3}}
      whileInView={{opacity: 1, x: 0}}
      viewport={{once: true}}
      className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Recent Urgent Reports - {selectedState}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 px-2 font-medium text-gray-700">City</th>
              <th className="text-left py-2 px-2 font-medium text-gray-700">Issue Summary</th>
              <th className="text-left py-2 px-2 font-medium text-gray-700">Urgency Level</th>
              <th className="text-left py-2 px-2 font-medium text-gray-700">Date</th>
              <th className="text-left py-2 px-2 font-medium text-gray-700">Image</th>
            </tr>
          </thead>
          <tbody>
            {urgentReports.map((report, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-3 px-2 font-medium">{report.city}</td>
                <td className="py-3 px-2 max-w-xs">{report.issue}</td>
                <td className="py-3 px-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(
                      report.urgency,
                    )}`}
                  >
                    {report.urgency}
                  </span>
                </td>
                <td className="py-3 px-2">{report.date}</td>
                <td className="py-3 px-2">
                  <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                    <Image className="w-4 h-4 text-gray-500" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

export default UrgentReportsTable
