import React, { useState, useEffect } from "react"
import axios from "axios"
import { addUser } from "../utils/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import BACKEND_URL from "../utils/constant"

const Login = () => {
  const [emailId, setEmailId] = useState("saurav@gmail.com")
  const [password, setPassword] = useState("Saurav@1234")
  const [error, setError] = useState("")
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    // If user is not null, navigate to home route
    if (user) {
      navigate("/")
    }
  }, [user, navigate])

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BACKEND_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true } // to set cookies in the browser
      )
      dispatch(addUser(res.data))
    } catch (error) {
      setError(error?.response?.data?.error)
    }
  }

  return (
    !user && (
      <div className="flex justify-center items-center mt-20">
        <div className="card bg-base-300 w-96 shadow-xl">
          <div className="card-body">
            <div className="flex flex-col gap-5">
              <h1 className="text-center font-bold text-3xl">Login</h1>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="text"
                  className="grow"
                  placeholder="Email"
                  value={emailId}
                  onChange={(e) => {
                    setEmailId(e.target.value)
                  }}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  className="grow"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                />
              </label>
            </div>
            {error !== "" && <p className="text-red-500">Error: {error}</p>}
            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
            </div>
            <div>
              <Link to="/signup">New User? SignUp</Link>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default Login
