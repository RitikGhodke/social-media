// import React, { useEffect, useRef, useState } from 'react'
// import axios from 'axios'
// import { useSelector } from 'react-redux'
// import { X, ChevronLeft, ChevronRight, Eye, Trash2 } from 'lucide-react'

// const StoryViewer = ({ group, initialIndex, onClose, onStoryViewed }) => {
//     const [currentIndex, setCurrentIndex] = useState(initialIndex || 0)
//     const [progress, setProgress] = useState(0)
//     const [paused, setPaused] = useState(false)
//     const [showViewers, setShowViewers] = useState(false)
//     const [viewers, setViewers] = useState([])
//     const progressInterval = useRef(null)
//     const myUserData = useSelector(store => store.user)
//     const DURATION = 5000

//     const currentStory = group.stories[currentIndex]
//     const isMyStory = group.author._id === myUserData._id

//     useEffect(() => {
//         markViewed()
//         startProgress()
//         return () => clearInterval(progressInterval.current)
//     }, [currentIndex])

//     async function markViewed() {
//         try {
//             await axios.patch(
//                 import.meta.env.VITE_DOMAIN + `/api/stories/${currentStory._id}/view`,
//                 {},
//                 { withCredentials: true }
//             )
//             onStoryViewed?.(currentStory._id)
//         } catch (err) {
//             console.error(err)
//         }
//     }

//     function startProgress() {
//         setProgress(0)
//         clearInterval(progressInterval.current)
//         progressInterval.current = setInterval(() => {
//             if (!paused) {
//                 setProgress(prev => {
//                     if (prev >= 100) {
//                         goNext()
//                         return 0
//                     }
//                     return prev + (100 / (DURATION / 100))
//                 })
//             }
//         }, 100)
//     }

//     function goNext() {
//         if (currentIndex < group.stories.length - 1) {
//             setCurrentIndex(prev => prev + 1)
//         } else {
//             onClose()
//         }
//     }

//     function goPrev() {
//         if (currentIndex > 0) {
//             setCurrentIndex(prev => prev - 1)
//         }
//     }

//     async function handleDelete() {
//         try {
//             await axios.delete(
//                 import.meta.env.VITE_DOMAIN + `/api/stories/${currentStory._id}`,
//                 { withCredentials: true }
//             )
//             if (group.stories.length === 1) {
//                 onClose()
//             } else {
//                 goNext()
//             }
//         } catch (err) {
//             console.error(err)
//         }
//     }

//     async function loadViewers() {
//         try {
//             const res = await axios.get(
//                 import.meta.env.VITE_DOMAIN + `/api/stories/${currentStory._id}/viewers`,
//                 { withCredentials: true }
//             )
//             setViewers(res.data.data)
//             setShowViewers(true)
//         } catch (err) {
//             console.error(err)
//         }
//     }

//     return (
//         <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
//             <div className="relative w-full h-full max-w-md mx-auto">

//                 {/* Progress bars */}
//                 <div className="absolute top-3 left-3 right-3 flex gap-1 z-20">
//                     {group.stories.map((_, i) => (
//                         <div key={i} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
//                             <div
//                                 className="h-full bg-white rounded-full"
//                                 style={{
//                                     width: i < currentIndex ? "100%" : i === currentIndex ? `${progress}%` : "0%",
//                                     transition: "none"
//                                 }}
//                             />
//                         </div>
//                     ))}
//                 </div>

//                 {/* Header */}
//                 <div className="absolute top-8 left-3 right-3 flex items-center justify-between z-20">
//                     <div className="flex items-center gap-2">
//                         <img
//                             src={group.author.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
//                             className="w-9 h-9 rounded-full object-cover border-2 border-white"
//                             alt="author"
//                         />
//                         <div>
//                             <p className="text-white font-semibold text-sm">
//                                 {group.author.firstName} {group.author.lastName}
//                             </p>
//                             <p className="text-white/70 text-xs">
//                                 {new Date(currentStory.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//                             </p>
//                         </div>
//                     </div>

