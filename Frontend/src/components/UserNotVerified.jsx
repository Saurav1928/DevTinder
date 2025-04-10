import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import BACKEND_URL from "../utils/constant"
import axios from "axios"
import { addUser } from "../utils/userSlice"

const UserNotVerified = () => {
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getProfileData = async () => {
    try {
      const res = await axios.get(BACKEND_URL + "/profile/view", {
        withCredentials: true,
      })
      const updatedUser = res.data.user
      console.log("Updated User: ", updatedUser)
      dispatch(addUser(updatedUser))
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  useEffect(() => {
    if (!user) {
      navigate("/welcomePage") // Redirect to welcome page if user is not logged in
    } else if (user?.isVerified) {
      navigate("/") // Redirect to home page if user is verified
    }
  }, [user, navigate])

  return (
    <div className="pt-20">
      <h1 className="text-center text-2xl font-bold">User Not Verified</h1>
      <p className="text-center mt-4">
        Please verify your email to access the app. If you have already verified, click the button below to refresh.
      </p>
      <div className="flex justify-center mt-6">
        <button
          className="btn btn-primary"
          onClick={getProfileData}
        >
          Refresh
        </button>
      </div>
    </div>
  )
}

export default UserNotVerified