import React, {useState, useMemo} from "react"
import DashboardHeader from "../components/dashboard/DashboardHeader"
import MetricsCards from "../components/dashboard/MetricsCards"
import StateSelector from "../components/dashboard/StateSelector"
import UrgentReportsTable from "../components/dashboard/UrgentReportsTable"
import SentimentTrendChart from "../components/dashboard/SentimentTrendChart"
import CategoriesChart from "../components/dashboard/CategoriesChart"
import DashboardFilters from "../components/dashboard/DashboardFilters"
import {stateDataBase} from "../components/data/StateData"
import {motion} from "motion/react"

const Dashboard = () => {
  const [selectedState, setSelectedState] = useState("Odisha")
  const currDate = new Date()
  const [dateRange, setDateRange] = useState({
    from: "2024-01-01",
    to: currDate.toISOString().split("T")[0],
  })
  const [sentimentFilter, setSentimentFilter] = useState({positive: true, negative: true})

  // Get current state data
  const currentStateData = useMemo(() => {
    return stateDataBase[selectedState] || stateDataBase["Odisha"]
  }, [selectedState])

  // Available states for dropdown
  const availableStates = Object.keys(stateDataBase)

  const filteredSentimentData = useMemo(() => {
    return currentStateData.sentimentTrend.map((item) => {
      return {
        month: item.month,
        Positive: sentimentFilter.positive ? item.Positive : 0,
        Negative: sentimentFilter.negative ? item.Negative : 0,
      }
    })
  }, [currentStateData.sentimentTrend, sentimentFilter])

  return (
    <div
      className="min-h-screen bg-gray-50 p-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <DashboardHeader selectedState={selectedState} />

        {/* Metrics Cards */}
        <MetricsCards
          stateData={currentStateData}
          selectedState={selectedState}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* State Selector */}
          <div className="lg:col-span-2">
            <StateSelector
              selectedState={selectedState}
              onStateChange={setSelectedState}
              availableStates={availableStates}
              stateData={currentStateData}
            />
          </div>

          {/* Sentiment Trend Chart */}
          <SentimentTrendChart
            selectedState={selectedState}
            sentimentData={filteredSentimentData}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters */}
          <DashboardFilters
            selectedState={selectedState}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            sentimentFilter={sentimentFilter}
            onSentimentFilterChange={setSentimentFilter}
          />

          {/* Categories Chart */}
          <CategoriesChart
            selectedState={selectedState}
            categoriesData={currentStateData.categories}
          />

          {/* Urgent Reports Table */}
          <UrgentReportsTable
            selectedState={selectedState}
            urgentReports={currentStateData.urgentReports}
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
