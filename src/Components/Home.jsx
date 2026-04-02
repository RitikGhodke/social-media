import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import axios from 'axios'
import Feed from './PostCards'

const Home = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function getData() {
      const res = await axios.get(
        import.meta.env.VITE_DOMAIN + `/api/posts/feed`,
        { withCredentials: true }
      )
      setPosts(res.data.data)
    }
    getData()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
      <Navbar />
      <div className='flex'>
        <Sidebar />
        {/* ✅ Mobile pe bottom nav ke liye padding bottom */}
        <div className='w-full pb-20 md:pb-0'>
          <Feed posts={posts} />
        </div>
      </div>
    </div>
  )
}

export default Home