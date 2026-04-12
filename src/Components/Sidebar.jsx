// import axios from "axios"
// import React, { useState } from "react"
// import { useDispatch } from "react-redux"
// import { Link, useNavigate } from "react-router-dom"
// import { clearData } from "../Utils/UserSlice"
// import ToggleSwitch from "./PrivacyBtn"

// const Sidebar = () => {
//   const [showSidebar, setShowSidebar] = useState(false)
//   const nav = useNavigate()
//   const dispatch = useDispatch()

//   function logout() {
//     async function logOut() {
//       await axios.post(
//         import.meta.env.VITE_DOMAIN + "/api/auth/logout",
//         {},
//         { withCredentials: true }
//       )
//       dispatch(clearData())
//       nav("/login")
//     }
//     logOut()
//   }

//   return (
//     <>
//       {/* ✅ DESKTOP Sidebar — md aur upar */}
//       <div className={
//         "hidden md:flex min-h-screen bg-gradient-to-b from-pink-200 via-purple-200 to-blue-200 flex-col p-4 space-y-6 transition-all duration-300 shadow-lg " +
//         (showSidebar ? "w-64" : "w-20")
//       }>
//         <i
//           onClick={() => setShowSidebar(!showSidebar)}
//           className="fa-solid fa-bars text-gray-700 cursor-pointer text-xl hover:text-blue-600 transition"
//         ></i>

//         <nav className="flex flex-col space-y-4 font-medium text-gray-800">
//           <Link to="/" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/60 hover:shadow-md transition">
//             <i className="fa-solid fa-house"></i>
//             {showSidebar && <span>Home</span>}
//           </Link>

//           <Link to="/profile" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/60 hover:shadow-md transition">
//             <i className="fa-solid fa-user"></i>
//             {showSidebar && <span>Profile</span>}
//           </Link>

//           <Link to="/chats" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/60 hover:shadow-md transition">
//             <i className="fa-solid fa-comments"></i>
//             {showSidebar && <span>Chats</span>}
//           </Link>

//           <Link to="/add" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/60 hover:shadow-md transition">
//             <i className="fa-solid fa-plus"></i>
//             {showSidebar && <span>Add New Post</span>}
//           </Link>

//           <Link to="/review-requests" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/60 hover:shadow-md transition">
//             <i className="fa-solid fa-user-group"></i>
//             {showSidebar && <span>Review Requests</span>}
//           </Link>

//           {showSidebar && <ToggleSwitch label={"Private Account"} />}
//         </nav>

//         {showSidebar && (
//           <button
//             onClick={logout}
//             className="w-full bg-gradient-to-r from-red-400 to-pink-500 hover:opacity-90 text-white py-2 rounded-xl font-semibold shadow-md transition"
//           >
//             Logout
//           </button>
//         )}
//       </div>

//       {/* ✅ MOBILE Bottom Navigation Bar */}
//       <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex justify-around items-center py-3 px-2">
//         <Link to="/" className="flex flex-col items-center text-gray-600 hover:text-pink-500 transition">
//           <i className="fa-solid fa-house text-xl"></i>
//           <span className="text-[10px] mt-0.5">Home</span>
//         </Link>

//         <Link to="/add" className="flex flex-col items-center text-gray-600 hover:text-pink-500 transition">
//           <i className="fa-solid fa-plus text-xl"></i>
//           <span className="text-[10px] mt-0.5">Post</span>
//         </Link>

//         <Link to="/chats" className="flex flex-col items-center text-gray-600 hover:text-pink-500 transition">
//           <i className="fa-solid fa-comments text-xl"></i>
//           <span className="text-[10px] mt-0.5">Chats</span>
//         </Link>

//         <Link to="/review-requests" className="flex flex-col items-center text-gray-600 hover:text-pink-500 transition">
//           <i className="fa-solid fa-user-group text-xl"></i>
//           <span className="text-[10px] mt-0.5">Requests</span>
//         </Link>

//         <Link to="/profile" className="flex flex-col items-center text-gray-600 hover:text-pink-500 transition">
//           <i className="fa-solid fa-user text-xl"></i>
//           <span className="text-[10px] mt-0.5">Profile</span>
//         </Link>

//         <button onClick={logout} className="flex flex-col items-center text-red-400 hover:text-red-600 transition">
//           <i className="fa-solid fa-right-from-bracket text-xl"></i>
//           <span className="text-[10px] mt-0.5">Logout</span>
//         </button>
//       </div>
//     </>
//   )
// }

