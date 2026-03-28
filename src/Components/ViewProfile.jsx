// import React, { useEffect, useState } from 'react'
// import Navbar from './Navbar'
// import Sidebar from './Sidebar'
// import PrivateAccount from './PrivateAccount'
// import Public from './Public'
// import axios from 'axios'
// import { useParams } from 'react-router-dom'

// const ViewProfile = () => {
//   const { userId } = useParams()
//   const [isPrivate, setIsPrivate] = useState(true)
//   const [userData, setUserData] = useState({})
//   const [loading, setLoading] = useState(true) // ✅ Loading state

//   useEffect(() => {
//     async function getProfile() {
//       try {
//         const res = await axios.get(
//           import.meta.env.VITE_DOMAIN + `/api/profile/${userId}`,
//           { withCredentials: true }
//         )
//         setIsPrivate(res.data.data.isPrivate)
//         setUserData(res.data.data)
//       } catch (error) {
//         console.error("Profile fetch error:", error)
//       } finally {
//         setLoading(false) // ✅ Chahe success ho ya error, loading band karo
//       }
//     }
//     getProfile()
//   }, [userId])

//   // ✅ Data aane tak render mat karo
//   if (loading) return <div className="flex justify-center items-center min-h-screen">
//     <p className="text-gray-500 text-lg">Loading...</p>
//   </div>

//   return (
//     <div>
//       <Navbar />
//       <div className='flex'>
//         <Sidebar />
//         {isPrivate ? <PrivateAccount data={userData} /> : <Public data={userData} />}
//       </div>
//     </div>
//   )
// }

// export default ViewProfile












// import React, { useEffect, useState } from 'react'
// import Navbar from './Navbar'
// import Sidebar from './Sidebar'
// import PrivateAccount from './PrivateAccount'
// import Public from './Public'
// import axios from 'axios'
// import { useParams } from 'react-router-dom'
// import toast from 'react-hot-toast'

// const ViewProfile = () => {
//   const { userId } = useParams()
//   const [isPrivate, setIsPrivate] = useState(true)
//   const [userData, setUserData] = useState({})
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     async function getProfile() {
//       try {
//         setLoading(true)
        
//         const res = await axios.get(
//           import.meta.env.VITE_DOMAIN + `/api/profile/${userId}`,
//           { withCredentials: true }
//         )
        
//         console.log("Profile data:", res.data.data)
        
//         setIsPrivate(res.data.data.isPrivate)
//         setUserData(res.data.data)
//       } catch (error) {
//         console.error("Profile fetch error:", error.response?.data)
//         toast.error(error.response?.data?.error || "Failed to load profile")
//       } finally {
//         setLoading(false)
//       }
//     }
    
//     getProfile()
//   }, [userId])

//   // ✅ Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
//         <Navbar />
//         <div className='flex'>
//           <Sidebar />
//           <div className="flex-1 flex justify-center items-center h-[80vh]">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-500 mx-auto mb-4"></div>
//               <p className="text-gray-700 text-lg font-semibold">Loading profile...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // ✅ Error state - agar userData empty hai
//   if (!userData || !userData.firstName) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
//         <Navbar />
//         <div className='flex'>
//           <Sidebar />
//           <div className="flex-1 flex justify-center items-center h-[80vh]">
//             <div className="text-center">
//               <p className="text-6xl mb-4">😔</p>
//               <p className="text-gray-700 text-xl font-semibold">User not found</p>
//               <p className="text-gray-500 mt-2">This profile doesn't exist or has been deleted</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
//       <Navbar />
//       <div className='flex'>
//         <Sidebar />
//         <div className="flex-1">
//           {isPrivate ? (
//             <PrivateAccount data={userData} setData={setUserData} />
//           ) : (
//             <Public data={userData} />
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ViewProfile













import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import PrivateAccount from './PrivateAccount'
import Public from './Public'
import axiosInstance from "../Utils/axiosInstance"
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

const ViewProfile = () => {
  const { userId } = useParams()
  const [isPrivate, setIsPrivate] = useState(true)
  const [userData, setUserData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getProfile() {
      try {
        setLoading(true)
        
        const res = await axiosInstance.get(
          `/api/profile/${userId}`,
          { withCredentials: true }
        )
        
        console.log("✅ Profile loaded:", res.data.data.username)
        
        setIsPrivate(res.data.data.isPrivate)
        setUserData(res.data.data)
      } catch (error) {
        console.error("❌ Profile fetch error:", error.response?.data)
        toast.error(error.response?.data?.error || "Failed to load profile")
      } finally {
        setLoading(false)
      }
    }
    
    getProfile()
  }, [userId])

  // ✅ Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
        <Navbar />
        <div className='flex'>
          <Sidebar />
          <div className="flex-1 flex justify-center items-center h-[80vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-500 mx-auto mb-4"></div>
              <p className="text-gray-700 text-lg font-semibold">Loading profile...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ✅ Error State - User Not Found
  if (!userData || !userData.firstName) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
        <Navbar />
        <div className='flex'>
          <Sidebar />
          <div className="flex-1 flex justify-center items-center h-[80vh]">
            <div className="text-center">
              <p className="text-6xl mb-4">😔</p>
              <p className="text-gray-700 text-xl font-semibold">User not found</p>
              <p className="text-gray-500 mt-2">This profile doesn't exist or has been deleted</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ✅ Success State - Show Profile
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
      <Navbar />
      <div className='flex'>
        <Sidebar />
        <div className="flex-1">
          {isPrivate ? (
            <PrivateAccount data={userData} setData={setUserData} />
          ) : (
            <Public data={userData} />
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewProfile