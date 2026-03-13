import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 text-white">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Organize Your Day with Taskly
      </h1>

      <p className="text-white/80 mb-6 max-w-xl">
        Taskly helps you manage your daily routine tasks with ease and clarity.
      </p>

      <Link
        to="/register"
        className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition"
      >
        Get Started
      </Link>
    </div>
  )
}
