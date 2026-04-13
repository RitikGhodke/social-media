// import React, { useState, useRef } from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import Navbar from './Navbar'
// import Sidebar from './Sidebar'
// import { ImagePlus, X, Type } from 'lucide-react'
// import imageCompression from 'browser-image-compression'
// import toast from 'react-hot-toast'

// const TEXT_COLORS = ["#ffffff", "#000000", "#ff4d6d", "#a855f7", "#3b82f6", "#22c55e", "#f59e0b"]

// const AddStory = () => {
//     const [selectedImage, setSelectedImage] = useState(null)
//     const [imageBase64, setImageBase64] = useState("")
//     const [text, setText] = useState("")
//     const [textColor, setTextColor] = useState("#ffffff")
//     const [textPosition, setTextPosition] = useState("center")
//     const [showTextInput, setShowTextInput] = useState(false)
//     const [loading, setLoading] = useState(false)
//     const imageInputRef = useRef(null)
//     const nav = useNavigate()

//     async function handleImageSelect(e) {
//         const file = e.target.files?.[0]
//         if (!file) return
//         setSelectedImage(URL.createObjectURL(file))
//         try {
//             const compressed = await imageCompression(file, {
//                 maxSizeMB: 0.8,
//                 maxWidthOrHeight: 1080,
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

//     async function handlePost() {
//         if (!imageBase64) return toast.error("Please select an image")
//         setLoading(true)
//         try {
//             await axios.post(
//                 import.meta.env.VITE_DOMAIN + "/api/stories/create",
//                 { media: imageBase64, text, textColor, textPosition },
//                 { withCredentials: true }
//             )
//             toast.success("Story posted! 🎉")
//             nav("/")
//         } catch (err) {
//             toast.error(err.response?.data?.error || "Something went wrong")
//         } finally {
//             setLoading(false)
//         }
//     }

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
//             <Navbar />
//             <div className="flex">
//                 <Sidebar />
//                 <div className="flex-1 flex items-center justify-center px-4 py-6 pb-24 md:pb-6">
//                     <div className="w-full max-w-sm">

//                         <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Add Story</h2>

//                         {/* Preview */}
//                         <div
//                             className="relative w-full rounded-3xl overflow-hidden bg-gray-900 mb-4 cursor-pointer"
//                             style={{ aspectRatio: "9/16" }}
//                             onClick={() => !selectedImage && imageInputRef.current?.click()}
//                         >
//                             {selectedImage ? (
//                                 <>
//                                     <img src={selectedImage} alt="preview" className="w-full h-full object-cover" />

//                                     {text && (
//                                         <div className={`absolute left-4 right-4 ${
//                                             textPosition === "top"
//                                                 ? "top-16"
//                                                 : textPosition === "bottom"
//                                                     ? "bottom-16"
//                                                     : "top-1/2 -translate-y-1/2"
//                                         }`}>
//                                             <p
//                                                 className="text-center text-xl font-bold px-4 py-2 rounded-xl bg-black/30 backdrop-blur-sm"
//                                                 style={{ color: textColor }}
//                                             >
//                                                 {text}
//                                             </p>
//                                         </div>
//                                     )}

//                                     <button
//                                         onClick={(e) => {
//                                             e.stopPropagation()
//                                             setSelectedImage(null)
//                                             setImageBase64("")
//                                         }}
//                                         className="absolute top-3 right-3 bg-black/50 text-white rounded-full p-1"
//                                     >
//                                         <X size={18} />
//                                     </button>
//                                 </>
//                             ) : (
//                                 <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-white/50">
//                                     <ImagePlus size={48} />
//                                     <p className="text-sm">Tap to select image</p>
//                                 </div>
//                             )}
//                         </div>

//                         <input
//                             ref={imageInputRef}
//                             type="file"
//                             accept="image/*"
//                             className="hidden"
//                             onChange={handleImageSelect}
//                         />

//                         {selectedImage && (
//                             <div className="bg-white rounded-2xl p-4 space-y-4 mb-4 shadow-sm">

//                                 <button
//                                     onClick={() => setShowTextInput(!showTextInput)}
//                                     className="flex items-center gap-2 text-sm font-medium text-purple-600"
//                                 >
//                                     <Type size={16} />
//                                     {showTextInput ? "Hide text" : "Add text"}
//                                 </button>

//                                 {showTextInput && (
//                                     <>
//                                         <input
//                                             type="text"
//                                             value={text}
//                                             onChange={e => setText(e.target.value)}
//                                             placeholder="Type something..."
//                                             className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
//                                         />

//                                         <div>
//                                             <p className="text-xs text-gray-500 mb-2">Text Color</p>
//                                             <div className="flex gap-2">
//                                                 {TEXT_COLORS.map(color => (
//                                                     <button
//                                                         key={color}
//                                                         onClick={() => setTextColor(color)}
//                                                         className={`w-7 h-7 rounded-full border-2 transition ${textColor === color ? "border-purple-500 scale-110" : "border-gray-200"}`}
//                                                         style={{ backgroundColor: color }}
//                                                     />
//                                                 ))}
//                                             </div>
//                                         </div>

//                                         <div>
//                                             <p className="text-xs text-gray-500 mb-2">Text Position</p>
//                                             <div className="flex gap-2">
//                                                 {[
//                                                     { value: "top", label: "Top" },
//                                                     { value: "center", label: "Center" },
//                                                     { value: "bottom", label: "Bottom" },
//                                                 ].map(pos => (
//                                                     <button
//                                                         key={pos.value}
//                                                         onClick={() => setTextPosition(pos.value)}
//                                                         className={`flex-1 py-2 rounded-xl border text-xs font-medium transition ${
//                                                             textPosition === pos.value
//                                                                 ? "border-purple-400 bg-purple-50 text-purple-600"
//                                                                 : "border-gray-200 text-gray-500"
//                                                         }`}
//                                                     >
//                                                         {pos.label}
//                                                     </button>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     </>
//                                 )}
//                             </div>
//                         )}

//                         <button
//                             onClick={handlePost}
//                             disabled={!imageBase64 || loading}
//                             className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-2xl font-bold text-base hover:opacity-90 transition disabled:opacity-40"
//                         >
//                             {loading ? "Posting..." : "Post Story"}
//                         </button>

//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default AddStory







import React, { useState, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { ImagePlus, X, Type, Users } from 'lucide-react'
import imageCompression from 'browser-image-compression'
import toast from 'react-hot-toast'

const TEXT_COLORS = [
    "#ffffff", "#000000", "#ff4d6d", "#a855f7",
    "#3b82f6", "#22c55e", "#f59e0b", "#ef4444",
    "#06b6d4", "#f97316"
]

const TEXT_STYLES = [
    { id: "normal", label: "Aa", className: "font-normal" },
    { id: "bold", label: "Aa", className: "font-black" },
    { id: "italic", label: "Aa", className: "italic font-semibold" },
    { id: "shadow", label: "Aa", className: "font-bold drop-shadow-lg" },
]

const AddStory = () => {
    const [selectedMedia, setSelectedMedia] = useState(null)
    const [mediaBase64, setMediaBase64] = useState("")
    const [mediaType, setMediaType] = useState("image")
    const [text, setText] = useState("")
    const [textColor, setTextColor] = useState("#ffffff")
    const [textStyle, setTextStyle] = useState("bold")
    const [textPosition, setTextPosition] = useState("center")
    const [showTextEditor, setShowTextEditor] = useState(false)
    const [collaborator, setCollaborator] = useState("")
    const [showCollab, setShowCollab] = useState(false)
    const [loading, setLoading] = useState(false)
    const mediaInputRef = useRef(null)
    const nav = useNavigate()

    async function handleMediaSelect(e) {
        const file = e.target.files?.[0]
        if (!file) return

        const isVideo = file.type.startsWith("video/")
        setMediaType(isVideo ? "video" : "image")
        setSelectedMedia(URL.createObjectURL(file))

        if (isVideo) {
            // Video — direct base64
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => setMediaBase64(reader.result)
        } else {
            // Image — compress
            try {
                const compressed = await imageCompression(file, {
                    maxSizeMB: 0.8,
                    maxWidthOrHeight: 1080,
                    useWebWorker: true
                })
                const reader = new FileReader()
                reader.readAsDataURL(compressed)
                reader.onload = () => setMediaBase64(reader.result)
            } catch {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => setMediaBase64(reader.result)
            }
        }
    }

    async function handlePost() {
        if (!mediaBase64) return toast.error("Please select an image or video")
        setLoading(true)
        try {
            await axios.post(
                import.meta.env.VITE_DOMAIN + "/api/stories/create",
                {
                    media: mediaBase64,
                    mediaType,
                    text,
                    textColor,
                    textStyle,
                    textPosition,
                    collaborator: collaborator || null
                },
                { withCredentials: true }
            )
            toast.success("Story posted! 🎉")
            nav("/")
        } catch (err) {
            toast.error(err.response?.data?.error || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    const textStyleClass = TEXT_STYLES.find(s => s.id === textStyle)?.className || "font-bold"

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
            <Navbar />
            <div className="flex">
                <Sidebar />
                <div className="flex-1 flex items-center justify-center px-4 py-6 pb-24 md:pb-6">
                    <div className="w-full max-w-sm">

                        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Add Story</h2>

                        {/* ✅ Preview */}
                        <div
                            className="relative w-full rounded-3xl overflow-hidden bg-gray-900 mb-4 cursor-pointer"
                            style={{ aspectRatio: "9/16" }}
                            onClick={() => !selectedMedia && mediaInputRef.current?.click()}
                        >
                            {selectedMedia ? (
                                <>
                                    {mediaType === "video" ? (
                                        <video
                                            src={selectedMedia}
                                            className="w-full h-full object-cover"
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                        />
                                    ) : (
                                        <img src={selectedMedia} alt="preview" className="w-full h-full object-cover" />
                                    )}

                                    {/* Text preview */}
                                    {text && (
                                        <div className={`absolute left-4 right-4 ${
                                            textPosition === "top"
                                                ? "top-16"
                                                : textPosition === "bottom"
                                                    ? "bottom-16"
                                                    : "top-1/2 -translate-y-1/2"
                                        }`}>
                                            <p
                                                className={`text-center text-2xl px-4 py-2 rounded-xl bg-black/30 backdrop-blur-sm ${textStyleClass}`}
                                                style={{ color: textColor }}
                                            >
                                                {text}
                                            </p>
                                        </div>
                                    )}

                                    {/* Collaborator tag preview */}
                                    {collaborator && (
                                        <div className="absolute bottom-20 left-0 right-0 flex justify-center">
                                            <div className="bg-black/50 backdrop-blur-sm px-4 py-1.5 rounded-full flex items-center gap-2">
                                                <Users size={14} className="text-white" />
                                                <span className="text-white text-sm font-medium">@{collaborator}</span>
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        onClick={(e) => { e.stopPropagation(); setSelectedMedia(null); setMediaBase64("") }}
                                        className="absolute top-3 right-3 bg-black/50 text-white rounded-full p-1.5 z-10"
                                    >
                                        <X size={16} />
                                    </button>
                                </>
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-white/50">
                                    <ImagePlus size={48} />
                                    <p className="text-sm">Tap to select photo or video</p>
                                </div>
                            )}
                        </div>

                        <input
                            ref={mediaInputRef}
                            type="file"
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={handleMediaSelect}
                        />

                        {/* ✅ Controls */}
                        {selectedMedia && (
                            <div className="bg-white rounded-2xl p-4 space-y-4 mb-4 shadow-sm">

                                {/* Text editor toggle */}
                                <button
                                    onClick={() => setShowTextEditor(!showTextEditor)}
                                    className="flex items-center gap-2 text-sm font-medium text-purple-600 w-full"
                                >
                                    <Type size={16} />
                                    {showTextEditor ? "Hide text editor" : "Add text"}
                                </button>

                                {showTextEditor && (
                                    <>
                                        {/* Text input */}
                                        <input
                                            type="text"
                                            value={text}
                                            onChange={e => setText(e.target.value)}
                                            placeholder="Type something..."
                                            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                                        />

                                        {/* Text Style */}
                                        <div>
                                            <p className="text-xs text-gray-500 mb-2">Style</p>
                                            <div className="flex gap-2">
                                                {TEXT_STYLES.map(style => (
                                                    <button
                                                        key={style.id}
                                                        onClick={() => setTextStyle(style.id)}
                                                        className={`flex-1 py-2 rounded-xl border text-sm transition ${
                                                            textStyle === style.id
                                                                ? "border-purple-400 bg-purple-50 text-purple-600"
                                                                : "border-gray-200 text-gray-500"
                                                        } ${style.className}`}
                                                    >
                                                        {style.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Text color */}
                                        <div>
                                            <p className="text-xs text-gray-500 mb-2">Color</p>
                                            <div className="flex gap-2 flex-wrap">
                                                {TEXT_COLORS.map(color => (
                                                    <button
                                                        key={color}
                                                        onClick={() => setTextColor(color)}
                                                        className={`w-8 h-8 rounded-full border-2 transition ${
                                                            textColor === color
                                                                ? "border-purple-500 scale-110"
                                                                : "border-gray-200"
                                                        }`}
                                                        style={{ backgroundColor: color }}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Text position */}
                                        <div>
                                            <p className="text-xs text-gray-500 mb-2">Position</p>
                                            <div className="flex gap-2">
                                                {[
                                                    { value: "top", label: "Top" },
                                                    { value: "center", label: "Center" },
                                                    { value: "bottom", label: "Bottom" },
                                                ].map(pos => (
                                                    <button
                                                        key={pos.value}
                                                        onClick={() => setTextPosition(pos.value)}
                                                        className={`flex-1 py-2 rounded-xl border text-xs font-medium transition ${
                                                            textPosition === pos.value
                                                                ? "border-purple-400 bg-purple-50 text-purple-600"
                                                                : "border-gray-200 text-gray-500"
                                                        }`}
                                                    >
                                                        {pos.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* ✅ Collaborator */}
                                <button
                                    onClick={() => setShowCollab(!showCollab)}
                                    className="flex items-center gap-2 text-sm font-medium text-blue-500 w-full"
                                >
                                    <Users size={16} />
                                    {showCollab ? "Hide collaborator" : "Add collaborator"}
                                </button>

                                {showCollab && (
                                    <input
                                        type="text"
                                        value={collaborator}
                                        onChange={e => setCollaborator(e.target.value)}
                                        placeholder="Enter username..."
                                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    />
                                )}
                            </div>
                        )}

                        {/* Post button */}
                        <button
                            onClick={handlePost}
                            disabled={!mediaBase64 || loading}
                            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-2xl font-bold text-base hover:opacity-90 transition disabled:opacity-40"
                        >
                            {loading ? "Posting..." : "Post Story"}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddStory