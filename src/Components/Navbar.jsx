// import axios from 'axios'
// import React, { useEffect, useRef, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

// const Navbar = () => {
//   const userData = useSelector(store => store.user)
//   const [q, setQ] = useState("")
//   const [suggestions, setSuggestions] = useState([])
//   const dropdownRef = useRef(null)
//   const nav = useNavigate()

//   useEffect(() => {
//     setSuggestions([])
//     if (!q) return

//     const intervalId = setTimeout(() => {
//       async function getData() {
//         const res = await axios.get(
//           import.meta.env.VITE_DOMAIN + `/api/follow-requests/search?q=${q}`,
//           { withCredentials: true }
//         )
//         setSuggestions(res.data.data)
//       }
//       getData()
//     }, 1000)

//     return () => clearTimeout(intervalId)
//   }, [q])

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setSuggestions([])
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside)
//     return () => document.removeEventListener("mousedown", handleClickOutside)
//   }, [])

//   return (
//     <div className="flex items-center justify-between px-4 md:px-8 py-3 bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 h-[65px] md:h-[80px]">
      
//       {/* Logo */}
//       <h3 className="text-lg md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 cursor-pointer whitespace-nowrap">
//         Nexora
//       </h3>

//       {/* Search */}
//       <div ref={dropdownRef} className="w-[45%] md:w-[50%] flex-col flex justify-center relative">
//         <input
//           onChange={(e) => setQ(e.target.value)}
//           type="text"
//           placeholder="Search..."
//           className="w-full px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base rounded-full bg-gradient-to-r from-pink-50 to-blue-50 focus:outline-none focus:ring-4 focus:ring-pink-300 placeholder-gray-400 shadow-sm transition"
//         />

//         {suggestions.length > 0 && (
//           <div className="w-full absolute top-10 mt-2 bg-white shadow-lg rounded-xl border border-gray-200 max-h-60 overflow-y-auto z-50">
//             {suggestions.map((item, idx) => (
//               <div
//                 onClick={() => {
//                   nav(`/profile/view/${item._id}`)
//                   setSuggestions([])
//                 }}
//                 key={idx}
//                 className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer transition"
//               >
//                 <img
//                   src={item.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
//                   alt="profile"
//                   className="h-9 w-9 rounded-full object-cover border border-gray-300"
//                 />
//                 <div className="flex flex-col">
//                   <p className="font-medium text-gray-800 text-sm">{item.firstName + " " + item.lastName}</p>
//                   <span className="text-xs text-gray-500">@{item.username}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* User Section */}
//       <div className="flex items-center space-x-2 md:space-x-4">
//         <p className="hidden md:block text-gray-800 font-semibold hover:text-pink-600 transition text-sm">
//           {userData.username}
//         </p>
//         <div onClick={() => nav("/profile")} className="relative group cursor-pointer">
//           <img
//             src={userData.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
//             alt="profile"
//             className="w-9 h-9 md:w-11 md:h-11 rounded-full ring-2 ring-transparent group-hover:ring-pink-400 transition object-cover"
//           />
//           <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white"></span>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Navbar







import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Bell } from 'lucide-react'

const Navbar = () => {
  const userData = useSelector(store => store.user)
  const [q, setQ] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const dropdownRef = useRef(null)
  const nav = useNavigate()

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

    // ✅ Har 30 second mein refresh
    const interval = setInterval(getUnreadCount, 30000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setSuggestions([])
    if (!q) return
    const intervalId = setTimeout(() => {
      async function getData() {
        const res = await axios.get(
          import.meta.env.VITE_DOMAIN + `/api/follow-requests/search?q=${q}`,
          { withCredentials: true }
        )
        setSuggestions(res.data.data)
      }
      getData()
    }, 1000)
    return () => clearTimeout(intervalId)
  }, [q])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setSuggestions([])
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="flex items-center justify-between px-4 md:px-8 py-3 bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 h-[65px] md:h-[80px]">

      {/* Logo */}
      <h3 className="text-lg md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 cursor-pointer whitespace-nowrap">
        Nexora
      </h3>

      {/* Search */}
      <div ref={dropdownRef} className="w-[40%] md:w-[50%] flex-col flex justify-center relative">
        <input
          onChange={(e) => setQ(e.target.value)}
          type="text"
          placeholder="Search..."
          className="w-full px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base rounded-full bg-gradient-to-r from-pink-50 to-blue-50 focus:outline-none focus:ring-4 focus:ring-pink-300 placeholder-gray-400 shadow-sm transition"
        />

        {suggestions.length > 0 && (
          <div className="w-full absolute top-10 mt-2 bg-white shadow-lg rounded-xl border border-gray-200 max-h-60 overflow-y-auto z-50">
            {suggestions.map((item, idx) => (
              <div
                onClick={() => { nav(`/profile/view/${item._id}`); setSuggestions([]) }}
                key={idx}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer transition"
              >
                <img
                  src={item.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                  alt="profile"
                  className="h-9 w-9 rounded-full object-cover border border-gray-300"
                />
                <div className="flex flex-col">
                  <p className="font-medium text-gray-800 text-sm">{item.firstName + " " + item.lastName}</p>
                  <span className="text-xs text-gray-500">@{item.username}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 md:gap-4">

        {/* ✅ Bell Icon */}
        <button
          onClick={() => nav("/notifications")}
          className="relative p-2 rounded-full hover:bg-pink-50 transition"
        >
          <Bell size={22} className="text-gray-600" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-pink-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        <p className="hidden md:block text-gray-800 font-semibold hover:text-pink-600 transition text-sm">
          {userData.username}
        </p>

        <div onClick={() => nav("/profile")} className="relative group cursor-pointer">
          <img
            src={userData.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
            alt="profile"
            className="w-9 h-9 md:w-11 md:h-11 rounded-full ring-2 ring-transparent group-hover:ring-pink-400 transition object-cover"
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white"></span>
        </div>
      </div>
    </div>
  )
}

export default Navbar