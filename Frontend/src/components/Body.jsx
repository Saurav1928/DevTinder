import React, { useEffect } from "react"
import NavBar from "./NavBar"
import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"
import axios from "axios"
import BACKEND_URL from "../utils/constant"

const Body = () => {
  const dispatch = useDispatch()
  const userData = useSelector((store) => store.user)

  const fetchUserData = async () => {
    try {
      if (!userData) {
        const res = await axios.get(BACKEND_URL + "/profile/view", {
          withCredentials: true,
        })
        const user = res.data.user
        dispatch(addUser(user))
      }
    } catch (err) {
      console.error("Error fetching user data:", err)
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [userData])

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow bg-base-200">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Body