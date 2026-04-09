// import React, { useEffect, useRef, useState } from 'react'
// import { io } from "socket.io-client"
// import Navbar from './Navbar'
// import Sidebar from './Sidebar'
// import { useNavigate, useParams } from 'react-router-dom'
// import axios from 'axios'
// import { useSelector } from 'react-redux'
// import { ArrowLeft, Send, Smile, ImagePlus, X, Reply } from 'lucide-react'
// import EmojiPicker from 'emoji-picker-react'
// import imageCompression from 'browser-image-compression'

// const REACTIONS = ["❤️", "😂", "😮", "😢", "🔥", "👍"]

// const THEMES = [
//     { name: "Purple", bg: "radial-gradient(circle, #f3e8ff 1px, transparent 1px)", size: "20px 20px", label: "💜 Purple" },
//     { name: "Blue", bg: "radial-gradient(circle, #dbeafe 1px, transparent 1px)", size: "20px 20px", label: "💙 Blue" },
//     { name: "Pink", bg: "radial-gradient(circle, #fce7f3 1px, transparent 1px)", size: "20px 20px", label: "🩷 Pink" },
//     { name: "Green", bg: "radial-gradient(circle, #dcfce7 1px, transparent 1px)", size: "20px 20px", label: "💚 Green" },
//     { name: "Dark", bg: "#1f2937", size: "", label: "🖤 Dark" },
//     { name: "White", bg: "#f9fafb", size: "", label: "🤍 White" },
// ]

// const ChatBox = () => {
//     const socket = useRef()
//     const { id } = useParams()
//     const [userData, setUserData] = useState(null)
//     const [text, setText] = useState("")
//     const [chats, setChats] = useState([])
//     const [isTyping, setIsTyping] = useState(false)
//     const [showEmoji, setShowEmoji] = useState(false)
//     const [selectedImage, setSelectedImage] = useState(null)
//     const [imageBase64, setImageBase64] = useState("")
//     const [replyingTo, setReplyingTo] = useState(null)
//     const [showReactions, setShowReactions] = useState(null)
//     const [swipeX, setSwipeX] = useState({})
//     const [swipeStart, setSwipeStart] = useState({})
//     const [showThemes, setShowThemes] = useState(false)
//     const [currentTheme, setCurrentTheme] = useState(THEMES[0])
//     const [longPressTimer, setLongPressTimer] = useState(null)
//     const myUserData = useSelector(store => store.user)
//     const nav = useNavigate()
//     const messagesEndRef = useRef(null)
//     const typingTimeout = useRef(null)
//     const imageInputRef = useRef(null)

//     useEffect(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//     }, [chats])

//     useEffect(() => {
//         async function getChats() {
//             const res = await axios.get(
//                 import.meta.env.VITE_DOMAIN + `/api/chats/${id}`,
//                 { withCredentials: true }
//             )
//             setChats(res.data.chats)
//         }
//         getChats()
//     }, [])

//     useEffect(() => {
//         async function getProfile() {
//             const res = await axios.get(
//                 import.meta.env.VITE_DOMAIN + `/api/profile/${id}`,
//                 { withCredentials: true }
//             )
//             setUserData(res.data.data)
//         }
//         getProfile()
//     }, [])

//     useEffect(() => {
//         socket.current = io(import.meta.env.VITE_DOMAIN, {
//             transports: ["polling"],
//             withCredentials: true,
//             reconnection: true,
//             reconnectionAttempts: 10,
//             reconnectionDelay: 2000,
//         })

//         socket.current.on("connect", () => {
//             socket.current.emit("join-room", { sender: myUserData._id, receiver: id })
//         })

        
//         socket.current.on("receive-msg", (msg) => {
//             // ✅ Fix 1: Apna hi message dobara add mat karo
//             if (msg.sender?.toString() === myUserData._id?.toString()) return
//             setChats(prev => [...prev, msg])
//             setIsTyping(false)
//         })

//         socket.current.on("typing", () => {
//             setIsTyping(true)
//             clearTimeout(typingTimeout.current)
//             typingTimeout.current = setTimeout(() => setIsTyping(false), 2000)
//         })

