import {Bell, RefreshCw} from "lucide-react"
import {useState} from "react"

export default function Nothing() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50">   
      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          {/* Notification Icon */}
          <div className="mx-auto mb-6 w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
            <Bell className="w-10 h-10 text-gray-600" />
          </div>

          {/* Empty State Content */}
          <h2 className="text-gray-800 text-xl font-semibold mb-3">No notifications yet</h2>

          <p className="text-gray-600 text-base leading-relaxed mb-6">
            When you have new notifications, they'll appear here. Check back later for updates!
          </p>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>
    </div>
  )
}
