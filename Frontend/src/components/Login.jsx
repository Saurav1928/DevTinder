import React, { useState, useEffect } from "react"
import axios from "axios"
import { addUser } from "../utils/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import BACKEND_URL from "../utils/constant"

const Login = () => {
  const [emailId, setEmailId] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user, navigate])

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BACKEND_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      )
      dispatch(addUser(res.data))
    } catch (error) {
      setError(error?.response?.data?.error)
    }
  }

  return (
    !user && (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <div className="card bg-base-300 w-full max-w-md shadow-xl">
          <div className="card-body">
            <h1 className="text-center font-bold text-3xl">Login</h1>
            <div className="flex flex-col gap-4">
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
              <button className="btn btn-primary w-full" onClick={handleLogin}>
                Login
              </button>
              <Link to="/signup" className="text-center text-blue-500">
                New User? Sign Up
              </Link>
              {error && <div className="text-red-500">{error}</div>}
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default Login