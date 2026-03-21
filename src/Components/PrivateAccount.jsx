// import React, { useEffect } from 'react'
// import { useParams } from 'react-router-dom'

// const PrivateAccount = ({data}) => {

//   console.log(data)
//   const{userId} = useParams()

//     const {
//     profilePicture,
//     firstName,
//     lastName,
//     username,
//     bio,
//     posts,
//     followers,
//     following,
//   } = data


//   return (
//     <div>
//             <div className="flex flex-col sm:flex-row sm:items-center gap-6">
//         <img
//           src={
//             profilePicture ||
//             "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
//           }
//           alt={`${firstName} ${lastName}`}
//           className="w-32 h-32 rounded-full object-cover border-4 border-pink-200 shadow-md"
//         />

//         <div className="flex-1">
//           <div className="flex items-center gap-4">
//             <p className="text-2xl font-bold text-gray-800">
//               {firstName + " " + lastName}{" "}
//               <span className="text-gray-500 text-lg font-normal">
//                 @{username}
//               </span>
//             </p>

       
//           </div>

//           {/* Stats */}
//           <div className="flex gap-6 mt-3 text-gray-700">
//             <p>
//               <span className="font-semibold">{posts?.length || posts}</span> Posts
//             </p>
//             <p>
//               <span className="font-semibold">{followers?.length || followers}</span>{" "}
//               Followers
//             </p>
//             <p>
//               <span className="font-semibold">{following?.length || following}</span>{" "}
//               Following
//             </p>
//           </div>

//           {/* Bio */}
//           <p className="mt-4 text-gray-700 leading-relaxed">{bio}</p>
//         </div>
//       </div>

//     </div>
//   )


// }

// export default PrivateAccount










// import React from 'react'
// import { useParams } from 'react-router-dom'

// const PrivateAccount = ({ data }) => {

//   // ✅ Safety guard — data aane tak kuch mat dikhao
//   if (!data || !data.firstName) return null

//   const {
//     profilePicture,
//     firstName,
//     lastName,
//     username,
//     bio,
//     posts,
//     followers,
//     following,
//   } = data

//   return (
//     <div className="flex-1 p-6">
//       <div className="flex flex-col sm:flex-row sm:items-center gap-6">
//         <img
//           src={
//             profilePicture ||
//             "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
//           }
//           alt={`${firstName} ${lastName}`}
//           className="w-32 h-32 rounded-full object-cover border-4 border-pink-200 shadow-md"
//         />

//         <div className="flex-1">
//           <div className="flex items-center gap-4">
//             <p className="text-2xl font-bold text-gray-800">
//               {firstName + " " + lastName}{" "}
//               <span className="text-gray-500 text-lg font-normal">
//                 @{username}
//               </span>
//             </p>
//           </div>

//           {/* Stats */}
//           <div className="flex gap-6 mt-3 text-gray-700">
//             <p>
//               <span className="font-semibold">{posts?.length ?? posts ?? 0}</span> Posts
//             </p>
//             <p>
//               <span className="font-semibold">{followers?.length ?? followers ?? 0}</span> Followers
//             </p>
//             <p>
//               <span className="font-semibold">{following?.length ?? following ?? 0}</span> Following
//             </p>
//           </div>

//           {/* Bio */}
//           <p className="mt-4 text-gray-700 leading-relaxed">{bio}</p>

//           {/* 🔒 Private Badge */}
//           <div className="mt-6 text-center text-gray-400">
//             <p className="text-4xl">🔒</p>
//             <p className="mt-2 font-semibold text-gray-600">This account is private</p>
//             <p className="text-sm">Follow this account to see their posts</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PrivateAccount







// import React, { useState } from 'react'
// import axios from 'axios'
// import toast from 'react-hot-toast'
// import { useParams } from 'react-router-dom'
// import { useSelector } from 'react-redux'

// const PrivateAccount = ({ data }) => {

//   if (!data || !data.firstName) return null

//   const { userId } = useParams()
//   const userSliceData = useSelector((store) => store.user)

//   const isAlreadyFollowing = userSliceData.following.some((item) => userId == item)

//   const [reqSent, setReqSent] = useState(data.reqAlreadySent || isAlreadyFollowing)
//   const [isFollowing, setIsFollowing] = useState(isAlreadyFollowing)

