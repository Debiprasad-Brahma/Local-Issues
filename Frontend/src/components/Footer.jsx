import React from "react"
import {Home, MapPin, CheckCircle, Shield} from "lucide-react"
import {motion} from "motion/react"
const Footer = () => {
  return (
    <>
      <motion.footer
        initial={{opacity: 0.2, y: 100}}
        transition={{duration: 1}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true}}
        className="bg-gray-900 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/*REVIEW - About LocalVoice */}
            <motion.div
              initial={{opacity: 0.2, y: 100}}
              transition={{duration: 1}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              className="lg:col-span-2"
            >
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  LocalVoice
                </h3>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                LocalVoice is a community-driven platform that empowers citizens to report local
                issues, vote on community problems, and collaborate with local authorities to create
                positive change in their neighborhoods. Together, we build stronger, more responsive
                communities.
              </p>
              <div className="flex space-x-4">
                <button className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors duration-200">
                  <span className="text-blue-400 font-bold">f</span>
                </button>
                <button className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors duration-200">
                  <span className="text-blue-400 font-bold">@</span>
                </button>
                <button className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors duration-200">
                  <span className="text-blue-400 font-bold">in</span>
                </button>
              </div>
            </motion.div>

            {/* REVIEW - Contact Information */}
            <motion.div
              initial={{opacity: 0.2, y: 100}}
              transition={{duration: 1}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
            >
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300 text-sm">
                      123 Community Center Road
                      <br />
                      New Delhi, Delhi 110001
                      <br />
                      India
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <span className="text-blue-400">📞</span>
                  </div>
                  <p className="text-gray-300 text-sm">+91 11 2345 6789</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <span className="text-blue-400">📧</span>
                  </div>
                  <p className="text-gray-300 text-sm">support@localvoice.in</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <span className="text-blue-400">🕒</span>
                  </div>
                  <p className="text-gray-300 text-sm">Mon - Fri: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/*REVIEW - Bottom Bar */}
          <motion.div
            initial={{opacity: 0.2, y: 100}}
            transition={{duration: 1}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            className="border-t border-gray-800 mt-12 pt-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-6 mb-4 md:mb-0">
                <p className="text-gray-400 text-sm">© 2025 LocalVoice. All rights reserved.</p>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Secure Platform</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span>Privacy Protected</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.footer>
    </>
  )
}

export default Footer
