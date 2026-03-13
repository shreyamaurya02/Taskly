export default function TaskCard({ task, onDelete }) {
  return (
    <div className="bg-white p-4 rounded shadow flex justify-between">
      <span>{task.title}</span>
      <button onClick={onDelete} className="text-red-600 font-bold">
        ✖
      </button>
    </div>
  )
}

