// import React, { useEffect, useState } from 'react'
// import Navbar from './Navbar'
// import Sidebar from './Sidebar'
// import axios from 'axios'

// const Requests = () => {
//   const [requests, setRequests] = useState([])
//   const [reviewedIds, setReviewedIds] = useState({})

//   useEffect(() => {
//     async function getData() {
//       try {
//         const res = await axios.get(
//           import.meta.env.VITE_DOMAIN + `/api/follow-requests`,
//           { withCredentials: true }
//         )
//         setRequests(res.data.data)
//       } catch (error) {
//         console.error("Requests fetch error:", error)
//       }
//     }
//     getData()
//   }, [])

//   const handleReview = async (itemId, status) => {
//     try {
//       const res = await axios.post(
//         import.meta.env.VITE_DOMAIN + `/api/follow-request/review/${itemId}/${status}`,
//         {},
//         { withCredentials: true }
//       )

//       console.log(res.data.msg)

//       setReviewedIds(prev => ({
//         ...prev,
//         [itemId]: status === "accepted" ? "Accepted" : "Rejected"
//       }))

//     } catch (error) {
//       console.error("Review error:", error.response?.data || error.message)
//     }
//   }

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <Navbar />

//       <div className="flex">
//         <Sidebar />

//         <div className="flex-1 p-6">
//           <h2 className="text-xl font-semibold mb-4">Follow Requests</h2>

//           {requests.length === 0 && (
//             <p className="text-gray-400">No pending follow requests</p>
//           )}

//           <div className="space-y-4">
//             {requests.map((item) => (
//               <div
//                 key={item._id}
//                 className="flex items-center justify-between bg-white shadow-sm rounded-xl p-4 hover:shadow-md transition"
//               >
//                 <div className="flex items-center space-x-4">
//                   <img
//                     src={
//                       item.fromUserId.profilePicture ||
//                       'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
//                     }
//                     alt="profile"
//                     className="w-12 h-12 rounded-full object-cover border"
//                   />
//                   <div>
//                     <p className="font-medium">
//                       {item.fromUserId.firstName + ' ' + item.fromUserId.lastName}
//                     </p>
//                     <p className="text-gray-500 text-sm">
//                       @{item.fromUserId.username}
//                     </p>
//                   </div>
//                 </div>

//                 {!reviewedIds[item._id] ? (
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => handleReview(item._id, "accepted")}
//                       className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
//                     >
//                       Accept
//                     </button>
//                     <button
//                       onClick={() => handleReview(item._id, "rejected")}
//                       className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
//                     >
//                       Reject
//                     </button>
//                   </div>
//                 ) : (
//                   <span className={`font-medium ${
//                     reviewedIds[item._id] === "Accepted"
//                       ? "text-green-500"
//                       : "text-red-500"
//                   }`}>
//                     Request {reviewedIds[item._id]}
//                   </span>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Requests













import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import axios from 'axios'
import { UserCheck } from 'lucide-react'

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
      await axios.post(
        import.meta.env.VITE_DOMAIN + `/api/follow-request/review/${itemId}/${status}`,
        {},
        { withCredentials: true }
      )
      setReviewedIds(prev => ({
        ...prev,
        [itemId]: status === "accepted" ? "Accepted" : "Rejected"
      }))
    } catch (error) {
      console.error("Review error:", error.response?.data || error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 px-4 py-6 pb-24 md:pb-6 max-w-2xl mx-auto">

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <UserCheck className="text-pink-500" size={28} />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Follow Requests
            </h2>
          </div>

          {/* Empty State */}
          {requests.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <UserCheck size={48} className="mx-auto mb-3 text-gray-300" />
              <p className="font-medium">No pending follow requests</p>
            </div>
          )}

          {/* Requests List */}
          <div className="space-y-3">
            {requests.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-white shadow-sm rounded-2xl p-3 md:p-4 hover:shadow-md transition"
              >
                {/* User Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={
                      item.fromUserId.profilePicture ||
                      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                    }
                    alt="profile"
                    className="w-11 h-11 md:w-12 md:h-12 rounded-full object-cover border-2 border-pink-200 flex-shrink-0"
                  />
                  <div>
                    <p className="font-semibold text-gray-800 text-sm md:text-base">
                      {item.fromUserId.firstName + ' ' + item.fromUserId.lastName}
                    </p>
                    <p className="text-gray-500 text-xs md:text-sm">
                      @{item.fromUserId.username}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                {!reviewedIds[item._id] ? (
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleReview(item._id, "accepted")}
                      className="px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-green-400 to-green-500 text-white text-xs md:text-sm font-medium rounded-xl hover:opacity-90 transition active:scale-95"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReview(item._id, "rejected")}
                      className="px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-red-400 to-red-500 text-white text-xs md:text-sm font-medium rounded-xl hover:opacity-90 transition active:scale-95"
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <span className={`text-sm font-semibold flex-shrink-0 ${
                    reviewedIds[item._id] === "Accepted"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}>
                    {reviewedIds[item._id] === "Accepted" ? "✅ Accepted" : "❌ Rejected"}
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