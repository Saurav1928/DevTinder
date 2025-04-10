import React from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  const user = useSelector((store) => store.user)

  if (!user) {
    // Redirect to welcome page if user is not logged in
    return <Navigate to="/welcomePage" />
  }

  if (!user.isVerified) {
    // Redirect to not verified page if user is not verified
    return <Navigate to="/notverified" />
  }

  // Render the children (protected content) if user is verified
  return children
}

export default ProtectedRoute