//                     <div className="flex items-center gap-3">
//                         {isMyStory && (
//                             <>
//                                 <button onClick={loadViewers} className="text-white/80 hover:text-white">
//                                     <Eye size={20} />
//                                 </button>
//                                 <button onClick={handleDelete} className="text-white/80 hover:text-red-400">
//                                     <Trash2 size={20} />
//                                 </button>
//                             </>
//                         )}
//                         <button onClick={onClose} className="text-white/80 hover:text-white">
//                             <X size={24} />
//                         </button>
//                     </div>
//                 </div>

//                 {/* Story Image */}
//                 <img
//                     src={currentStory.media}
//                     alt="story"
//                     className="w-full h-full object-cover"
//                     onTouchStart={() => setPaused(true)}
//                     onTouchEnd={() => setPaused(false)}
//                     onMouseDown={() => setPaused(true)}
//                     onMouseUp={() => setPaused(false)}
//                 />

//                 {/* Text Overlay */}
//                 {currentStory.text && (
//                     <div className={`absolute left-4 right-4 z-20 ${
//                         currentStory.textPosition === "top"
//                             ? "top-24"
//                             : currentStory.textPosition === "bottom"
//                                 ? "bottom-24"
//                                 : "top-1/2 -translate-y-1/2"
//                     }`}>
//                         <p
//                             className="text-center text-xl font-bold px-4 py-2 rounded-xl bg-black/30 backdrop-blur-sm"
//                             style={{ color: currentStory.textColor || "#ffffff" }}
//                         >
//                             {currentStory.text}
//                         </p>
//                     </div>
//                 )}

//                 {/* Left tap zone */}
//                 <button
//                     className="absolute left-0 top-0 w-1/3 h-full z-10"
//                     onClick={goPrev}
//                 />

//                 {/* Right tap zone */}
//                 <button
//                     className="absolute right-0 top-0 w-1/3 h-full z-10"
//                     onClick={goNext}
//                 />

//                 {/* Viewers Modal */}
//                 {showViewers && (
//                     <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-4 z-30 max-h-[50vh] overflow-y-auto">
//                         <div className="flex items-center justify-between mb-4">
//                             <p className="font-bold text-gray-800">Viewers ({viewers.length})</p>
//                             <button onClick={() => setShowViewers(false)}>
//                                 <X size={20} className="text-gray-500" />
//                             </button>
//                         </div>
//                         {viewers.length === 0 ? (
//                             <p className="text-gray-400 text-sm text-center py-4">No viewers yet</p>
//                         ) : (
//                             viewers.map((v, i) => (
//                                 <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-none">
//                                     <img
//                                         src={v.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
//                                         className="w-10 h-10 rounded-full object-cover"
//                                         alt="viewer"
//                                     />
//                                     <div>
//                                         <p className="font-semibold text-sm text-gray-800">{v.firstName} {v.lastName}</p>
//                                         <p className="text-xs text-gray-500">@{v.username}</p>
//                                     </div>
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                 )}
//             </div>
//         </div>
//     )
// }

// export default StoryViewer








import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { X, ChevronLeft, ChevronRight, Eye, Trash2, Heart, MessageCircle, Send } from 'lucide-react'

