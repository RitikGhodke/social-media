import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import Loader from "./Loader"
import axios from "axios"
import { addUserData } from "../Utils/UserSlice"

const ProtectedRoutes = () => {
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_DOMAIN}/api/auth/get-user-data`,
          { withCredentials: true }
        )
        dispatch(addUserData(res.data.data))
      } catch (error) {
        console.log("❌ Not logged in")
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [dispatch])

  if (loading) {
    return <Loader />
  }

  if (!user || !user._id) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoutes