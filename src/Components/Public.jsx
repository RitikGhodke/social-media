// import axios from "axios"
// import { useState } from "react"
// import toast from "react-hot-toast"
// import { useDispatch, useSelector } from "react-redux"
// import { useParams } from "react-router-dom"
// import { addUserData } from "../Utils/UserSlice"

// const Public = ({ data }) => {
//   const { userId } = useParams()
//   const userSliceData = useSelector((store) => store.user)
//   const dispatch = useDispatch()
 

//   const [isFollowing, setIsFollowing] = useState(
//     userSliceData.following.some((item) => userId == item)
//   )

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

//   const[followersCount, setFollowersCount] = useState(followers.length)
//   const handleFollowToggle = () => {

//     async function follow()
//     {
//       try {
//         const res = await axios.post(import.meta.env.VITE_DOMAIN + `/api/follow-requests/${userId}`, {}, {withCredentials : true})
//         // console.log(res)
//         setIsFollowing((prev) => !prev)
//         setFollowersCount(followersCount + 1)
//         dispatch(addUserData(res.data.data))

//       } catch (error) {
//         toast.error("Error")
//       }
//     }


//     async function unfollow() {
//       try {
//         const res = await axios.patch(import.meta.env.VITE_DOMAIN + `/api/follow-requests/unfollow/${userId}`, {}, {withCredentials : true})
//         // console.log(res)
//         setIsFollowing((prev) => !prev)
//         setFollowersCount(followersCount - 1)
//         dispatch(addUserData(res.data.data))
        

//       } catch (error) {
//         toast.error("Error")
//       }
//     }


//     if (isFollowing) {
//       unfollow()
//     } else {
//       follow()
//     }
//   }

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-10">
//       {/* Profile header */}
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

//             {/* Follow button */}
//             <button
//               onClick={handleFollowToggle}
//               className={`px-4 py-1 rounded-lg text-sm font-medium transition ${
//                 isFollowing
//                   ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                   : "bg-pink-500 text-white hover:bg-pink-600"
//               }`}
//             >
//               {isFollowing ? "Following" : "Follow"}
//             </button>
//           </div>

//           {/* Stats */}
//           <div className="flex gap-6 mt-3 text-gray-700">
//             <p>
//               <span className="font-semibold">{posts.length}</span> Posts
//             </p>
//             <p>
//               <span className="font-semibold">{followersCount}</span>{" "}
//               Followers
//             </p>
//             <p>
//               <span className="font-semibold">{following.length}</span>{" "}
//               Following
//             </p>
//           </div>

//           {/* Bio */}
//           <p className="mt-4 text-gray-700 leading-relaxed">{bio}</p>
//         </div>
//       </div>

//       {/* Posts grid OR Empty state */}
//       {posts.length > 0 ? (
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
//           {posts.map((item, index) => (
//             <div
//               key={item._id}
//               className="relative group rounded-xl overflow-hidden shadow-md"
//             >
//               <img
//                 className="h-[280px] w-full object-cover transform group-hover:scale-110 transition duration-500"
//                 src={item.media[0]}
//                 alt={`post-${index}`}
//               />

//               {/* Hover overlay */}
//               <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-6 text-white font-semibold text-lg transition">
//                 <span>❤ {item.likes?.length || 0}</span>
//                 <span>💬 {item.comments?.length || 0}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
//           <p className="text-lg font-medium">No posts yet</p>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Public








// import axios from "axios"
// import { useState } from "react"
// import toast from "react-hot-toast"
// import { useDispatch, useSelector } from "react-redux"
// import { useParams } from "react-router-dom"
// import { addUserData } from "../Utils/UserSlice"

// const Public = ({ data }) => {
//   const { userId } = useParams()
//   const userSliceData = useSelector((store) => store.user)
//   const dispatch = useDispatch()

//   const [isFollowing, setIsFollowing] = useState(
//     userSliceData.following.some((item) => userId == item)
//   )

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

//   const [followersCount, setFollowersCount] = useState(followers.length)

//   const handleFollowToggle = () => {

//     async function follow() {
//       try {
//         const res = await axios.post(
//           import.meta.env.VITE_DOMAIN + `/api/follow-request/${userId}`, // ✅ Fixed
//           {},
//           { withCredentials: true }
//         )
//         setIsFollowing(true)
//         setFollowersCount(prev => prev + 1)
//         dispatch(addUserData(res.data.data))
//       } catch (error) {
//         toast.error("Error following user")
//       }
//     }

//     async function unfollow() {
//       try {
//         const res = await axios.patch(
//           import.meta.env.VITE_DOMAIN + `/api/follow-requests/unfollow/${userId}`,
//           {},
//           { withCredentials: true }
//         )
//         setIsFollowing(false)
//         setFollowersCount(prev => prev - 1)
//         dispatch(addUserData(res.data.data))
//       } catch (error) {
//         toast.error("Error unfollowing user")
//       }
//     }