//         socket.current.on("msg-reacted", ({ msgId, reactions }) => {
//             setChats(prev => prev.map(msg =>
//                 msg._id?.toString() === msgId?.toString()
//                     ? { ...msg, reactions }
//                     : msg
//             ))
//         })

//         return () => {
//             socket.current.off("connect")
//             socket.current.off("receive-msg")
//             socket.current.off("typing")
//             socket.current.off("msg-reacted")
//             socket.current.disconnect()
//         }
//     }, [])

//     function handleTyping(e) {
//         setText(e.target.value)
//         socket.current.emit("typing", { sender: myUserData._id, receiver: id })
//     }

//     async function handleImageSelect(e) {
//         const file = e.target.files?.[0]
//         if (!file) return
//         setSelectedImage(URL.createObjectURL(file))
//         try {
//             const compressed = await imageCompression(file, {
//                 maxSizeMB: 0.5,
//                 maxWidthOrHeight: 600,
//                 useWebWorker: true
//             })
//             const reader = new FileReader()
//             reader.readAsDataURL(compressed)
//             reader.onload = () => setImageBase64(reader.result)
//         } catch {
//             const reader = new FileReader()
//             reader.readAsDataURL(file)
//             reader.onload = () => setImageBase64(reader.result)
//         }
//     }

//     function btnClickHandler() {
//         if (text.trim().length === 0 && !imageBase64) return

//         const newMsg = {
//             _id: Date.now().toString(),
//             sender: myUserData._id,
//             receiver: id,
//             text,
//             image: imageBase64,
//             replyTo: replyingTo,
//             reactions: [],
//             createdAt: new Date().toISOString()
//         }

//         socket.current.emit("send-msg", {
//             sender: myUserData._id,
//             receiver: id,
//             text,
//             image: imageBase64,
//             replyTo: replyingTo?._id || null
//         })

//         setChats(prev => [...prev, newMsg])
//         setText("")
//         setSelectedImage(null)
//         setImageBase64("")
//         setReplyingTo(null)
//         setShowEmoji(false)
//     }

//     function handleKeyDown(e) {
//         if (e.key === "Enter" && !selectedImage) btnClickHandler()
//     }

//     function handleReact(msgId, emoji) {
//         socket.current.emit("react-msg", {
//             msgId, emoji,
//             userId: myUserData._id,
//             receiver: id
//         })
//         setChats(prev => prev.map(msg => {
//             if (msg._id?.toString() !== msgId?.toString()) return msg
//             const filtered = (msg.reactions || []).filter(
//                 r => r.userId?.toString() !== myUserData._id?.toString()
//             )
//             return { ...msg, reactions: [...filtered, { userId: myUserData._id, emoji }] }
//         }))
//         setShowReactions(null)
//     }

//     function handleTouchStart(e, item) {
//         setSwipeStart(prev => ({ ...prev, [item._id]: e.touches[0].clientX }))
//     }

//     function handleTouchMove(e, item) {
//         const startX = swipeStart[item._id]
//         if (!startX) return
//         const diff = e.touches[0].clientX - startX
//         const isSender = item.sender?.toString() === myUserData._id?.toString()
//         if (isSender && diff < -30 && diff > -80) {
//             setSwipeX(prev => ({ ...prev, [item._id]: diff }))
//         } else if (!isSender && diff > 30 && diff < 80) {
//             setSwipeX(prev => ({ ...prev, [item._id]: diff }))
//         }
//     }

//     function handleTouchEnd(e, item) {
//         const swipe = swipeX[item._id] || 0
//         if (Math.abs(swipe) > 40) setReplyingTo(item)
//         setSwipeX(prev => ({ ...prev, [item._id]: 0 }))
//         setSwipeStart(prev => ({ ...prev, [item._id]: 0 }))
//     }

//     function handleLongPressStart(item) {
//         const timer = setTimeout(() => {
//             setShowReactions(item._id)
//         }, 500)
//         setLongPressTimer(timer)
//     }

//     function handleLongPressEnd() {
//         clearTimeout(longPressTimer)
//     }

//     function formatTime(dateStr) {
//         if (!dateStr) return ""
//         return new Date(dateStr).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
//     }

