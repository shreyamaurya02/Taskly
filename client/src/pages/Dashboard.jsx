import { useEffect, useState } from "react"
import { getTasks, createTask, deleteTask, updateTask } from "../api/taskApi"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState("")
  

  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))

  // ✅ FETCH TASKS
  const fetchTasks = async () => {
    try {
      const res = await getTasks()
      setTasks(res.data.tasks || [])
    } catch (err) {
      console.log("Fetch tasks error:", err)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  // ✅ ADD TASK
  const handleAddTask = async () => {
    if (!title.trim()) return

    try {
      const res = await createTask({title})
      setTasks([...tasks, res.data.task])
      setTitle("")
    } catch (err) {
      console.log("Add task error:", err)
    }
  }

  // ✅ EDIT
  const handleEdit = (task) => {
    setEditingId(task._id)
    setEditTitle(task.title)
  }

  // update
const handleUpdate = async (id) => {
  if (!editTitle.trim()) return
  try {
    await updateTask(id, {
      title: editTitle
    })
    setEditingId(null)
    setEditTitle("") 
    fetchTasks()
  } catch (err) {
    console.log("Update error:", err)
  }
}

//toggle
const toggleComplete = async (task) => {
  try {
    await updateTask(task._id, {
      completed: !task.completed
    })
    fetchTasks()
  } catch (err) {
    console.log("Toggle error:", err)
  }
}

// ✅ DELETE
const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id)
      setTasks(tasks.filter((task) => task._id !== id))
    } catch (err) {
      console.log("Delete task error:", err)
    }
  }

// ✅ LOGOUT
// const handleLogout = () => {
//   localStorage.removeItem("user")
//   localStorage.removeItem("token")
//   navigate("/") // ✅ correct route
// }
const handleLogout = () => {
  localStorage.clear()
  navigate("/", { replace: true })
}


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      <main className="flex-grow p-6">
          <div className="max-w-4xl mx-auto">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              👋 Hi, {user?.name}
            </h1>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
              📋 Total Tasks
              <h2 className="text-2xl font-bold">{tasks.length}</h2>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
              ✅ Completed
              <h2 className="text-2xl font-bold">
                {tasks.filter(t => t.completed).length}
              </h2>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
              ⏳ Pending
              <h2 className="text-2xl font-bold">
                {tasks.filter(t => !t.completed).length}
              </h2>
            </div>
          </div>

          {/* ADD TASK */}
          <div className="flex gap-2 mb-4">
            <input
              className="flex-1 p-3 rounded-lg border dark:bg-gray-800 dark:text-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What’s your next task?"
            />

            <button
              onClick={handleAddTask}
              className="bg-blue-600 text-white px-5 rounded-lg"
            >
              Add
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-2">
            ✅ Completed: {tasks.filter(t => t.completed).length} / {tasks.length}
          </p>

          {/* TASK LIST */}
          <ul className="space-y-3">
            {tasks.map(task => (
              <li
                key={task._id}
                className="flex items-center justify-between py-2 border-b"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task)}
                  />

                  {editingId === task._id ? (
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="border rounded px-2 py-1 flex-1"
                    />
                  ) : (
                    <span
                      className={
                        task.completed ? "line-through text-gray-400" : ""
                      }
                    >
                      {task.title}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  {editingId === task._id ? (
                    <button
                      onClick={() => handleUpdate(task._id)}
                      className="text-green-600"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(task)}
                      className="text-blue-500"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </li>

            ))}
          </ul>

        </div>
      </main>

      <footer className="bg-gray border-t py-4 text-center">
        <p className="text-sm text-gray-500">
          Taskly helps you manage your daily routine tasks with ease and clarity!
        </p>
      </footer>

    </div>

  )
}

export default Dashboard
