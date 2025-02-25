import React from "react"
import NavBar from "./NavBar"
import { Outlet } from "react-router-dom"
import Footer from "./Footer"

const Body = () => {
  return (
    <>
      <NavBar />
      {/* Outlet is the place where child of Body will then render... */}
      <Outlet />
      <Footer/>
    </>
  )
}

export default Body
