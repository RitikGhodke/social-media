// import React, { useState } from 'react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

// const ConvCard = ({ data }) => {
//     const myData = useSelector(store => store.user)
//     const [dataToBeDisplayed] = useState(
//         myData._id === data.sender._id ? data.receiver : data.sender
//     )
//     const nav = useNavigate()

//     return (
//         <div
//             onClick={() => nav("/chat/" + dataToBeDisplayed._id)}
//             className="flex items-center gap-4 px-4 py-3 hover:bg-pink-50 transition cursor-pointer border-b border-gray-100 last:border-none"
//         >
//             {/* Avatar */}
//             <div className="relative flex-shrink-0">
//                 <img
//                     src={dataToBeDisplayed.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
//                     alt={dataToBeDisplayed.firstName}
//                     className="w-14 h-14 rounded-full object-cover"
//                 />
//                 <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full ring-2 ring-white"></span>
//             </div>

//             {/* Info */}
//             <div className="flex-1 min-w-0">
//                 <div className="flex justify-between items-center">
//                     <p className="font-semibold text-gray-800 truncate">
//                         {dataToBeDisplayed.firstName} {dataToBeDisplayed.lastName}
//                     </p>
//                 </div>
//                 <p className="text-gray-500 text-sm truncate mt-0.5">
//                     {data.lastMsg || "No messages yet"}
//                 </p>
//             </div>
//         </div>
//     )
// }

// export default ConvCard











// import React, { useState } from 'react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

// const ConvCard = ({ data, myId }) => {
//     const myData = useSelector(store => store.user)
//     const [dataToBeDisplayed] = useState(
//         myData._id === data.sender._id ? data.receiver : data.sender
//     )
//     const nav = useNavigate()

//     // ✅ Unread count
//     const unreadCount = data.unreadCount?.[myData._id] || 0

//     return (
//         <div
//             onClick={() => nav("/chat/" + dataToBeDisplayed._id)}
//             className="flex items-center gap-4 px-4 py-3 hover:bg-pink-50 transition cursor-pointer border-b border-gray-100 last:border-none"
//         >
//             <div className="relative flex-shrink-0">
//                 <img
//                     src={dataToBeDisplayed.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
//                     alt={dataToBeDisplayed.firstName}
//                     className="w-14 h-14 rounded-full object-cover"
//                 />
//                 <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full ring-2 ring-white"></span>
//             </div>

//             <div className="flex-1 min-w-0">
//                 <div className="flex justify-between items-center">
//                     <p className={`font-semibold truncate ${unreadCount > 0 ? "text-black" : "text-gray-700"}`}>
//                         {dataToBeDisplayed.firstName} {dataToBeDisplayed.lastName}
//                     </p>
//                     {/* ✅ Unread badge */}
//                     {unreadCount > 0 && (
//                         <span className="bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
//                             {unreadCount > 9 ? "9+" : unreadCount}
//                         </span>
//                     )}
//                 </div>
//                 <p className={`text-sm truncate mt-0.5 ${unreadCount > 0 ? "text-gray-800 font-medium" : "text-gray-500"}`}>
//                     {data.lastMsg || "No messages yet"}
//                 </p>
//             </div>
//         </div>
//     )
// }

// export default ConvCard








import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Trash2 } from 'lucide-react'

const ConvCard = ({ data, myId, onDelete }) => {
    const myData = useSelector(store => store.user)
    const [dataToBeDisplayed] = useState(
        myData._id === data.sender._id ? data.receiver : data.sender
    )
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const nav = useNavigate()

    const unreadCount = data.unreadCount?.[myData._id] || 0

    const handleDelete = async (e) => {
        e.stopPropagation()
        try {
            await axios.delete(
                `${import.meta.env.VITE_DOMAIN}/api/chats/${dataToBeDisplayed._id}`,
                { withCredentials: true }
            )
            setShowDeleteConfirm(false)
            if (onDelete) onDelete()
        } catch (err) {
            console.error("Delete error:", err)
        }
    }

    return (
        <>
            <div
                onClick={() => nav("/chat/" + dataToBeDisplayed._id)}
                className="flex items-center gap-4 px-4 py-3 hover:bg-pink-50 transition cursor-pointer border-b border-gray-100 last:border-none relative group"
            >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                    <img
                        src={dataToBeDisplayed.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                        alt={dataToBeDisplayed.firstName}
                        className="w-14 h-14 rounded-full object-cover"
                    />
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full ring-2 ring-white"></span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                        <p className={`font-semibold truncate ${unreadCount > 0 ? "text-black" : "text-gray-700"}`}>
                            {dataToBeDisplayed.firstName} {dataToBeDisplayed.lastName}
                        </p>
                        <div className="flex items-center gap-2">
                            {unreadCount > 0 && (
                                <span className="bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                                    {unreadCount > 9 ? "9+" : unreadCount}
                                </span>
                            )}
                            {/* ✅ Fix: Conflicting opacity classes hata diye */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setShowDeleteConfirm(true)
                                }}
                                // className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition p-1"
                                 className="text-gray-400 hover:text-red-500 transition p-1 opacity-100"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                    <p className={`text-sm truncate mt-0.5 ${unreadCount > 0 ? "text-gray-800 font-medium" : "text-gray-500"}`}>
                        {data.lastMsg || "No messages yet"}
                    </p>
                </div>
            </div>

            {/* Delete Confirm Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center shadow-xl">
                        <p className="text-lg font-semibold text-gray-800 mb-2">Delete Chat?</p>
                        <p className="text-sm text-gray-500 mb-6">
                            {dataToBeDisplayed.firstName} ke saath saari chat delete ho jayegi!
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="flex-1 py-2 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 py-2 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ConvCard








