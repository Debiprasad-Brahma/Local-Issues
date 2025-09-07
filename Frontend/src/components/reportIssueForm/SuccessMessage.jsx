import React from "react"
import {CheckCircle} from "lucide-react"

const SuccessMessage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Report Submitted Successfully!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for reporting this issue. We've received your report and will investigate it
          soon.
        </p>
        <div className="text-sm text-gray-500">
          Report ID: #RPT{Date.now().toString().slice(-6)}
        </div>
      </div>
    </div>
  )
}

export default SuccessMessage
