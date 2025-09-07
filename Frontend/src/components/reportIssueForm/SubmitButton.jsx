import React from "react"
import {Send} from "lucide-react"

const SubmitButton = ({isSubmitting, disabled}) => {
  return (
    <div className="text-center">
      <button
        type="submit"
        disabled={isSubmitting || disabled}
        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            Submitting Report...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Submit Report
          </>
        )}
      </button>
    </div>
  )
}

export default SubmitButton
