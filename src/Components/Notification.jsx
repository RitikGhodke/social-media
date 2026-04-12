import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Bell, Heart, MessageCircle, UserPlus, MessageSquare } from 'lucide-react'

const Notifications = () => {
    const [notifications, setNotifications] = useState([])
    const [loading, setLoading] = useState(true)
    const nav = useNavigate()

    useEffect(() => {
        async function getNotifications() {
            try {
                const res = await axios.get(
                    import.meta.env.VITE_DOMAIN + "/api/notifications",
                    { withCredentials: true }
                )
                setNotifications(res.data.data)

                // ✅ Saari read mark karo
                await axios.patch(
                    import.meta.env.VITE_DOMAIN + "/api/notifications/read-all",
                    {},
                    { withCredentials: true }
                )
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        getNotifications()
    }, [])

    function getIcon(type) {
        switch (type) {
            case "like": return <Heart size={16} className="text-red-500" fill="red" />
            case "comment": return <MessageCircle size={16} className="text-blue-500" />
            case "follow": return <UserPlus size={16} className="text-green-500" />
            case "message": return <MessageSquare size={16} className="text-purple-500" />
            default: return <Bell size={16} className="text-gray-500" />
        }
    }

    function getBg(type) {
        switch (type) {
            case "like": return "bg-red-50"
            case "comment": return "bg-blue-50"
            case "follow": return "bg-green-50"
            case "message": return "bg-purple-50"
            default: return "bg-gray-50"
        }
    }

    function formatTime(dateStr) {
        if (!dateStr) return ""
        const diff = Date.now() - new Date(dateStr).getTime()
        const mins = Math.floor(diff / 60000)
        const hrs = Math.floor(diff / 3600000)
        const days = Math.floor(diff / 86400000)
        if (mins < 1) return "Just now"
        if (mins < 60) return `${mins}m ago`
        if (hrs < 24) return `${hrs}h ago`
        return `${days}d ago`
    }

    function handleClick(notification) {
        if (notification.type === "like" || notification.type === "comment") {
            if (notification.post) nav(`/profile/view/${notification.sender._id}`)
        } else if (notification.type === "follow") {
            nav(`/profile/view/${notification.sender._id}`)
        } else if (notification.type === "message") {
            nav(`/chat/${notification.sender._id}`)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
            <Navbar />
            <div className="flex">
                <Sidebar />
                <div className="flex-1 max-w-2xl mx-auto px-4 py-6 pb-24 md:pb-6">

                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                        <Bell className="text-pink-500" size={28} />
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Notifications</h1>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                        {loading ? (
                            <div className="space-y-4 p-4">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="flex items-center gap-4 animate-pulse">
                                        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                                        <div className="flex-1 space-y-2">
                                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                            <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : notifications.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                                <Bell size={48} className="mb-3 text-gray-300" />
                                <p className="font-medium">No notifications yet</p>
                                <p className="text-sm mt-1">We'll notify you when something happens!</p>
                            </div>
                        ) : (
                            notifications.map((item, index) => (
                                <div
                                    key={item._id || index}
                                    onClick={() => handleClick(item)}
                                    className={`flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-gray-50 transition border-b border-gray-100 last:border-none ${!item.isRead ? "bg-pink-50/50" : ""}`}
                                >
                                    {/* Avatar + Icon */}
                                    <div className="relative flex-shrink-0">
                                        <img
                                            src={item.sender?.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                            alt="sender"
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center ${getBg(item.type)} border-2 border-white`}>
                                            {getIcon(item.type)}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-800">
                                            <span className="font-semibold">{item.sender?.firstName} {item.sender?.lastName}</span>
                                            {" "}{item.message}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-0.5">{formatTime(item.createdAt)}</p>
                                    </div>

                                    {/* Post thumbnail */}
                                    {item.post?.media?.[0] && (
                                        <img
                                            src={item.post.media[0]}
                                            alt="post"
                                            className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                                        />
                                    )}

                                    {/* Unread dot */}
                                    {!item.isRead && (
                                        <div className="w-2.5 h-2.5 bg-pink-500 rounded-full flex-shrink-0"></div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notifications