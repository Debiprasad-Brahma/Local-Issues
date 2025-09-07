import React, {useContext} from "react"
import {Plus, ArrowRight} from "lucide-react"
import {useNavigate} from "react-router-dom"
import {AppContext} from "../context/AppContext"
import {motion} from "motion/react"
const Header = () => {
  const {user, setShowLogin} = useContext(AppContext)
  const navigate = useNavigate()
  const onClickHandler = () => {
    if (user) navigate("/reportissue") // NOTE If true navigate to reportissue
    else setShowLogin(true) // NOTE else show login page
  }
  const onClickHandler2 = () => {
    if (user) navigate("/dashboard") // NOTE If true navigate to dashboard
    else setShowLogin(true) // NOTE else show login page
  }
  return (
    <>
      <motion.div
        initial={{opacity: 0.2, y: 100}}  
        transition={{duration: 1}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true}}
      >
        <section className="relative py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              {/* NOTE - Heading */}
              <motion.h1
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 0.4, duration: 2}}
                className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
              >
                Your Voice for{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Local Change
                </span>
              </motion.h1>

              {/* NOTE - Paragraph */}
              <motion.p
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.6, duration: 0.8}}
                className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
              >
                Report local issues, vote on community problems, and track their resolution.
                Together, we can make our neighborhoods better.
              </motion.p>

              <div className="flex flex-col sm:flex-row gap-8 justify-center">
                {/* NOTE - Explore Issues Button */}
                <motion.button
                  whileHover={{scale: 1.05}}
                  whileTap={{scale: 0.95}}
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  transition={{default: {duration: 0.5}, opacity: {delay: 0.8, duration: 1}}}
                  onClick={onClickHandler2}
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  <span className="font-semibold">Explore Issues</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                {/* NOTE - Report Issue Button */}
                <motion.button
                  whileHover={{scale: 1.05}}
                  whileTap={{scale: 0.95}}
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  transition={{default: {duration: 0.5}, opacity: {delay: 0.8, duration: 1}}}
                  onClick={onClickHandler}
                  className="flex items-center justify-center space-x-2 bg-white text-gray-900 px-8 py-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  <Plus className="w-5 h-5" />
                  <span className="font-semibold">Report Issue</span>
                </motion.button>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  )
}

export default Header
