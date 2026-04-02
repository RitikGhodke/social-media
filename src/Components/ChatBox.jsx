import React, { useEffect, useRef, useState } from 'react'
import { io } from "socket.io-client"
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { ArrowLeft, Send, Smile } from 'lucide-react'
import EmojiPicker from 'emoji-picker-react'

const ChatBox = () => {
    const socket = useRef()
    const { id } = useParams()
    const [userData, setUserData] = useState(null)
    const [text, setText] = useState("")
    const [chats, setChats] = useState([])
    const [isTyping, setIsTyping] = useState(false)
    const [showEmoji, setShowEmoji] = useState(false)
    const myUserData = useSelector(store => store.user)
    const nav = useNavigate()
    const messagesEndRef = useRef(null)
    const typingTimeout = useRef(null)

    // Auto scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [chats])

    // Fetch old chats
    useEffect(() => {
        async function getChats() {
            const res = await axios.get(
                import.meta.env.VITE_DOMAIN + `/api/chats/${id}`,
                { withCredentials: true }
            )
            setChats(res.data.chats)
        }
        getChats()
    }, [])

    // Fetch other user profile
    useEffect(() => {
        async function getProfile() {
            const res = await axios.get(
                import.meta.env.VITE_DOMAIN + `/api/profile/${id}`,
                { withCredentials: true }
            )
            setUserData(res.data.data)
        }
        getProfile()
    }, [])

    // Socket setup
    useEffect(() => {
        socket.current = io(import.meta.env.VITE_DOMAIN)
        socket.current.emit("join-room", { sender: myUserData._id, receiver: id })

        socket.current.on("receive-msg", ({ sender, receiver, text, createdAt }) => {
            setChats(prev => [...prev, { sender, receiver, text, createdAt }])
            setIsTyping(false)
        })

        socket.current.on("typing", () => {
            setIsTyping(true)
            clearTimeout(typingTimeout.current)
            typingTimeout.current = setTimeout(() => setIsTyping(false), 2000)
        })

        return () => {
            socket.current.off("receive-msg")
            socket.current.off("typing")
            socket.current.disconnect()
        }
    }, [])

    // Typing emit
    function handleTyping(e) {
        setText(e.target.value)
        socket.current.emit("typing", { sender: myUserData._id, receiver: id })
    }

    // Send message
    function btnClickHandler() {
        if (text.trim().length === 0) return
        const newMsg = {
            sender: myUserData._id,
            receiver: id,
            text,
            createdAt: new Date().toISOString()
        }
        socket.current.emit("send-msg", { sender: myUserData._id, receiver: id, text })
        setText("")
        setChats(prev => [...prev, newMsg])
        setShowEmoji(false)
    }

    // Enter to send
    function handleKeyDown(e) {
        if (e.key === "Enter") btnClickHandler()
    }

    // Format time
    function formatTime(dateStr) {
        if (!dateStr) return ""
        const date = new Date(dateStr)
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }

    // Group messages by date
    function formatDate(dateStr) {
        if (!dateStr) return ""
        const date = new Date(dateStr)
        const today = new Date()
        const yesterday = new Date()
        yesterday.setDate(today.getDate() - 1)

        if (date.toDateString() === today.toDateString()) return "Today"
        if (date.toDateString() === yesterday.toDateString()) return "Yesterday"
        return date.toLocaleDateString()
    }

    return (
        <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
            <div className="hidden md:block">
                <Navbar />
            </div>

            <div className="flex flex-1 overflow-hidden">
                <div className="hidden md:block">
                    <Sidebar />
                </div>

                <div className="flex-1 flex flex-col h-full">

                    {/* Chat Header */}
                    <div
                        className="flex items-center px-4 py-3 bg-white border-b border-gray-200 shadow-sm cursor-pointer"
                    >
                        {/* Back button mobile */}
                        <button
                            onClick={() => nav("/chats")}
                            className="md:hidden mr-3 text-gray-600 hover:text-pink-500 transition"
                        >
                            <ArrowLeft size={22} />
                        </button>

                        <div onClick={() => nav("/profile/view/" + id)} className="flex items-center gap-3 flex-1">
                            {userData ? (
                                <>
                                    <div className="relative">
                                        <img
                                            className="w-11 h-11 rounded-full object-cover ring-2 ring-pink-300"
                                            src={userData.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                            alt="Profile"
                                        />
                                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white"></span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800 text-sm md:text-base">
                                            {userData.firstName} {userData.lastName}
                                        </p>
                                        <p className="text-green-500 text-xs">
                                            {isTyping ? "typing..." : "Online"}
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <div className="flex items-center gap-3 w-full">
                                    <div className="w-11 h-11 bg-gray-300 rounded-full animate-pulse"></div>
                                    <div className="space-y-1 flex-1">
                                        <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                                        <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div
                        className="flex-1 overflow-y-auto px-4 py-4 space-y-1"
                        style={{ backgroundImage: "radial-gradient(circle, #f3e8ff 1px, transparent 1px)", backgroundSize: "20px 20px" }}
                    >
                        {chats && chats.map((item, index) => {
                            const isSender = item.sender === myUserData._id
                            const showDate = index === 0 ||
                                formatDate(item.createdAt) !== formatDate(chats[index - 1]?.createdAt)

                            return (
                                <div key={index}>
                                    {/* Date separator */}
                                    {showDate && item.createdAt && (
                                        <div className="flex justify-center my-3">
                                            <span className="bg-white/80 text-gray-500 text-xs px-3 py-1 rounded-full shadow-sm">
                                                {formatDate(item.createdAt)}
                                            </span>
                                        </div>
                                    )}

                                    <div className={`flex ${isSender ? "justify-end" : "justify-start"} mb-1`}>
                                        {/* Other user avatar */}
                                        {!isSender && (
                                            <img
                                                src={userData?.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                                className="w-7 h-7 rounded-full object-cover mr-2 self-end"
                                            />
                                        )}

                                        <div className={`max-w-[70%] md:max-w-sm`}>
                                            <div className={`px-4 py-2 rounded-2xl text-sm md:text-base break-words shadow-sm
                                                ${isSender
                                                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-br-none"
                                                    : "bg-white text-gray-800 rounded-bl-none"
                                                }`}
                                            >
                                                {item.text}
                                            </div>
                                            {/* Timestamp */}
                                            <p className={`text-[10px] text-gray-400 mt-0.5 ${isSender ? "text-right" : "text-left"}`}>
                                                {formatTime(item.createdAt)}
                                            </p>
                                        </div>

                                        {/* My avatar */}
                                        {isSender && (
                                            <img
                                                src={myUserData?.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                                className="w-7 h-7 rounded-full object-cover ml-2 self-end"
                                            />
                                        )}
                                    </div>
                                </div>
                            )
                        })}

                        {/* Typing indicator */}
                        {isTyping && (
                            <div className="flex justify-start mb-1">
                                <img
                                    src={userData?.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                    className="w-7 h-7 rounded-full object-cover mr-2 self-end"
                                />
                                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1 items-center">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Emoji Picker */}
                    {showEmoji && (
                        <div className="absolute bottom-20 left-4 z-50">
                            <EmojiPicker
                                onEmojiClick={(e) => setText(prev => prev + e.emoji)}
                                height={350}
                                width={300}
                            />
                        </div>
                    )}

                    {/* Input Area */}
                    <div className="px-4 py-3 bg-white border-t border-gray-200 flex items-center gap-2 pb-safe">
                        {/* Emoji button */}
                        <button
                            onClick={() => setShowEmoji(!showEmoji)}
                            className="text-gray-400 hover:text-pink-500 transition"
                        >
                            <Smile size={22} />
                        </button>

                        <input
                            type="text"
                            placeholder="Type a message..."
                            value={text}
                            onChange={handleTyping}
                            onKeyDown={handleKeyDown}
                            className="flex-1 px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
                        />

                        <button
                            onClick={btnClickHandler}
                            disabled={!text.trim()}
                            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-2.5 rounded-full hover:opacity-90 transition disabled:opacity-40"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatBox