// server/routes/tasks.js
const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const Task = require("../models/Task")

// GET all tasks for current user
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user.id })
  res.json({ tasks })
  
})

// UPDATE task
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, completed } = req.body

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        ...(title !== undefined && { title }),
        ...(completed !== undefined && { completed })
      },
      { new: true }
    )

    res.json({ task })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Update failed" })
  }
})



router.post("/", auth, async (req, res) => {
  const task = new Task({
    title: req.body.title,
    user: req.user.id,
  })

  await task.save()
  res.status(201).json({ task })

})


// DELETE task
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    // 🔐 Ensure user owns the task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" })
    }

    await task.deleteOne()
    res.json({ message: "Task deleted" })

  } catch (err) {
    console.error("Delete task error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router

