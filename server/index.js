
console.log("🔥 index.js started");

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

const app = express()
app.use(cors({
  origin: "*"
}))
app.use(express.json())
// app.use("/api/tasks", require("./routes/task"))


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.log("MongoDB connection error:", err))

// Test route
app.get("/api", (req, res) => {
  res.send("Taskly API is running 🚀")
})

// Auth routes
const authRoutes = require("./routes/auth")
app.use("/api/auth", authRoutes)

//task route
const taskRoutes = require("./routes/task")
app.use("/api/tasks", taskRoutes)


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
