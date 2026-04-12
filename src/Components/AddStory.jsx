import React, { useState, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { ImagePlus, X, Type } from 'lucide-react'
import imageCompression from 'browser-image-compression'
import toast from 'react-hot-toast'

const TEXT_COLORS = ["#ffffff", "#000000", "#ff4d6d", "#a855f7", "#3b82f6", "#22c55e", "#f59e0b"]

const AddStory = () => {
    const [selectedImage, setSelectedImage] = useState(null)
    const [imageBase64, setImageBase64] = useState("")
    const [text, setText] = useState("")
    const [textColor, setTextColor] = useState("#ffffff")
    const [textPosition, setTextPosition] = useState("center")
    const [showTextInput, setShowTextInput] = useState(false)
    const [loading, setLoading] = useState(false)
    const imageInputRef = useRef(null)
    const nav = useNavigate()

    async function handleImageSelect(e) {
        const file = e.target.files?.[0]
        if (!file) return
        setSelectedImage(URL.createObjectURL(file))
        try {
            const compressed = await imageCompression(file, {
                maxSizeMB: 0.8,
                maxWidthOrHeight: 1080,
                useWebWorker: true
            })
            const reader = new FileReader()
            reader.readAsDataURL(compressed)
            reader.onload = () => setImageBase64(reader.result)
        } catch {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => setImageBase64(reader.result)
        }
    }

    async function handlePost() {
        if (!imageBase64) return toast.error("Please select an image")
        setLoading(true)
        try {
            await axios.post(
                import.meta.env.VITE_DOMAIN + "/api/stories/create",
                { media: imageBase64, text, textColor, textPosition },
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
            <Navbar />
            <div className="flex">
                <Sidebar />
                <div className="flex-1 flex items-center justify-center px-4 py-6 pb-24 md:pb-6">
                    <div className="w-full max-w-sm">

                        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">✨ Add Story</h2>

                        {/* Preview */}
                        <div
                            className="relative w-full rounded-3xl overflow-hidden bg-gray-900 mb-4 cursor-pointer"
                            style={{ aspectRatio: "9/16" }}
                            onClick={() => !selectedImage && imageInputRef.current?.click()}
                        >
                            {selectedImage ? (
                                <>
                                    <img src={selectedImage} alt="preview" className="w-full h-full object-cover" />

                                    {text && (
                                        <div className={`absolute left-4 right-4 ${textPosition === "top"
                                            ? "top-16"
                                            : textPosition === "bottom"
                                                ? "bottom-16"
                                                : "top-1/2 -translate-y-1/2"
                                            }`}>
                                            <p
                                                className="text-center text-xl font-bold px-4 py-2 rounded-xl bg-black/30 backdrop-blur-sm"
                                                style={{ color: textColor }}
                                            >
                                                {text}
                                            </p>
                                        </div>
                                    )}

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setSelectedImage(null)
                                            setImageBase64("")
                                        }}
                                        className="absolute top-3 right-3 bg-black/50 text-white rounded-full p-1"
                                    >
                                        <X size={18} />
                                    </button>
                                </>
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-white/50">
                                    <ImagePlus size={48} />
                                    <p className="text-sm">Tap to select image</p>
                                </div>
                            )}
                        </div>

                        <input
                            ref={imageInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageSelect}
                        />

                        {selectedImage && (
                            <div className="bg-white rounded-2xl p-4 space-y-4 mb-4 shadow-sm">

                                <button
                                    onClick={() => setShowTextInput(!showTextInput)}
                                    className="flex items-center gap-2 text-sm font-medium text-purple-600"
                                >
                                    <Type size={16} />
                                    {showTextInput ? "Hide text" : "Add text"}
                                </button>

                                {showTextInput && (
                                    <>
                                        <input
                                            type="text"
                                            value={text}
                                            onChange={e => setText(e.target.value)}
                                            placeholder="Type something..."
                                            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                                        />

                                        <div>
                                            <p className="text-xs text-gray-500 mb-2">Text Color</p>
                                            <div className="flex gap-2">
                                                {TEXT_COLORS.map(color => (
                                                    <button
                                                        key={color}
                                                        onClick={() => setTextColor(color)}
                                                        className={`w-7 h-7 rounded-full border-2 transition ${textColor === color ? "border-purple-500 scale-110" : "border-gray-200"}`}
                                                        style={{ backgroundColor: color }}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray-500 mb-2">Text Position</p>
                                            <div className="flex gap-2">
                                                {[
                                                    { value: "top", label: "⬆ Top" },
                                                    { value: "center", label: "⬛ Center" },
                                                    { value: "bottom", label: "⬇ Bottom" },
                                                ].map(pos => (
                                                    <button
                                                        key={pos.value}
                                                        onClick={() => setTextPosition(pos.value)}
                                                        className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-xl border text-xs font-medium transition ${textPosition === pos.value
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
                            </div>
                        )}

                        <button
                            onClick={handlePost}
                            disabled={!imageBase64 || loading}
                            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-2xl font-bold text-base hover:opacity-90 transition disabled:opacity-40"
                        >
                            {loading ? "Posting..." : "Post Story 🚀"}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddStory