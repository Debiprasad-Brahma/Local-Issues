import React, {useContext} from "react"
import {Link, useNavigate} from "react-router-dom"
import {assets} from "../assets/assets"
import {AppContext} from "../context/AppContext"
import {Home} from "lucide-react"
const Navbar = () => {
  const {user, setShowLogin} = useContext(AppContext)
  const navigate = useNavigate()
  return (
    <>
      <div className="flex justify-between items-center px-4 sm:px-10 md:px-14 lg:px-28">
        {/*REVIEW - Navbar logo click should redirect to home*/}
        <Link to="/">
          <div className="flex items-center gap-2 p-3 font-bold text-[#7D66ED] flex-wrap sm:flex-nowrap">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              LocalVoice
            </h3>
            {/* text-lg sm:text-xl md:text-2xl lg:text-3xl leading-tight */}
          </div>
        </Link>

        {/*REVIEW - Notifiaction and Login design*/}
        <div>
          <ul className="flex items-center gap-8 font-bold">
            {/*REVIEW - Notifiaction image and the click should redirect to notification page*/}
            <li>
              <Link to="/notification">
                <img
                  className="w-7"
                  src={assets.notification}
                  alt=""
                />
              </Link>
            </li>

            {/*REVIEW - Check for Logedin or not*/}
            {user ? (
              //REVIEW - if Loged in is true redirect to profile page
              <li>
                <img
                  onClick={() => navigate("/profile")}
                  className="w-8 cursor-pointer"
                  src={assets.profile}
                  alt=""
                />
              </li>
            ) : (
              //REVIEW - if Loged in is false show login button
              <li>
                <button
                  onClick={() => setShowLogin(true)}
                  className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700 cursor-pointer"
                >
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Login</p>
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Navbar
