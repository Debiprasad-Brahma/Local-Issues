import React, { useContext } from "react"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import {Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import Notification from "./pages/Notification"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import { AppContext } from "./context/AppContext"
import ReportIssue from "./pages/ReportIssue"

function App() {
  const {showLogin} = useContext(AppContext)
  return (
    <>
      <div>
        <Navbar />
        {showLogin && <Login />}
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
          <Route
            path="/notification"
            element={<Notification />}
          />
          <Route
            path="/profile"
            element={<Profile />}
          />
          <Route
            path="/reportissue"
            element={<ReportIssue />}
          />
        </Routes>
      </div>
    </>
  )
}

export default App
