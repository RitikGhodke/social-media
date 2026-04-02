import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

const PrivateAccount = ({ data, setData }) => {
  if (!data || !data.firstName) return null

  const { userId } = useParams()
  const userSliceData = useSelector(store => store.user)
  const nav = useNavigate()

  const isAlreadyFollowing = userSliceData.following.some(
    item => item == userId
  )

  const [isFollowing, setIsFollowing] = useState(isAlreadyFollowing)
  const [isReqSent, setIsReqSent] = useState(false)

  // ✅ Check request already sent or not
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

  // ✅ MAIN FIXED HANDLER
  async function followBtnHandler() {
    try {
      if (isFollowing) {
        // 🔥 UNFOLLOW
        const res = await axios.patch(
          import.meta.env.VITE_DOMAIN + `/api/follow-requests/unfollow/${userId}`,
          {},
          { withCredentials: true }
        )

        setIsFollowing(false)
        setIsReqSent(false)
        if (setData) setData(res.data.toUserData)

        toast.success("Unfollowed successfully")

      } else if (isReqSent) {
        // ❌ CANCEL REQUEST (skip for now if no backend route)
        toast.error("Cancel request API not implemented")

      } else {
        // 🔥 SEND FOLLOW REQUEST (IMPORTANT FIX)
        await axios.post(
          import.meta.env.VITE_DOMAIN + `/api/follow-request/${userId}`, // ✅ FIXED ROUTE
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

  const getButtonText = () => {
    if (isFollowing) return "Following"
    if (isReqSent) return "Requested"
    return "Follow"
  }

  const getButtonStyle = () => {
    if (isFollowing) return "bg-gray-200 text-gray-700"
    if (isReqSent) return "bg-yellow-200 text-yellow-700"
    return "bg-pink-500 text-white"
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center gap-6">

        <img
          src={
            profilePicture ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          className="w-32 h-32 rounded-full"
        />

        <div className="flex-1">

          <div className="flex items-center gap-4">
            <p className="text-2xl font-bold">
              {firstName} {lastName}
              <span className="text-gray-500 text-lg ml-2">
                @{username}
              </span>
            </p>

            <button
              onClick={followBtnHandler}
              className={`px-4 py-1 rounded ${getButtonStyle()}`}
            >
              {getButtonText()}
            </button>

            <button
              onClick={() => nav("/chat/" + userId)}
              className="px-4 py-1 bg-gray-200 rounded"
            >
              Message
            </button>
          </div>

          <div className="flex gap-6 mt-3">
            <p>{posts?.length || 0} Posts</p>
            <p>{followers?.length || 0} Followers</p>
            <p>{following?.length || 0} Following</p>
          </div>

          <p className="mt-4">{bio || "No bio"}</p>

          <div className="mt-10 text-center text-gray-400">
            <p className="text-4xl">🔒</p>
            <p>This account is private</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default PrivateAccount