// export default Sidebar










// import axios from "axios"
// import React, { useState } from "react"
// import { useDispatch } from "react-redux"
// import { Link, useNavigate } from "react-router-dom"
// import { clearData } from "../Utils/UserSlice"

// const Sidebar = () => {
//   const [showSidebar, setShowSidebar] = useState(false)
//   const nav = useNavigate()
//   const dispatch = useDispatch()

//   function logout() {
//     async function logOut() {
//       await axios.post(
//         import.meta.env.VITE_DOMAIN + "/api/auth/logout",
//         {},
//         { withCredentials: true }
//       )
//       dispatch(clearData())
//       nav("/login")
//     }
//     logOut()
//   }

//   return (
//     <>
//       <div className={
//         "hidden md:flex min-h-screen bg-gradient-to-b from-pink-200 via-purple-200 to-blue-200 flex-col p-4 space-y-6 transition-all duration-300 shadow-lg " +
//         (showSidebar ? "w-64" : "w-20")
//       }>
//         <i
//           onClick={() => setShowSidebar(!showSidebar)}
//           className="fa-solid fa-bars text-gray-700 cursor-pointer text-xl hover:text-blue-600 transition"
//         ></i>

//         <nav className="flex flex-col space-y-4 font-medium text-gray-800">
//           <Link to="/" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/60 hover:shadow-md transition">
//             <i className="fa-solid fa-house"></i>
//             {showSidebar && <span>Home</span>}
//           </Link>

//           <Link to="/profile" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/60 hover:shadow-md transition">
//             <i className="fa-solid fa-user"></i>
//             {showSidebar && <span>Profile</span>}
//           </Link>

//           <Link to="/chats" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/60 hover:shadow-md transition">
//             <i className="fa-solid fa-comments"></i>
//             {showSidebar && <span>Chats</span>}
//           </Link>

//           <Link to="/add" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/60 hover:shadow-md transition">
//             <i className="fa-solid fa-plus"></i>
//             {showSidebar && <span>Add New Post</span>}
//           </Link>

//           <Link to="/review-requests" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/60 hover:shadow-md transition">
//             <i className="fa-solid fa-user-group"></i>
//             {showSidebar && <span>Review Requests</span>}
//           </Link>
//         </nav>

//         {showSidebar && (
//           <button
//             onClick={logout}
//             className="w-full bg-gradient-to-r from-red-400 to-pink-500 hover:opacity-90 text-white py-2 rounded-xl font-semibold shadow-md transition"
//           >
//             Logout
//           </button>
//         )}
//       </div>

//       <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex justify-around items-center py-3 px-2">
//         <Link to="/" className="flex flex-col items-center text-gray-600 hover:text-pink-500 transition">
//           <i className="fa-solid fa-house text-xl"></i>
//           <span className="text-[10px] mt-0.5">Home</span>
//         </Link>

//         <Link to="/add" className="flex flex-col items-center text-gray-600 hover:text-pink-500 transition">
//           <i className="fa-solid fa-plus text-xl"></i>
//           <span className="text-[10px] mt-0.5">Post</span>
//         </Link>

//         <Link to="/chats" className="flex flex-col items-center text-gray-600 hover:text-pink-500 transition">
//           <i className="fa-solid fa-comments text-xl"></i>
//           <span className="text-[10px] mt-0.5">Chats</span>
//         </Link>

//         <Link to="/review-requests" className="flex flex-col items-center text-gray-600 hover:text-pink-500 transition">
//           <i className="fa-solid fa-user-group text-xl"></i>
//           <span className="text-[10px] mt-0.5">Requests</span>
//         </Link>

//         <Link to="/profile" className="flex flex-col items-center text-gray-600 hover:text-pink-500 transition">
//           <i className="fa-solid fa-user text-xl"></i>
//           <span className="text-[10px] mt-0.5">Profile</span>
//         </Link>

//         <button onClick={logout} className="flex flex-col items-center text-red-400 hover:text-red-600 transition">
//           <i className="fa-solid fa-right-from-bracket text-xl"></i>
//           <span className="text-[10px] mt-0.5">Logout</span>
//         </button>
//       </div>
//     </>
//   )
// }

// export default Sidebar