//   const {
//     profilePicture,
//     firstName,
//     lastName,
//     username,
//     bio,
//     posts,
//     followers,
//     following,
//   } = data

//   const handleFollow = async () => {
//     try {
//       await axios.post(
//         import.meta.env.VITE_DOMAIN + `/api/follow-request/${userId}`,
//         {},
//         { withCredentials: true }
//       )
//       setReqSent(true)
//       toast.success("Follow request sent!")
//     } catch (error) {
//       toast.error("Error sending request")
//     }
//   }

//   const handleUnfollow = async () => {
//     try {
//       await axios.patch(
//         import.meta.env.VITE_DOMAIN + `/api/follow-requests/unfollow/${userId}`,
//         {},
//         { withCredentials: true }
//       )
//       setIsFollowing(false)
//       setReqSent(false)
//       toast.success("Unfollowed!")
//     } catch (error) {
//       toast.error("Error unfollowing")
//     }
//   }

//   // Button ka text aur action decide karo
//   const renderButton = () => {
//     if (isFollowing) {
//       return (
//         <button
//           onClick={handleUnfollow}
//           className="px-4 py-1 rounded-lg text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
//         >
//           Following
//         </button>
//       )
//     }
//     if (reqSent) {
//       return (
//         <button
//           disabled
//           className="px-4 py-1 rounded-lg text-sm font-medium bg-yellow-100 text-yellow-600 cursor-not-allowed"
//         >
//           Requested
//         </button>
//       )
//     }
//     return (
//       <button
//         onClick={handleFollow}
//         className="px-4 py-1 rounded-lg text-sm font-medium bg-pink-500 text-white hover:bg-pink-600 transition"
//       >
//         Follow
//       </button>
//     )
//   }

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-10">
//       <div className="flex flex-col sm:flex-row sm:items-center gap-6">
//         <img
//           src={
//             profilePicture ||
//             "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
//           }
//           alt={`${firstName} ${lastName}`}
//           className="w-32 h-32 rounded-full object-cover border-4 border-pink-200 shadow-md"
//         />

//         <div className="flex-1">
//           <div className="flex items-center gap-4">
//             <p className="text-2xl font-bold text-gray-800">
//               {firstName + " " + lastName}{" "}
//               <span className="text-gray-500 text-lg font-normal">
//                 @{username}
//               </span>
//             </p>

//             {/* ✅ Follow / Requested / Following Button */}
//             {renderButton()}
//           </div>

//           {/* Stats */}
//           <div className="flex gap-6 mt-3 text-gray-700">
//             <p><span className="font-semibold">{posts?.length ?? posts ?? 0}</span> Posts</p>
//             <p><span className="font-semibold">{followers?.length ?? followers ?? 0}</span> Followers</p>
//             <p><span className="font-semibold">{following?.length ?? following ?? 0}</span> Following</p>
//           </div>

//           {/* Bio */}
//           <p className="mt-4 text-gray-700 leading-relaxed">{bio}</p>

//           {/* 🔒 Private — posts nahi dikhenge */}
//           <div className="mt-10 text-center text-gray-400 border-t pt-10">
//             <p className="text-4xl">🔒</p>
//             <p className="mt-2 font-semibold text-gray-600">This account is private</p>
//             <p className="text-sm">Follow this account to see their posts</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PrivateAccount















// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { useParams } from 'react-router-dom'
// import toast from 'react-hot-toast'

// const PrivateAccount = ({ data, setData }) => {
//   // ✅ Guard - agar data nahi hai to kuch mat dikhao
//   if (!data || !data.firstName) return null

//   const { userId } = useParams()
//   const userSliceData = useSelector(store => store.user)
  
//   // ✅ Check - already following hai kya?
//   const isAlreadyFollowing = userSliceData.following.some(item => item == userId)
  
//   const [isFollowing, setIsFollowing] = useState(isAlreadyFollowing)
//   const [isReqSent, setIsReqSent] = useState(false)

//   // ✅ Check karo - request already sent hai kya?
//   useEffect(() => {
//     async function checkReqStatus() {
//       try {
//         const res = await axios.get(
//           import.meta.env.VITE_DOMAIN + `/api/follow-requests/check/${userId}`,
//           { withCredentials: true }
//         )
//         setIsReqSent(res.data.flag)
//       } catch (error) {
//         console.log("Check request error:", error)
//       }
//     }

