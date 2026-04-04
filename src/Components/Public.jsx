// import axios from "axios"
// import { useState } from "react"
// import toast from "react-hot-toast"
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate, useParams } from "react-router-dom"
// import { addUserData } from "../Utils/UserSlice"

// const Public = ({ data }) => {

//   // ✅ Guard
//   if (!data || !data.firstName) return null

//   const { userId } = useParams()
//   const userSliceData = useSelector((store) => store.user)
//   const dispatch = useDispatch()
//   const nav = useNavigate()

//   const [isFollowing, setIsFollowing] = useState(
//     userSliceData.following.some((item) => item === userId)
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

//   const [followersCount, setFollowersCount] = useState(followers?.length || 0)

//   const handleFollowToggle = async () => {
//     try {
//       if (isFollowing) {
//         // ✅ UNFOLLOW (correct route)
//         const res = await axios.patch(`${import.meta.env.VITE_DOMAIN}/api/follow-requests/unfollow/${userId}`,
//           {},
//           { withCredentials: true }
//         )

//         setIsFollowing(false)
//         setFollowersCount(prev => prev - 1)
//         toast.success("Unfollowed")

//       } else {
//         // ✅ FOLLOW (FIXED HERE 🔥)
//         const res = await axios.post(`${import.meta.env.VITE_DOMAIN}/api/follow-request/${userId}`,  // ✅ FIXED LINE
//           {},
//           { withCredentials: true }
//         )

//         setIsFollowing(true)
//         setFollowersCount(prev => prev + 1)
//         toast.success("Following!")
//       }

//     } catch (error) {
//       console.log("Follow/Unfollow error:", error.response?.data)
//       toast.error(error.response?.data?.error || "Action failed")
//     }
//   }

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-10">

//       {/* Profile Header */}
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
//               {firstName} {lastName}
//               <span className="text-gray-500 text-lg font-normal ml-2">
//                 @{username}
//               </span>
//             </p>

//             {/* Follow Button */}
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

//             {/* Message Button */}
//             <button
//               onClick={() => nav("/chat/" + userId)}
//               className="px-4 py-1 rounded-lg text-sm font-medium bg-gray-200 hover:bg-gray-300"
//             >
//               Message
//             </button>

//           </div>

//           {/* Stats */}
//           <div className="flex gap-6 mt-3 text-gray-700">
//             <p><span className="font-semibold">{posts?.length || 0}</span> Posts</p>
//             <p><span className="font-semibold">{followersCount}</span> Followers</p>
//             <p><span className="font-semibold">{following?.length || 0}</span> Following</p>
//           </div>

//           {/* Bio */}
//           <p className="mt-4 text-gray-700">
//             {bio || "No bio available"}
//           </p>
//         </div>
//       </div>

//       {/* Posts */}
//       {posts && posts.length > 0 ? (
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
//           {posts.map((item, index) => (
//             <div
//               key={item._id || index}
//               className="relative group rounded-xl overflow-hidden shadow-md cursor-pointer"
//               onClick={() => nav(`/post/${item._id}`)}
//             >
//               <img
//                 className="h-[280px] w-full object-cover group-hover:scale-110 transition"
//                 src={item.media?.[0] || "https://placehold.co/300"}
//                 alt="post"
//               />

//               <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex justify-center items-center gap-6 text-white">
//                 <span>❤️ {item.likes?.length || 0}</span>
//                 <span>💬 {item.comments?.length || 0}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center mt-20 text-gray-500">
//           <p>No posts yet</p>
//         </div>
//       )}

//     </div>
//   )
// }

// export default Public














import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import PostModal from "./PostModal"

const Public = ({ data }) => {
  if (!data || !data.firstName) return null

  const { userId } = useParams()
  const userSliceData = useSelector((store) => store.user)
  const nav = useNavigate()

  const [isFollowing, setIsFollowing] = useState(
    userSliceData.following.some((item) => item === userId)
  )
  const [selectedPost, setSelectedPost] = useState(null) // ✅ modal state

  const {
    profilePicture, firstName, lastName,
    username, bio, posts, followers, following,
  } = data

  const [followersCount, setFollowersCount] = useState(followers?.length || 0)

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await axios.patch(
          `${import.meta.env.VITE_DOMAIN}/api/follow-requests/unfollow/${userId}`,
          {},
          { withCredentials: true }
        )
        setIsFollowing(false)
        setFollowersCount(prev => prev - 1)
        toast.success("Unfollowed")
      } else {
        await axios.post(
          `${import.meta.env.VITE_DOMAIN}/api/follow-request/${userId}`,
          {},
          { withCredentials: true }
        )
        setIsFollowing(true)
        setFollowersCount(prev => prev + 1)
        toast.success("Following!")
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Action failed")
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 pb-24 md:pb-10">

      {/* Profile Header */}
      <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
        <img
          src={profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
          alt={`${firstName} ${lastName}`}
          className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-pink-300 shadow-md flex-shrink-0"
        />

        <div className="flex-1 w-full text-center md:text-left">
          {/* Name + Buttons */}
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
            <p className="text-xl md:text-2xl font-bold text-gray-800">
              {firstName} {lastName}
              <span className="text-gray-500 text-base font-normal ml-2">@{username}</span>
            </p>

            <div className="flex gap-2 justify-center md:justify-start">
              <button
                onClick={handleFollowToggle}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                  isFollowing
                    ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    : "bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90"
                }`}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>

              <button
                onClick={() => nav("/chat/" + userId)}
                className="px-4 py-1.5 rounded-lg text-sm font-medium bg-gray-100 hover:bg-gray-200 transition"
              >
                Message
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 justify-center md:justify-start text-sm md:text-base text-gray-700 mb-3">
            <p><span className="font-bold text-gray-900">{posts?.length || 0}</span> posts</p>
            <p><span className="font-bold text-gray-900">{followersCount}</span> followers</p>
            <p><span className="font-bold text-gray-900">{following?.length || 0}</span> following</p>
          </div>

          {/* Bio */}
          <p className="text-sm text-gray-600 italic">{bio || "No bio available"}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 mt-8 mb-4"></div>

      {/* Posts Grid */}
      {posts && posts.length > 0 ? (
        <div className="grid grid-cols-3 gap-1 md:gap-2">
          {posts.map((item, index) => (
            <div
              key={item._id || index}
              className="relative group rounded-xl overflow-hidden shadow-md cursor-pointer"
              onClick={() => setSelectedPost(item)} // ✅ modal open
            >
              <img
                className="h-[120px] md:h-[250px] w-full object-cover group-hover:scale-110 transition duration-500"
                src={item.media?.[0] || "https://placehold.co/300"}
                alt="post"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex justify-center items-center gap-4 text-white text-sm font-semibold transition">
                <span>❤️ {item.likes?.length || 0}</span>
                <span>💬 {item.comments?.length || 0}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-16 text-gray-400">
          <p className="text-4xl mb-3">📷</p>
          <p className="font-medium">No posts yet</p>
        </div>
      )}

      {/* ✅ Post Modal */}
      {selectedPost && (
        <PostModal
          post={selectedPost}
          setUseModal={() => setSelectedPost(null)}
        />
      )}
    </div>
  )
}

export default Public