import React, { createContext, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// Components
import Login from './Components/Login'
import Signup from './Components/Signup'
import Home from './Components/Home'
import ProtectedRoutes from './Components/ProtectedRoutes'
import Profile from './Components/Profile'
import Chats from './Components/Chats'
import ChatBox from './Components/ChatBox'
import NewPost from './Components/NewPost'
import EditProfile from './Components/EditProfile'
import EditPassword from './Components/EditPassword'
import ViewProfile from './Components/ViewProfile'
import Requests from './Components/Requests'
import Notifications from './Components/Notification'
import AddStory from './Components/AddStory'

export const uiContext = createContext()

const App = () => {
  const [ui, setUi] = useState(0)
  const [email, setEmail] = useState("")

  return (
    <uiContext.Provider value={{ ui, setUi, email, setEmail }}>
      <div>
        {/* ✅ Toast Notifications */}
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#4ade80',
                secondary: '#fff',
              },
            },
            error: {
              duration: 3000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />

        {/* ✅ Routes */}
        <Routes>
          {/* Public Routes */}
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoutes />}>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/profile/edit' element={<EditProfile />} />
            <Route path='/profile/edit/password' element={<EditPassword />} />
            <Route path='/profile/view/:userId' element={<ViewProfile />} />
            <Route path='/chats' element={<Chats />} />
            <Route path='/chat/:id' element={<ChatBox />} />
            <Route path='/add' element={<NewPost />} />
            <Route path='/review-requests' element={<Requests />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/add-story" element={<AddStory />} />
            
          </Route>
        </Routes>
      </div>
    </uiContext.Provider>
  )
}

export default App