const StoryViewer = ({ group, initialIndex, onClose, onStoryViewed }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex || 0)
    const [progress, setProgress] = useState(0)
    const [paused, setPaused] = useState(false)
    const [showViewers, setShowViewers] = useState(false)
    const [viewers, setViewers] = useState([])
    const [liked, setLiked] = useState(false)
    const [likeAnim, setLikeAnim] = useState(false)
    const [replyText, setReplyText] = useState("")
    const [showReply, setShowReply] = useState(false)
    const progressInterval = useRef(null)
    const pausedRef = useRef(false)
    const myUserData = useSelector(store => store.user)
    const DURATION = 15000 // ✅ 15 seconds

    const currentStory = group.stories[currentIndex]
    const isMyStory = group.author._id === myUserData._id

    useEffect(() => {
        markViewed()
        startProgress()
        setLiked(false)
        setShowReply(false)
        setReplyText("")
        return () => clearInterval(progressInterval.current)
    }, [currentIndex])

    // ✅ Pause when viewers or reply is open
    useEffect(() => {
        pausedRef.current = paused || showViewers || showReply
    }, [paused, showViewers, showReply])

    async function markViewed() {
        try {
            await axios.patch(
                import.meta.env.VITE_DOMAIN + `/api/stories/${currentStory._id}/view`,
                {},
                { withCredentials: true }
            )
            onStoryViewed?.(currentStory._id)
        } catch (err) {
            console.error(err)
        }
    }

    function startProgress() {
        setProgress(0)
        clearInterval(progressInterval.current)
        progressInterval.current = setInterval(() => {
            if (!pausedRef.current) {
                setProgress(prev => {
                    if (prev >= 100) {
                        goNext()
                        return 0
                    }
                    return prev + (100 / (DURATION / 100))
                })
            }
        }, 100)
    }

    function goNext() {
        clearInterval(progressInterval.current)
        if (currentIndex < group.stories.length - 1) {
            setCurrentIndex(prev => prev + 1)
        } else {
            onClose()
        }
    }

    function goPrev() {
        clearInterval(progressInterval.current)
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1)
        } else {
            setProgress(0)
            startProgress()
        }
    }

    async function handleDelete() {
        try {
            await axios.delete(
                import.meta.env.VITE_DOMAIN + `/api/stories/${currentStory._id}`,
                { withCredentials: true }
            )
            if (group.stories.length === 1) {
                onClose()
            } else {
                goNext()
            }
        } catch (err) {
            console.error(err)
        }
    }

    async function loadViewers() {
        setPaused(true)
        try {
            const res = await axios.get(
                import.meta.env.VITE_DOMAIN + `/api/stories/${currentStory._id}/viewers`,
                { withCredentials: true }
            )
            setViewers(res.data.data)
            setShowViewers(true)
        } catch (err) {
            console.error(err)
        }
    }

    // ✅ Double tap to like
    function handleDoubleTap() {
        setLiked(true)
        setLikeAnim(true)
        setTimeout(() => setLikeAnim(false), 1000)
    }

    // ✅ Send reply
    async function handleReply() {
        if (!replyText.trim()) return
        try {
            await axios.post(
                import.meta.env.VITE_DOMAIN + `/api/stories/${currentStory._id}/reply`,
                { text: replyText },
                { withCredentials: true }
            )
            setReplyText("")
            setShowReply(false)
            setPaused(false)
        } catch (err) {
            console.error(err)
        }
    }

    const lastTap = useRef(0)
    function handleTap(e) {
        const now = Date.now()
        if (now - lastTap.current < 300) {
            handleDoubleTap()
        }
        lastTap.current = now
    }

    return (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
            <div className="relative w-full h-full max-w-md mx-auto select-none">

                {/* ✅ Progress bars */}
                <div className="absolute top-3 left-3 right-3 flex gap-1 z-20">
                    {group.stories.map((_, i) => (
                        <div key={i} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-white rounded-full"
                                style={{
                                    width: i < currentIndex ? "100%" : i === currentIndex ? `${progress}%` : "0%",
                                    transition: "none"
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* ✅ Header */}
                <div className="absolute top-8 left-3 right-3 flex items-center justify-between z-20">
                    <div className="flex items-center gap-2">
                        <img
                            src={group.author.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                            className="w-9 h-9 rounded-full object-cover border-2 border-white"
                            alt="author"
                        />
                        <div>
                            <p className="text-white font-semibold text-sm drop-shadow">
                                {group.author.firstName} {group.author.lastName}
                            </p>
                            <p className="text-white/70 text-xs">
                                {new Date(currentStory.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {isMyStory && (
                            <>
                                <button
                                    onClick={loadViewers}
                                    className="text-white/80 hover:text-white"
                                >
                                    <Eye size={20} />
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="text-white/80 hover:text-red-400"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </>
                        )}
                        <button onClick={onClose} className="text-white/80 hover:text-white">
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* ✅ Story Media — image or video */}
                <div
                    className="w-full h-full"
                    onClick={handleTap}
                    onTouchStart={() => { setPaused(true) }}
                    onTouchEnd={() => { setPaused(false) }}
                    onMouseDown={() => setPaused(true)}
                    onMouseUp={() => setPaused(false)}
                >
                    {currentStory.mediaType === "video" ? (
                        <video
                            src={currentStory.media}
                            className="w-full h-full object-cover"
                            autoPlay
                            playsInline
                            muted={false}
                            loop={false}
                        />
                    ) : (
                        <img
                            src={currentStory.media}
                            alt="story"
                            className="w-full h-full object-cover"
                            draggable={false}
                        />
                    )}
                </div>

                {/* ✅ Text Overlay */}
                {currentStory.text && (
                    <div className={`absolute left-4 right-4 z-20 pointer-events-none ${
                        currentStory.textPosition === "top"
                            ? "top-24"
                            : currentStory.textPosition === "bottom"
                                ? "bottom-28"
                                : "top-1/2 -translate-y-1/2"
                    }`}>
                        <p
                            className="text-center text-2xl font-bold px-4 py-2 rounded-xl bg-black/30 backdrop-blur-sm drop-shadow-lg"
                            style={{ color: currentStory.textColor || "#ffffff" }}
                        >
                            {currentStory.text}
                        </p>
                    </div>
                )}

                {/* ✅ Double tap heart animation */}
                {likeAnim && (
                    <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                        <Heart
                            size={100}
                            fill="white"
                            className="text-white opacity-90 animate-ping"
                            style={{ animationDuration: "0.8s", animationIterationCount: 1 }}
                        />
                    </div>
                )}

                {/* ✅ Left/Right tap zones */}
                <button
                    className="absolute left-0 top-0 w-1/3 h-full z-10"
                    onClick={(e) => { e.stopPropagation(); goPrev() }}
                />
                <button
                    className="absolute right-0 top-0 w-1/3 h-full z-10"
                    onClick={(e) => { e.stopPropagation(); goNext() }}
                />

                {/* ✅ Bottom actions — like, reply, share */}
                {!isMyStory && (
                    <div className="absolute bottom-6 left-4 right-4 z-20 flex items-center gap-3">
                        {/* Reply input */}
                        {showReply ? (
                            <div className="flex-1 flex gap-2">
                                <input
                                    type="text"
                                    value={replyText}
                                    onChange={e => setReplyText(e.target.value)}
                                    placeholder="Reply to story..."
                                    className="flex-1 bg-white/20 backdrop-blur-sm text-white placeholder-white/60 border border-white/40 rounded-full px-4 py-2 text-sm outline-none"
                                    autoFocus
                                    onKeyDown={e => e.key === "Enter" && handleReply()}
                                />
                                <button
                                    onClick={handleReply}
                                    className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full border border-white/40"
                                >
                                    <Send size={18} />
                                </button>
                                <button
                                    onClick={() => { setShowReply(false); setPaused(false) }}
                                    className="text-white/80"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        ) : (
                            <>
                                <button
                                    onClick={() => { setShowReply(true); setPaused(true) }}
                                    className="flex-1 bg-white/20 backdrop-blur-sm text-white border border-white/40 rounded-full px-4 py-2 text-sm text-left"
                                >
                                    Reply...
                                </button>
                                <button
                                    onClick={() => { setLiked(!liked); setLikeAnim(true); setTimeout(() => setLikeAnim(false), 800) }}
                                    className="text-white"
                                >
                                    <Heart
                                        size={28}
                                        fill={liked ? "red" : "none"}
                                        className={liked ? "text-red-500" : "text-white"}
                                    />
                                </button>
                            </>
                        )}
                    </div>
                )}

                {/* ✅ Viewers Modal */}
                {showViewers && (
                    <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-4 z-30 max-h-[60vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <p className="font-bold text-gray-800 text-lg">
                                <Eye size={18} className="inline mr-2 text-gray-500" />
                                Viewers ({viewers.length})
                            </p>
                            <button onClick={() => { setShowViewers(false); setPaused(false) }}>
                                <X size={20} className="text-gray-500" />
                            </button>
                        </div>
                        {viewers.length === 0 ? (
                            <p className="text-gray-400 text-sm text-center py-8">No viewers yet</p>
                        ) : (
                            viewers.map((v, i) => (
                                <div key={i} className="flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-none">
                                    <img
                                        src={v.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                        className="w-11 h-11 rounded-full object-cover"
                                        alt="viewer"
                                    />
                                    <div>
                                        <p className="font-semibold text-sm text-gray-800">{v.firstName} {v.lastName}</p>
                                        <p className="text-xs text-gray-500">@{v.username}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default StoryViewer