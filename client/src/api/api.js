import axios from "axios"
console.log("API URL:", process.env.REACT_APP_API_URL)
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})
console.log("API URL:", process.env.REACT_APP_API_URL)
// 🔐 Attach JWT to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default API
