import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"
import BACKEND_URL from "../utils/constant"

const SignUp = () => {
  const user = useSelector((store) => store.user)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [emailId, setEmailId] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSignUp = async () => {
    try {
      if (firstName && lastName && emailId && password) {
        const res = await axios.post(
          BACKEND_URL + "/signup",
          { firstName, lastName, emailId, password },
          { withCredentials: true }
        )
        setError("")
        const user = res?.data?.user
        dispatch(addUser(user))
        navigate("/notverified")
      } else {
        setError("Please fill in all fields.")
      }
    } catch (error) {
      setError(error.response?.data?.error)
    }
  }

  useEffect(() => {
    if (user && user?.isVerified) {
      navigate("/")
    }
    if (user && !user?.isVerified) {
      navigate("/notverified")
    }
  }, [user, navigate])

  return (
    !user && (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <div className="card bg-base-300 w-full max-w-md shadow-xl">
          <div className="card-body">
            <h1 className="text-center font-bold text-3xl">Sign Up</h1>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="input input-bordered w-full"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="input input-bordered w-full"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="btn btn-primary w-full hover:bg-primary-focus"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
              <Link to="/login" className="text-center text-blue-500">
                Already have an account? Login
              </Link>
              {error && <div className="text-red-500">{error}</div>}
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default SignUp