//     if (!isFollowing) {
//       checkReqStatus()
//     }
//   }, [userId, isFollowing])

//   const {
//     profilePicture,
//     firstName,
//     lastName,
//     username,
//     bio,
//     posts,
//     followers,
//     following,
//   } = data

//   // ✅ Follow/Unfollow/Cancel handler
//   async function followBtnHandler() {
//     try {
//       if (isFollowing) {
//         // Unfollow karo
//         const res = await axios.patch(
//           import.meta.env.VITE_DOMAIN + `/api/follow-requests/unfollow/${userId}`,
//           {},
//           { withCredentials: true }
//         )
        
//         if (setData) setData(res.data.toUserData)
//         setIsFollowing(false)
//         toast.success("Unfollowed successfully")
//       } else if (isReqSent) {
//         // Request cancel karo
//         await axios.delete(
//           import.meta.env.VITE_DOMAIN + `/api/follow-requests/${userId}`,
//           { withCredentials: true }
//         )
        
//         setIsReqSent(false)
//         toast.success("Request cancelled")
//       } else {
//         // Follow request bhejo
//         await axios.post(
//           import.meta.env.VITE_DOMAIN + `/api/follow-requests/${userId}`,
//           {},
//           { withCredentials: true }
//         )
        
//         setIsReqSent(true)
//         toast.success("Follow request sent!")
//       }
//     } catch (error) {
//       console.log("Follow action error:", error.response?.data)
//       toast.error(error.response?.data?.error || "Action failed")
//     }
//   }

//   // ✅ Button text decide karo
//   const getButtonText = () => {
//     if (isFollowing) return "Following"
//     if (isReqSent) return "Requested"
//     return "Follow"
//   }

//   const getButtonStyle = () => {
//     if (isFollowing) {
//       return "bg-gray-200 text-gray-700 hover:bg-gray-300"
//     }
//     if (isReqSent) {
//       return "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
//     }
//     return "bg-pink-500 text-white hover:bg-pink-600"
//   }

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-10">
//       <div className="flex flex-col sm:flex-row sm:items-center gap-6">
//         {/* Profile Picture */}
//         <img
//           src={
//             profilePicture ||
//             "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
//           }
//           alt={`${firstName} ${lastName}`}
//           className="w-32 h-32 rounded-full object-cover border-4 border-pink-200 shadow-md"
//         />

//         <div className="flex-1">
//           {/* Name & Follow Button */}
//           <div className="flex items-center gap-4">
//             <p className="text-2xl font-bold text-gray-800">
//               {firstName} {lastName}{" "}
//               <span className="text-gray-500 text-lg font-normal">
//                 @{username}
//               </span>
//             </p>

//             <button
//               onClick={followBtnHandler}
//               className={`px-4 py-1 rounded-lg text-sm font-medium transition ${getButtonStyle()}`}
//             >
//               {getButtonText()}
//             </button>
//           </div>

//           {/* Stats */}
//           <div className="flex gap-6 mt-3 text-gray-700">
//             <p>
//               <span className="font-semibold">{posts?.length ?? 0}</span> Posts
//             </p>
//             <p>
//               <span className="font-semibold">{followers?.length ?? 0}</span> Followers
//             </p>
//             <p>
//               <span className="font-semibold">{following?.length ?? 0}</span> Following
//             </p>
//           </div>

//           {/* Bio */}
//           <p className="mt-4 text-gray-700 leading-relaxed">
//             {bio || "No bio available"}
//           </p>

//           {/* 🔒 Private Account Message */}
//           <div className="mt-10 text-center text-gray-400 border-t pt-10">
//             <p className="text-4xl">🔒</p>
//             <p className="mt-2 font-semibold text-gray-600">
//               This account is private
//             </p>
//             <p className="text-sm">
//               Follow this account to see their posts
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PrivateAccount








import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

