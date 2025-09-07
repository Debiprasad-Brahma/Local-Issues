import React from "react"
import {FileText} from "lucide-react"

const FormHeader = () => {
  return (
    <>
      {/* SECTION - Form Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <FileText className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Report an Issue</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Help us improve your community by reporting issues. Your feedback is valuable and helps us
          prioritize improvements.
        </p>
      </div>
    </>
  )
}

export default FormHeader
