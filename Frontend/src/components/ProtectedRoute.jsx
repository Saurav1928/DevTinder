import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Navigate } from "react-router-dom"
import axios from "axios"
import { addUser } from "../utils/userSlice"
import BACKEND_URL from "../utils/constant"

const ProtectedRoute = ({ children }) => {
  const user = useSelector((store) => store.user)
  const isVerified = useSelector((store) => store?.user?.isVerified)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user) {
          const res = await axios.get(BACKEND_URL + "/profile/view", {
            withCredentials: true,
          })
          if (res?.data?.user) {
            dispatch(addUser(res.data.user))
          }
        }
      } catch (err) {
        console.error("Error fetching user data:", err)
      }
    }

    fetchUserData()
  }, [user, dispatch])

  if (!user) {
    // Redirect to welcome page if user is not logged in
    return <Navigate to="/welcomePage" />
  }

  if (isVerified === false) {
    // Redirect to userNotVerified page if user is not verified
    return <Navigate to="/userNotVerified" />
  }

  // Render the child components if user is logged in and verified
  return children
}

export default ProtectedRoute