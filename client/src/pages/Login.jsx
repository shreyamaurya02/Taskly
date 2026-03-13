import { useState, useEffect } from "react"
import API from "../api/api"
import { useNavigate } from "react-router-dom"

function Login() {
  const navigate = useNavigate()
  

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard")
    }
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await API.post("/auth/login", {
        email,
        password
      })

     // SAVE AUTH DATA
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("user", JSON.stringify(res.data.user))


      // TEMP: redirect to dashboard
      navigate("/dashboard")

    } catch (err) {
      alert(err.response?.data?.message || "Login failed")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>

    </div>
  )
}

export default Login
