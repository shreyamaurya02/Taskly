import { useState } from "react"
import Login from "./Login"
import Register from "./Register"
import bg from "../assets/bg.jpg"

function Auth() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    // <div
    //   className="min-h-screen flex items-center justify-center bg-cover bg-center"
    //   style={{ backgroundImage: `url(${bg})` }}
    // >

    <div className="relative min-h-screen w-full overflow-hidden">
      
      {/* 🌄 Background Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${bg})`
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Glass card */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div
          className="
            w-[360px]
            h-[520px]
            sm:w-[380px]
            sm:h-[540px]
            p-8
            rounded-2xl
            bg-white/20
            backdrop-blur-xl
            shadow-2xl
            border border-white/20
            flex flex-col justify-center
          "
        >
          <h1 className="text-3xl font-bold text-center text-white mb-6">
            Taskly 🚀
          </h1>
          <p className="text-center text-white/80 text-sm mb-6">
            Organize your daily tasks with clarity, speed, and focus.
          </p>

          {isLogin ? (
            <Login />
          ) : (
            <Register onSuccess={() => setIsLogin(true)} />
          )}


          <p className="text-center mt-4 text-sm text-white">
            {isLogin ? "New here?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 font-semibold text-blue-300 hover:underline"
            >
              {isLogin ? "Create account" : "Login"}
            </button>
          </p>
        </div>
      </div>

    </div>
  )
}

export default Auth
