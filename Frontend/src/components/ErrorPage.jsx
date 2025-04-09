import React from "react"
import { Link } from "react-router-dom"

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-base-200">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-xl text-gray-700 mt-4">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="mt-6">
        <button className="btn btn-primary">Go Back Home</button>
      </Link>
    </div>
  )
}

export default ErrorPage
