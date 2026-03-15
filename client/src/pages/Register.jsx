import { useState } from "react"
import API from "../api/api"
// import { useNavigate } from "react-router-dom"

function Register({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    try {
      await API.post("/auth/register", form)
      // alert(res.data.message)
      alert("Registration successful! Please login.")
      // 🔁 switch back to login
      onSuccess()
    } catch (err) {
      alert(err.response?.data?.message || "Register failed")
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        className="w-full p-2 mb-3 border rounded"
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full p-2 mb-3 border rounded"
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full p-2 mb-3 border rounded"
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  )
}


export default Register
