import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import axios from 'axios'
import ConvCard from './ConvCard'
import { MessageCircle } from 'lucide-react'

const Chats = () => {
    const [conv, setConv] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getConversations() {
            try {
                const res = await axios.get(
                    import.meta.env.VITE_DOMAIN + `/api/chats`,
                    { withCredentials: true }
                )
                setConv(res.data.data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        getConversations()
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
            <Navbar />

            <div className="flex">
                <Sidebar />

                <div className="flex-1 max-w-2xl mx-auto px-4 py-6 pb-24 md:pb-6">

                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                        <MessageCircle className="text-pink-500" size={28} />
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Messages</h1>
                    </div>

                    {/* Chat List */}
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                        {loading ? (
                            <div className="space-y-4 p-4">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="flex items-center gap-4 animate-pulse">
                                        <div className="w-14 h-14 bg-gray-200 rounded-full"></div>
                                        <div className="flex-1 space-y-2">
                                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                            <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : conv.length > 0 ? (
                            conv.map((item, index) => (
                                <ConvCard key={index} data={item} />
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                                <MessageCircle size={48} className="mb-3 text-gray-300" />
                                <p className="font-medium">No conversations yet</p>
                                <p className="text-sm mt-1">Start chatting with someone!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chats