//     function formatDate(dateStr) {
//         if (!dateStr) return ""
//         const date = new Date(dateStr)
//         const today = new Date()
//         const yesterday = new Date()
//         yesterday.setDate(today.getDate() - 1)
//         if (date.toDateString() === today.toDateString()) return "Today"
//         if (date.toDateString() === yesterday.toDateString()) return "Yesterday"
//         return date.toLocaleDateString()
//     }

//     return (
//         <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
//             <div className="hidden md:block"><Navbar /></div>

//             <div className="flex flex-1 overflow-hidden">
//                 <div className="hidden md:block"><Sidebar /></div>

//                 <div className="flex-1 flex flex-col h-full">

//                     {/* ✅ Fix 2 & 3: relative add kiya taaki theme picker sahi jagah aaye */}
//                     <div className="relative flex-shrink-0 flex items-center px-4 py-3 bg-white border-b border-gray-200 shadow-sm">
//                         <button onClick={() => nav("/chats")} className="md:hidden mr-3 text-gray-600 flex-shrink-0">
//                             <ArrowLeft size={22} />
//                         </button>

//                         <div
//                             onClick={() => nav("/profile/view/" + id)}
//                             className="flex items-center gap-3 flex-1 cursor-pointer min-w-0"
//                         >
//                             {userData ? (
//                                 <>
//                                     <div className="relative flex-shrink-0">
//                                         <img
//                                             className="w-10 h-10 rounded-full object-cover ring-2 ring-pink-300"
//                                             src={userData.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
//                                         />
//                                         <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white"></span>
//                                     </div>
//                                     <div className="min-w-0">
//                                         <p className="font-semibold text-gray-800 text-sm truncate">
//                                             {userData.firstName} {userData.lastName}
//                                         </p>
//                                         <p className="text-green-500 text-xs">
//                                             {isTyping ? "typing..." : "Online"}
//                                         </p>
//                                     </div>
//                                 </>
//                             ) : (
//                                 <div className="flex items-center gap-3 w-full animate-pulse">
//                                     <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
//                                     <div className="space-y-1 flex-1 min-w-0">
//                                         <div className="h-4 bg-gray-300 rounded w-3/4"></div>
//                                         <div className="h-3 bg-gray-200 rounded w-1/2"></div>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>

//                         {/* Theme button */}
//                         <button
//                             onClick={(e) => { e.stopPropagation(); setShowThemes(!showThemes) }}
//                             className="flex-shrink-0 ml-2 text-gray-500 hover:text-pink-500 transition text-lg"
//                         >
//                             🎨
//                         </button>

//                         {/* ✅ Theme picker — relative parent ki wajah se ab sahi position pe aayega */}
//                         {showThemes && (
//                             <div className="absolute top-14 right-4 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 z-50 flex gap-2 flex-wrap max-w-[250px]">
//                                 {THEMES.map(theme => (
//                                     <button
//                                         key={theme.name}
//                                         onClick={() => { setCurrentTheme(theme); setShowThemes(false) }}
//                                         className={`text-xs px-3 py-1.5 rounded-full border transition ${currentTheme.name === theme.name ? "border-pink-400 bg-pink-50" : "border-gray-200"}`}
//                                     >
//                                         {theme.label}
//                                     </button>
//                                 ))}
//                             </div>
//                         )}
//                     </div>

//                     {/* Messages */}
//                     <div
//                         className="flex-1 overflow-y-auto px-4 py-4 space-y-1"
//                         style={{
//                             background: currentTheme.bg,
//                             backgroundSize: currentTheme.size || "auto"
//                         }}
//                         onClick={() => { setShowReactions(null); setShowEmoji(false); setShowThemes(false) }}
//                     >
//                         {chats.map((item, index) => {
//                             const isSender = item.sender?.toString() === myUserData._id?.toString()
//                             const showDate = index === 0 ||
//                                 formatDate(item.createdAt) !== formatDate(chats[index - 1]?.createdAt)
//                             const swipeOffset = swipeX[item._id] || 0

//                             return (
//                                 <div key={item._id || index}>
//                                     {showDate && item.createdAt && (
//                                         <div className="flex justify-center my-3">
//                                             <span className="bg-white/80 text-gray-500 text-xs px-3 py-1 rounded-full shadow-sm">
//                                                 {formatDate(item.createdAt)}
//                                             </span>
//                                         </div>
//                                     )}

//                                     <div
//                                         className={`flex ${isSender ? "justify-end" : "justify-start"} mb-2 group relative`}
//                                         onTouchStart={(e) => {
//                                             handleTouchStart(e, item)
//                                             handleLongPressStart(item)
//                                         }}
//                                         onTouchMove={(e) => {
//                                             handleTouchMove(e, item)
//                                             handleLongPressEnd()
//                                         }}
//                                         onTouchEnd={(e) => {
//                                             handleTouchEnd(e, item)
//                                             handleLongPressEnd()
//                                         }}
//                                         style={{
//                                             transform: `translateX(${swipeOffset}px)`,
//                                             transition: swipeOffset === 0 ? "transform 0.3s ease" : "none"
//                                         }}
//                                     >
//                                         {!isSender && (
//                                             <img
//                                                 src={userData?.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
//                                                 className="w-7 h-7 rounded-full object-cover mr-2 self-end flex-shrink-0"
//                                             />
//                                         )}

//                                         <div className="max-w-[70%] md:max-w-sm">
//                                             {/* Reply preview */}
//                                             {item.replyTo && (
//                                                 <div className={`text-xs px-3 py-1.5 rounded-xl mb-1 border-l-4 
//                                                     ${isSender
//                                                         ? "bg-purple-100 border-purple-400 text-purple-700"
//                                                         : "bg-gray-100 border-gray-400 text-gray-600"
//                                                     }`}
//                                                 >
//                                                     <p className="font-semibold mb-0.5">
//                                                         {item.replyTo.sender?.toString() === myUserData._id?.toString() ? "You" : userData?.firstName}
//                                                     </p>
//                                                     <p className="truncate">{item.replyTo.text || "📷 Photo"}</p>
//                                                 </div>
//                                             )}

//                                             {/* Image */}
//                                             {item.image && (
//                                                 <img
//                                                     src={item.image}
//                                                     className="rounded-2xl max-w-full max-h-60 object-cover shadow-md mb-1 cursor-pointer"
//                                                     onClick={() => window.open(item.image, "_blank")}
//                                                 />
//                                             )}

//                                             {/* Text */}
//                                             {item.text && (
//                                                 <div className={`px-4 py-2 rounded-2xl text-sm break-words shadow-sm
//                                                     ${isSender
//                                                         ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-br-none"
//                                                         : "bg-white text-gray-800 rounded-bl-none"
//                                                     }`}
//                                                 >
//                                                     {item.text}
//                                                 </div>
//                                             )}

//                                             {/* Reactions display */}
//                                             {item.reactions?.length > 0 && (
//                                                 <div className={`flex flex-wrap gap-1 mt-1 ${isSender ? "justify-end" : "justify-start"}`}>
//                                                     {Object.entries(
//                                                         item.reactions.reduce((acc, r) => {
//                                                             acc[r.emoji] = (acc[r.emoji] || 0) + 1
//                                                             return acc
//                                                         }, {})
//                                                     ).map(([emoji, count]) => (
//                                                         <span key={emoji} className="bg-white rounded-full px-2 py-0.5 text-xs shadow-sm border border-gray-100">
//                                                             {emoji} {count > 1 && count}
//                                                         </span>
//                                                     ))}
//                                                 </div>
//                                             )}

//                                             <p className={`text-[10px] text-gray-400 mt-0.5 ${isSender ? "text-right" : "text-left"}`}>
//                                                 {formatTime(item.createdAt)}
//                                             </p>
//                                         </div>

//                                         {/* Desktop action buttons */}
//                                         <div className="flex items-center gap-1 mx-2 opacity-0 group-hover:opacity-100 transition self-center relative">
//                                             <button
//                                                 onClick={() => setReplyingTo(item)}
//                                                 className="text-gray-400 hover:text-pink-500 transition"
//                                             >
//                                                 <Reply size={16} />
//                                             </button>

//                                             <button
//                                                 onClick={(e) => {
//                                                     e.stopPropagation()
//                                                     setShowReactions(showReactions === (item._id || index) ? null : (item._id || index))
//                                                 }}
//                                                 className="text-gray-400 hover:text-yellow-500 transition text-sm"
//                                             >
//                                                 😊
//                                             </button>

//                                             {/* Reaction popup */}
//                                             {showReactions === (item._id || index) && (
//                                                 <div
//                                                     className="absolute bottom-8 left-0 bg-white rounded-full shadow-lg border border-gray-100 px-2 py-1 flex gap-1 z-50"
//                                                     onClick={e => e.stopPropagation()}
//                                                 >
//                                                     {REACTIONS.map(emoji => (
//                                                         <button
//                                                             key={emoji}
//                                                             onClick={() => handleReact(item._id, emoji)}
//                                                             className="text-lg hover:scale-125 transition-transform"
//                                                         >
//                                                             {emoji}
//                                                         </button>
//                                                     ))}
//                                                 </div>
//                                             )}
//                                         </div>

//                                         {/* Mobile reaction popup — long press */}
//                                         {showReactions === item._id && (
//                                             <div
//                                                 className={`absolute ${isSender ? "right-10" : "left-10"} bottom-8 bg-white rounded-full shadow-lg border border-gray-100 px-2 py-1 flex gap-1 z-50 md:hidden`}
//                                                 onClick={e => e.stopPropagation()}
//                                             >
//                                                 {REACTIONS.map(emoji => (
//                                                     <button
//                                                         key={emoji}
//                                                         onClick={() => handleReact(item._id, emoji)}
//                                                         className="text-lg"
//                                                     >
//                                                         {emoji}
//                                                     </button>
//                                                 ))}
//                                             </div>
//                                         )}

//                                         {isSender && (
//                                             <img
//                                                 src={myUserData?.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
//                                                 className="w-7 h-7 rounded-full object-cover ml-2 self-end flex-shrink-0"
//                                             />
//                                         )}
//                                     </div>

//                                     {/* Swipe indicator */}
//                                     {Math.abs(swipeOffset) > 30 && (
//                                         <div className={`flex ${isSender ? "justify-end mr-10" : "justify-start ml-10"} -mt-1 mb-1`}>
//                                             <span className="text-xs text-purple-500 font-medium">↩ Reply</span>
//                                         </div>
//                                     )}
//                                 </div>
//                             )
//                         })}

//                         {/* Typing indicator */}
//                         {isTyping && (
//                             <div className="flex justify-start mb-1">
//                                 <img
//                                     src={userData?.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
//                                     className="w-7 h-7 rounded-full object-cover mr-2 self-end"
//                                 />
//                                 <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1 items-center">
//                                     <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
//                                     <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
//                                     <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
//                                 </div>
//                             </div>
//                         )}
//                         <div ref={messagesEndRef} />
//                     </div>

//                     {/* Reply Preview */}
//                     {replyingTo && (
//                         <div className="flex-shrink-0 px-4 py-2 bg-purple-50 border-t border-purple-200 flex items-center justify-between">
//                             <div className="flex items-center gap-2">
//                                 <div className="w-1 h-8 bg-purple-500 rounded-full"></div>
//                                 <div>
//                                     <p className="text-xs font-semibold text-purple-600">
//                                         Replying to {replyingTo.sender?.toString() === myUserData._id?.toString() ? "yourself" : userData?.firstName}
//                                     </p>
//                                     <p className="text-xs text-gray-500 truncate max-w-[200px]">
//                                         {replyingTo.text || "📷 Photo"}
//                                     </p>
//                                 </div>
//                             </div>
//                             <button onClick={() => setReplyingTo(null)} className="text-gray-400 hover:text-red-500">
//                                 <X size={16} />
//                             </button>
//                         </div>
//                     )}

//                     {/* Image Preview */}
//                     {selectedImage && (
//                         <div className="flex-shrink-0 px-4 py-2 bg-white border-t border-gray-100">
//                             <div className="relative inline-block">
//                                 <img src={selectedImage} className="h-20 rounded-xl object-cover" />
//                                 <button
//                                     onClick={() => { setSelectedImage(null); setImageBase64("") }}
//                                     className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"
//                                 >
//                                     <X size={12} />
//                                 </button>
//                             </div>
//                         </div>
//                     )}

