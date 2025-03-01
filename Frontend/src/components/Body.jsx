import React, { useEffect } from "react"
import NavBar from "./NavBar"
import { Outlet, useNavigate } from "react-router-dom"
import Footer from "./Footer"
import { useDispatch, useSelector } from "react-redux"
import BACKEND_URL from "../utils/constant"
import { addUser } from "../utils/userSlice"
import axios from "axios"
const Body = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userData = useSelector((store) => store.user)
  const fetch = async () => {
    try {
      if (userData) return
      const res = await axios.get(BACKEND_URL + "/profile/view", {
        withCredentials: true,
      })
      dispatch(addUser(res.data))
    } catch (err) {
      if (err.status === 401) {
        navigate("/welcomePage")
      } else console.log("ERROR : ", err)
    }
  }
  useEffect(() => {
    fetch()
  }, [])
  return (
    <>
      <NavBar />
      {/* NOTE : Outlet is the place where child of Body will then render... */}
      <Outlet />
      <Footer />
    </>
  )
}

export default Body
