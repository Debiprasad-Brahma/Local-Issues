import React, {useContext, useEffect, useState} from "react"
import {assets} from "../assets/assets"
import {AppContext} from "../context/AppContext"
import {motion} from "motion/react"

const Login = () => {
  const [state, setState] = useState("Login")
  const {setShowLogin} = useContext(AppContext)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
        {/*REVIEW - Login Form */}
        <motion.form
          initial={{opacity: 0.2, y: 50}}
          transition={{duration: 0.3}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          className="relative bg-white p-10 rounded-xl text-slate-500"
        >
          {/* REVIEW - Heading */}
          <h1 className="text-center text-2xl text-neutral-700 font-medium">{state}</h1>
          <p className="text-sm">Welcome back! Please sign in to continue</p>

          {/* REVIEW - Input Box for Name*/}
          {state !== "Login" && (
            <div
              className="border px-4
           py-2 flex items-center gap-2 rounded-full mt-5"
            >
              <img
                width={30}
                src={assets.profile_icon}
                alt=""
              />
              <input
                className="outline-none text-sm"
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
          )}

          {/* REVIEW - Input Box for Email*/}
          <div
            className="border px-4
           py-2 flex items-center gap-2 rounded-full mt-4"
          >
            <img
              src={assets.email_icon}
              alt=""
            />
            <input
              className="outline-none text-sm"
              type="email"
              placeholder="Email id"
              required
            />
          </div>

          {/* REVIEW - Input Box for Password*/}
          <div
            className="border px-4
           py-2 flex items-center gap-2 rounded-full mt-4"
          >
            <img
              src={assets.lock_icon}
              alt=""
            />
            <input
              className="outline-none text-sm"
              type="password"
              placeholder="Password"
              required
            />
          </div>

          {/* REVIEW - For for Forgot Password*/}
          <p className="text-sm text-blue-600 my-4 cursor-pointer">Forgot Password ?</p>
          <button className="bg-blue-600 w-full text-white py-2 rounded-full cursor-pointer">
            {state === "Login" ? "login" : "Create Account"}
          </button>

          {/* REVIEW - For for Sign Up*/}
          {state === "Login" ? (
            <p className="mt-5 text-center">
              Dont't have an account ?
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setState("Sign Up")}
              >
                Sign Up
              </span>
            </p>
          ) : (
            // REVIEW - For for Login
            <p className="mt-5 text-center">
              Already have an account ?
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setState("Login")}
              >
                Login
              </span>
            </p>
          )}

          {/* REVIEW - For Cross Icon*/}
          <img
            className="absolute top-5 right-5 cursor-pointer"
            src={assets.cross_icon}
            alt=""
            onClick={() => setShowLogin(false)}
          />
        </motion.form>
      </div>
    </>
  )
}

export default Login