//     if (isFollowing) {
//       unfollow()
//     } else {
//       follow()
//     }
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

//             <button
//               onClick={handleFollowToggle}
//               className={`px-4 py-1 rounded-lg text-sm font-medium transition ${
//                 isFollowing
//                   ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                   : "bg-pink-500 text-white hover:bg-pink-600"
//               }`}
//             >
//               {isFollowing ? "Following" : "Follow"}
//             </button>
//           </div>

//           <div className="flex gap-6 mt-3 text-gray-700">
//             <p><span className="font-semibold">{posts.length}</span> Posts</p>
//             <p><span className="font-semibold">{followersCount}</span> Followers</p>
//             <p><span className="font-semibold">{following.length}</span> Following</p>
//           </div>

//           <p className="mt-4 text-gray-700 leading-relaxed">{bio}</p>
//         </div>
//       </div>

//       {posts.length > 0 ? (
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
//           {posts.map((item, index) => (
//             <div
//               key={item._id}
//               className="relative group rounded-xl overflow-hidden shadow-md"
//             >
//               <img
//                 className="h-[280px] w-full object-cover transform group-hover:scale-110 transition duration-500"
//                 src={item.media[0]}
//                 alt={`post-${index}`}
//               />
//               <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-6 text-white font-semibold text-lg transition">
//                 <span>❤ {item.likes?.length || 0}</span>
//                 <span>💬 {item.comments?.length || 0}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
//           <p className="text-lg font-medium">No posts yet</p>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Public







import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { addUserData } from "../Utils/UserSlice"

const Public = ({ data }) => {
  // ✅ Guard - agar data nahi hai to kuch mat dikhao
  if (!data || !data.firstName) return null

  const { userId } = useParams()
  const userSliceData = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const nav = useNavigate()

  const [isFollowing, setIsFollowing] = useState(
    userSliceData.following.some((item) => userId == item)
  )

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

  const [followersCount, setFollowersCount] = useState(followers?.length || 0)

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        // Unfollow
        const res = await axios.patch(
          import.meta.env.VITE_DOMAIN + `/api/follow-requests/unfollow/${userId}`,
          {},
          { withCredentials: true }
        )
        
        setIsFollowing(false)
        setFollowersCount(prev => prev - 1)
        dispatch(addUserData(res.data.data))
        toast.success("Unfollowed successfully")
      } else {
        // Follow (Public account - instant follow)
        const res = await axios.post(
          import.meta.env.VITE_DOMAIN + `/api/follow-requests/${userId}`,
          {},
          { withCredentials: true }
        )
        
        setIsFollowing(true)
        setFollowersCount(prev => prev + 1)
        dispatch(addUserData(res.data.data))
        toast.success("Following!")
      }
    } catch (error) {
      console.log("Follow/Unfollow error:", error.response?.data)
      toast.error(error.response?.data?.error || "Action failed")
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
        <img
          src={
            profilePicture ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          alt={`${firstName} ${lastName}`}
          className="w-32 h-32 rounded-full object-cover border-4 border-pink-200 shadow-md"
        />

        <div className="flex-1">
          <div className="flex items-center gap-4">
            <p className="text-2xl font-bold text-gray-800">
              {firstName} {lastName}{" "}
              <span className="text-gray-500 text-lg font-normal">
                @{username}
              </span>
            </p>

            {/* Follow/Unfollow Button */}
            <button
              onClick={handleFollowToggle}
              className={`px-4 py-1 rounded-lg text-sm font-medium transition ${
                isFollowing
                  ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  : "bg-pink-500 text-white hover:bg-pink-600"
              }`}
            >
              {isFollowing ? "Following" : "Follow"}
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
              <span className="font-semibold">{posts?.length || 0}</span> Posts
            </p>
            <p>
              <span className="font-semibold">{followersCount}</span> Followers
            </p>
            <p>
              <span className="font-semibold">{following?.length || 0}</span> Following
            </p>
          </div>

          {/* Bio */}
          <p className="mt-4 text-gray-700 leading-relaxed">
            {bio || "No bio available"}
          </p>
        </div>
      </div>

      {/* Posts Grid OR Empty State */}
      {posts && posts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
          {posts.map((item, index) => (
            <div
              key={item._id || index}
              className="relative group rounded-xl overflow-hidden shadow-md cursor-pointer"
              onClick={() => nav(`/post/${item._id}`)}
            >
              <img
                className="h-[280px] w-full object-cover transform group-hover:scale-110 transition duration-500"
                src={item.media?.[0] || "https://placehold.co/300x300/png"}
                alt={`post-${index}`}
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-6 text-white font-semibold text-lg transition">
                <span>❤️ {item.likes?.length || 0}</span>
                <span>💬 {item.comments?.length || 0}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
          <p className="text-6xl mb-4">📷</p>
          <p className="text-lg font-medium">No posts yet</p>
          <p className="text-sm mt-2">When {firstName} posts, you'll see them here</p>
        </div>
      )}
    </div>
  )
}

export default Public