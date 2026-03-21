// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { Navigate, Outlet } from 'react-router-dom'
// import Loader from './Loader'
// import axios from 'axios'
// import { addUserData } from '../Utils/UserSlice'


// const ProtectedRoutes = () => {

//     const userSliceData = useSelector(store => store.user)
//     const dispatch = useDispatch()

//     useEffect(() => {
//         async function getUserData()
//         {
//             try {
//                 const res = await axios.get(import.meta.env.VITE_DOMAIN + "/api/auth/get-user-data", {withCredentials : true})
//                 dispatch(addUserData(res.data.data))
//             } catch (error) {
//                 window.location = "/login"
//             }

//         }
//         getUserData()
//     }, [])

//     return !userSliceData?.username ? <Loader /> : <Outlet />
// }

// export default ProtectedRoutes




// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { Navigate, Outlet } from 'react-router-dom'
// import Loader from './Loader'
// import axios from 'axios'
// import { addUserData } from '../Utils/UserSlice'

// const ProtectedRoutes = () => {
//     const userSliceData = useSelector(store => store.user)
//     const dispatch = useDispatch()
//     const [loading, setLoading] = useState(true)
//     const [isAuthenticated, setIsAuthenticated] = useState(false)

//     useEffect(() => {
//         async function getUserData() {
//             try {
//                 const res = await axios.get(
//                     import.meta.env.VITE_DOMAIN + "/api/auth/get-user-data", 
//                     { withCredentials: true }
//                 )
//                 dispatch(addUserData(res.data.data))
//                 setIsAuthenticated(true)
//             } catch (error) {
//                 console.log("Authentication failed:", error)
//                 setIsAuthenticated(false)
//             } finally {
//                 setLoading(false)
//             }
//         }
        
//         // Agar user data already hai to API call mat karo
//         if (!userSliceData?.username) {
//             getUserData()
//         } else {
//             setLoading(false)
//             setIsAuthenticated(true)
//         }
//     }, [dispatch]) // dispatch ko dependency mein add kiya

//     if (loading) {
//         return <Loader />
//     }

//     return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
// }

// export default ProtectedRoutes



import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Loader from './Loader'
import axios from 'axios'
import { addUserData } from '../Utils/UserSlice'

const ProtectedRoutes = () => {
    const userSliceData = useSelector(store => store.user)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        async function getUserData() {
            try {
                 console.log("🔍 Fetching user data...")  // ✅
                const res = await axios.get(
    import.meta.env.VITE_BASE_URL + "/api/auth/get-user-data",
    { withCredentials: true }
)
                 console.log("✅ User data received:", res.data.data)  // ✅
                dispatch(addUserData(res.data.data))
                setIsAuthenticated(true)
            } catch (error) {
                console.log("Authentication failed:", error)
                setIsAuthenticated(false)
            } finally {
                setLoading(false)
            }
        }
        
        if (!userSliceData?.username) {
            getUserData()
        } else {
            console.log("✅ User already in Redux:", userSliceData)  // ✅
            setLoading(false)
            setIsAuthenticated(true)
        }
    }, [dispatch, userSliceData?.username])

    if (loading) {
        return <Loader />
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoutes