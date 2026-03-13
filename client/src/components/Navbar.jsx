// import { Link } from "react-router-dom"

// export default function Navbar() {
//   return (
//     <nav className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center">
//       <Link to="/" className="text-xl font-bold">
//         Taskly
//       </Link>

//       <div className="space-x-4 hidden md:block">
//         <Link to="/login" className="hover:underline">Login</Link>
//         <Link to="/register" className="hover:underline">Register</Link>
//       </div>
//     </nav>
//   )
// }


import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white px-6 py-4 flex justify-between">
      <h1 className="text-xl font-bold">Taskly</h1>
      <Link to="/login" className="hover:underline">
        Logout
      </Link>
    </nav>
  )
}