//                     {/* Emoji Picker */}
//                     {showEmoji && (
//                         <div className="absolute bottom-20 left-4 z-50" onClick={e => e.stopPropagation()}>
//                             <EmojiPicker
//                                 onEmojiClick={(e) => setText(prev => prev + e.emoji)}
//                                 height={350}
//                                 width={300}
//                             />
//                         </div>
//                     )}

//                     {/* Input */}
//                     <div className="flex-shrink-0 px-4 py-3 bg-white border-t border-gray-200 flex items-center gap-2">
//                         <button onClick={() => setShowEmoji(!showEmoji)} className="text-gray-400 hover:text-pink-500 transition flex-shrink-0">
//                             <Smile size={22} />
//                         </button>
//                         <button onClick={() => imageInputRef.current?.click()} className="text-gray-400 hover:text-pink-500 transition flex-shrink-0">
//                             <ImagePlus size={22} />
//                         </button>
//                         <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
//                         <input
//                             type="text"
//                             placeholder="Type a message..."
//                             value={text}
//                             onChange={handleTyping}
//                             onKeyDown={handleKeyDown}
//                             className="flex-1 px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
//                         />
//                         <button
//                             onClick={btnClickHandler}
//                             disabled={!text.trim() && !imageBase64}
//                             className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-2.5 rounded-full hover:opacity-90 transition disabled:opacity-40 flex-shrink-0"
//                         >
//                             <Send size={18} />
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ChatBox











import React, { useEffect, useRef, useState } from 'react'
import { io } from "socket.io-client"
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { ArrowLeft, Send, Smile, ImagePlus, X, Reply } from 'lucide-react'
import EmojiPicker from 'emoji-picker-react'
import imageCompression from 'browser-image-compression'

const REACTIONS = ["❤️", "😂", "😮", "😢", "🔥", "👍"]

const ChatBox = () => {
    const socket = useRef()
    const { id } = useParams()

    const [userData, setUserData] = useState(null)
    const [text, setText] = useState("")
    const [chats, setChats] = useState([])
    const [isTyping, setIsTyping] = useState(false)
    const [showEmoji, setShowEmoji] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)
    const [imageBase64, setImageBase64] = useState("")
    const [replyingTo, setReplyingTo] = useState(null)
    const [showReactions, setShowReactions] = useState(null)

    const myUserData = useSelector(store => store.user)
    const nav = useNavigate()

    const messagesEndRef = useRef(null)
    const typingTimeout = useRef(null)
    const imageInputRef = useRef(null)

    // AUTO SCROLL
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [chats])

    // FETCH CHATS
    useEffect(() => {
        axios.get(import.meta.env.VITE_DOMAIN + `/api/chats/${id}`, { withCredentials: true })
            .then(res => setChats(res.data.chats))
    }, [])

    // FETCH PROFILE
    useEffect(() => {
        axios.get(import.meta.env.VITE_DOMAIN + `/api/profile/${id}`, { withCredentials: true })
            .then(res => setUserData(res.data.data))
    }, [])

    // SOCKET
    useEffect(() => {
        socket.current = io(import.meta.env.VITE_DOMAIN, {
            transports: ["polling"],
            withCredentials: true
        })

        socket.current.on("connect", () => {
            socket.current.emit("join-room", {
                sender: myUserData._id,
                receiver: id
            })
        })

        socket.current.on("receive-msg", (msg) => {
            if (msg.sender === myUserData._id) return
            setChats(prev => [...prev, msg])
            setIsTyping(false)
        })

        socket.current.on("typing", () => {
            setIsTyping(true)
            clearTimeout(typingTimeout.current)
            typingTimeout.current = setTimeout(() => setIsTyping(false), 2000)
        })

        socket.current.on("msg-reacted", ({ msgId, reactions }) => {
            setChats(prev =>
                prev.map(msg =>
                    msg._id === msgId ? { ...msg, reactions } : msg
                )
            )
        })

        return () => socket.current.disconnect()
    }, [])

    // SEND MESSAGE
    function sendMessage() {
        if (!text.trim() && !imageBase64) return

        const newMsg = {
            _id: Date.now().toString(),
            sender: myUserData._id,
            receiver: id,
            text,
            image: imageBase64,
            replyTo: replyingTo,
            reactions: [],
            createdAt: new Date()
        }

        socket.current.emit("send-msg", {
            sender: myUserData._id,
            receiver: id,
            text,
            image: imageBase64,
            replyTo: replyingTo?._id || null
        })

        setChats(prev => [...prev, newMsg])
        setText("")
        setSelectedImage(null)
        setImageBase64("")
        setReplyingTo(null)
    }

    // IMAGE HANDLE
    async function handleImageSelect(e) {
        const file = e.target.files[0]
        if (!file) return

        setSelectedImage(URL.createObjectURL(file))

        const compressed = await imageCompression(file, {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 600
        })

        const reader = new FileReader()
        reader.readAsDataURL(compressed)
        reader.onload = () => setImageBase64(reader.result)
    }

    // REACT
    function handleReact(msgId, emoji) {
        socket.current.emit("react-msg", {
            msgId,
            emoji,
            userId: myUserData._id,
            receiver: id
        })
        setShowReactions(null)
    }

    return (
        <div className="h-screen flex flex-col bg-[#efeae2] overflow-hidden">

            {/* HEADER */}
            <div className="sticky top-0 z-50 flex items-center px-3 md:px-4 bg-[#f0f2f5] border-b h-[60px]">

                <button onClick={() => nav("/chats")} className="md:hidden mr-2">
                    <ArrowLeft size={22} />
                </button>

                <img
                    src={userData?.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                    className="w-9 h-9 rounded-full object-cover"
                />

                <div className="ml-3">
                    <p className="font-medium text-[15px]">
                        {userData?.firstName} {userData?.lastName}
                    </p>
                    <p className="text-xs text-gray-500">
                        {isTyping ? "typing..." : "online"}
                    </p>
                </div>
            </div>

            {/* CHAT AREA */}
            <div className="flex-1 overflow-y-auto px-2 md:px-6 py-3">

                {chats.map((item, index) => {
                    const isSender = item.sender?.toString() === myUserData._id?.toString()

                    return (
                        <div key={index} className={`flex ${isSender ? "justify-end" : "justify-start"} mb-1`}>

                            <div className="max-w-[75%] md:max-w-[55%]">

                                {item.replyTo && (
                                    <div className="text-xs bg-gray-100 px-2 py-1 rounded mb-1">
                                        {item.replyTo.text || "📷 Photo"}
                                    </div>
                                )}

                                {item.image && (
                                    <img src={item.image} className="rounded-md mb-1 max-h-60" />
                                )}

                                {item.text && (
                                    <div className={`px-3 py-2 text-[14px] rounded-lg
                                        ${isSender
                                            ? "bg-[#d9fdd3] rounded-br-none"
                                            : "bg-white border rounded-bl-none"
                                        }`}>
                                        {item.text}
                                    </div>
                                )}

                                <p className="text-[10px] text-gray-500 text-right mt-1">
                                    {new Date(item.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                </p>
                            </div>
                        </div>
                    )
                })}

                {isTyping && (
                    <p className="text-xs text-gray-500 ml-2">typing...</p>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* IMAGE PREVIEW */}
            {selectedImage && (
                <div className="px-3 py-2 bg-white flex items-center gap-2">
                    <img src={selectedImage} className="h-16 rounded" />
                    <button onClick={() => setSelectedImage(null)}><X /></button>
                </div>
            )}

            {/* INPUT */}
            <div className="bg-[#f0f2f5] px-2 py-2 flex items-center gap-2">

                <button onClick={() => setShowEmoji(!showEmoji)}>
                    <Smile size={22} />
                </button>

                <button onClick={() => imageInputRef.current.click()}>
                    <ImagePlus size={22} />
                </button>

                <input type="file" hidden ref={imageInputRef} onChange={handleImageSelect} />

                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type a message"
                    className="flex-1 px-4 py-2 rounded-full bg-white text-sm outline-none"
                />

                <button onClick={sendMessage} className="bg-green-500 text-white p-2 rounded-full">
                    <Send size={18} />
                </button>
            </div>

            {/* EMOJI */}
            {showEmoji && (
                <div className="absolute bottom-20 left-2">
                    <EmojiPicker onEmojiClick={(e) => setText(prev => prev + e.emoji)} />
                </div>
            )}
        </div>
    )
}

export default ChatBox