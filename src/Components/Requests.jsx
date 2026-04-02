import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import axios from 'axios'

const Requests = () => {
  const [requests, setRequests] = useState([])
  const [reviewedIds, setReviewedIds] = useState({})

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          import.meta.env.VITE_DOMAIN + `/api/follow-requests`,
          { withCredentials: true }
        )
        setRequests(res.data.data)
      } catch (error) {
        console.error("Requests fetch error:", error)
      }
    }
    getData()
  }, [])

  const handleReview = async (itemId, status) => {
    try {
      const res = await axios.post(
        import.meta.env.VITE_DOMAIN + `/api/follow-request/review/${itemId}/${status}`,
        {},
        { withCredentials: true }
      )

      console.log(res.data.msg)

      setReviewedIds(prev => ({
        ...prev,
        [itemId]: status === "accepted" ? "Accepted" : "Rejected"
      }))

    } catch (error) {
      console.error("Review error:", error.response?.data || error.message)
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-6">
          <h2 className="text-xl font-semibold mb-4">Follow Requests</h2>

          {requests.length === 0 && (
            <p className="text-gray-400">No pending follow requests</p>
          )}

          <div className="space-y-4">
            {requests.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-white shadow-sm rounded-xl p-4 hover:shadow-md transition"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={
                      item.fromUserId.profilePicture ||
                      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                    }
                    alt="profile"
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                  <div>
                    <p className="font-medium">
                      {item.fromUserId.firstName + ' ' + item.fromUserId.lastName}
                    </p>
                    <p className="text-gray-500 text-sm">
                      @{item.fromUserId.username}
                    </p>
                  </div>
                </div>

                {!reviewedIds[item._id] ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleReview(item._id, "accepted")}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReview(item._id, "rejected")}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <span className={`font-medium ${
                    reviewedIds[item._id] === "Accepted"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}>
                    Request {reviewedIds[item._id]}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Requests