import axios from "axios"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { clearData } from "../Utils/UserSlice"

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const nav = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    async function getUnreadCount() {
      try {
        const res = await axios.get(
          import.meta.env.VITE_DOMAIN + "/api/notifications/unread-count",
          { withCredentials: true }
        )
        setUnreadCount(res.data.count)
      } catch (err) {
        console.error(err)
      }
    }
    getUnreadCount()
    const interval = setInterval(getUnreadCount, 30000)
    return () => clearInterval(interval)
  }, [])

  function logout() {
    async function logOut() {
      await axios.post(
        import.meta.env.VITE_DOMAIN + "/api/auth/logout",
        {},
        { withCredentials: true }
      )
      dispatch(clearData())
      nav("/login")
    }
    logOut()
  }

  return (
    <>
      {/* ✅ Desktop Sidebar */}
      <div className={
        "hidden md:flex min-h-screen bg-gradient-to-b from-pink-200 via-purple-200 to-blue-200 flex-col p-4 space-y-6 transition-all duration-300 shadow-lg " +
        (showSidebar ? "w-64" : "w-20")
      }>
        <i
          onClick={() => setShowSidebar(!showSidebar)}
          className="fa-solid fa-bars text-gray-700 cursor-pointer text-xl hover:text-blue-600 transition"
        ></i>

        <nav className="flex flex-col space-y-4 font-medium text-gray-800">
          <Link to="/" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/60 hover:shadow-md transition">
            <i className="fa-solid fa-house"></i>
            {showSidebar && <span>Home</span>}
          </Link>

          <Link to="/profile" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/60 hover:shadow-md transition">
            <i className="fa-solid fa-user"></i>
            {showSidebar && <span>Profile</span>}
          </Link>

          <Link to="/chats" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/60 hover:shadow-md transition">
            <i className="fa-solid fa-comments"></i>
            {showSidebar && <span>Chats</span>}
          </Link>

          <Link to="/add" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/60 hover:shadow-md transition">
            <i className="fa-solid fa-plus"></i>
            {showSidebar && <span>Add New Post</span>}
          </Link>

          <Link to="/review-requests" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/60 hover:shadow-md transition">
            <i className="fa-solid fa-user-group"></i>
            {showSidebar && <span>Review Requests</span>}
          </Link>

          {/* ✅ Notifications — Desktop */}
          <Link to="/notifications" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/60 hover:shadow-md transition relative">
            <div className="relative">
              <i className="fa-solid fa-bell"></i>
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-pink-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </div>
            {showSidebar && <span>Notifications</span>}
          </Link>
        </nav>

        {showSidebar && (
          <button
            onClick={logout}
            className="w-full bg-gradient-to-r from-red-400 to-pink-500 hover:opacity-90 text-white py-2 rounded-xl font-semibold shadow-md transition"
          >
            Logout
          </button>
        )}
      </div>

      {/* ✅ Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex justify-around items-center py-3 px-2">
        <Link to="/" className="flex flex-col items-center text-gray-600 hover:text-pink-500 transition">
          <i className="fa-solid fa-house text-xl"></i>
          <span className="text-[10px] mt-0.5">Home</span>
        </Link>

        <Link to="/add" className="flex flex-col items-center text-gray-600 hover:text-pink-500 transition">
          <i className="fa-solid fa-plus text-xl"></i>
          <span className="text-[10px] mt-0.5">Post</span>
        </Link>

        <Link to="/chats" className="flex flex-col items-center text-gray-600 hover:text-pink-500 transition">
          <i className="fa-solid fa-comments text-xl"></i>
          <span className="text-[10px] mt-0.5">Chats</span>
        </Link>

        {/* ✅ Notifications — Mobile */}
        <Link to="/notifications" className="flex flex-col items-center text-gray-600 hover:text-pink-500 transition relative">
          <div className="relative">
            <i className="fa-solid fa-bell text-xl"></i>
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-pink-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5">Alerts</span>
        </Link>

        <Link to="/review-requests" className="flex flex-col items-center text-gray-600 hover:text-pink-500 transition">
          <i className="fa-solid fa-user-group text-xl"></i>
          <span className="text-[10px] mt-0.5">Requests</span>
        </Link>

        <Link to="/profile" className="flex flex-col items-center text-gray-600 hover:text-pink-500 transition">
          <i className="fa-solid fa-user text-xl"></i>
          <span className="text-[10px] mt-0.5">Profile</span>
        </Link>

        <button onClick={logout} className="flex flex-col items-center text-red-400 hover:text-red-600 transition">
          <i className="fa-solid fa-right-from-bracket text-xl"></i>
          <span className="text-[10px] mt-0.5">Logout</span>
        </button>
      </div>
    </>
  )
}

export default Sidebar