const PrivateAccount = ({ data, setData }) => {
  // ✅ Guard - agar data nahi hai to kuch mat dikhao
  if (!data || !data.firstName) return null

  const { userId } = useParams()
  const userSliceData = useSelector(store => store.user)
  const nav = useNavigate()
  
  // ✅ Check - already following hai kya?
  const isAlreadyFollowing = userSliceData.following.some(item => item == userId)
  
  const [isFollowing, setIsFollowing] = useState(isAlreadyFollowing)
  const [isReqSent, setIsReqSent] = useState(false)

  // ✅ Check karo - request already sent hai kya?
  useEffect(() => {
    async function checkReqStatus() {
      try {
        const res = await axios.get(
          import.meta.env.VITE_DOMAIN + `/api/follow-requests/check/${userId}`,
          { withCredentials: true }
        )
        setIsReqSent(res.data.flag)
      } catch (error) {
        console.log("Check request error:", error)
      }
    }

    if (!isFollowing) {
      checkReqStatus()
    }
  }, [userId, isFollowing])

  const {
    profilePicture,
    firstName,
    lastName,
    username,
    bio,
    posts,
    followers,
    following,
  } = data

  // ✅ Follow/Unfollow/Cancel handler
  async function followBtnHandler() {
    try {
      if (isFollowing) {
        // Unfollow karo
        const res = await axios.patch(
          import.meta.env.VITE_DOMAIN + `/api/follow-requests/unfollow/${userId}`,
          {},
          { withCredentials: true }
        )
        
        if (setData) setData(res.data.toUserData)
        setIsFollowing(false)
        toast.success("Unfollowed successfully")
      } else if (isReqSent) {
        // Request cancel karo
        await axios.delete(
          import.meta.env.VITE_DOMAIN + `/api/follow-requests/${userId}`,
          { withCredentials: true }
        )
        
        setIsReqSent(false)
        toast.success("Request cancelled")
      } else {
        // Follow request bhejo
        await axios.post(
          import.meta.env.VITE_DOMAIN + `/api/follow-requests/${userId}`,
          {},
          { withCredentials: true }
        )
        
        setIsReqSent(true)
        toast.success("Follow request sent!")
      }
    } catch (error) {
      console.log("Follow action error:", error.response?.data)
      toast.error(error.response?.data?.error || "Action failed")
    }
  }

  // ✅ Button text decide karo
  const getButtonText = () => {
    if (isFollowing) return "Following"
    if (isReqSent) return "Requested"
    return "Follow"
  }

  const getButtonStyle = () => {
    if (isFollowing) {
      return "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }
    if (isReqSent) {
      return "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
    }
    return "bg-pink-500 text-white hover:bg-pink-600"
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
        {/* Profile Picture */}
        <img
          src={
            profilePicture ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          alt={`${firstName} ${lastName}`}
          className="w-32 h-32 rounded-full object-cover border-4 border-pink-200 shadow-md"
        />

        <div className="flex-1">
          {/* Name & Buttons */}
          <div className="flex items-center gap-4">
            <p className="text-2xl font-bold text-gray-800">
              {firstName} {lastName}{" "}
              <span className="text-gray-500 text-lg font-normal">
                @{username}
              </span>
            </p>

            {/* Follow/Unfollow/Requested Button */}
            <button
              onClick={followBtnHandler}
              className={`px-4 py-1 rounded-lg text-sm font-medium transition ${getButtonStyle()}`}
            >
              {getButtonText()}
            </button>

            {/* Message Button */}
            <button 
              onClick={() => nav("/chat/" + userId)}
              className="px-4 py-1 rounded-lg text-sm font-medium transition bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Message
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-6 mt-3 text-gray-700">
            <p>
              <span className="font-semibold">{posts?.length ?? 0}</span> Posts
            </p>
            <p>
              <span className="font-semibold">{followers?.length ?? 0}</span> Followers
            </p>
            <p>
              <span className="font-semibold">{following?.length ?? 0}</span> Following
            </p>
          </div>

          {/* Bio */}
          <p className="mt-4 text-gray-700 leading-relaxed">
            {bio || "No bio available"}
          </p>

          {/* 🔒 Private Account Message */}
          <div className="mt-10 text-center text-gray-400 border-t pt-10">
            <p className="text-4xl">🔒</p>
            <p className="mt-2 font-semibold text-gray-600">
              This account is private
            </p>
            <p className="text-sm">
              Follow this account to see their posts
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivateAccount