import axios from "axios"
import React, { useEffect, useState } from "react"

import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"
import BACKEND_URL from "../utils/constant"
//
const SignUp = () => {
  const user = useSelector((store) => store.user)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [emailId, setEmailId] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const [error, setError] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSignUp = async () => {
    try {
      if (firstName && lastName && emailId && password) {
        const res = await axios.post(
          BACKEND_URL + "/signup",
          {
            firstName,
            lastName,
            emailId,
            password,
          },
          { withCredentials: true }
        )

        setError("")

        dispatch(addUser(res?.data?.user))
        // console.log("Data from signup", res.data)
        navigate("/") // Redirect to homepage after successful signup
      } else {
        setError("Please fill in all fields.")
      }
    } catch (error) {
      // console.log("Error in signup", error)
      setError(error.response?.data?.error)
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user, navigate])
  return (
    !user && (
      <div>
        <div className="pt-20 flex justify-center">
          <div className="flex justify-center items-center mt-20">
            <div className="card bg-base-300 w-96 shadow-xl">
              <div className="card-body">
                <div className="flex flex-col gap-5">
                  <h1 className="text-center font-bold text-3xl">Sign Up</h1>

                  <label className="input input-bordered flex items-center gap-2">
                    <input
                      type="text"
                      className="grow"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </label>

                  <label className="input input-bordered flex items-center gap-2">
                    <input
                      type="text"
                      className="grow"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </label>

                  <label className="input input-bordered flex items-center gap-2">
                    <input
                      type="email"
                      className="grow"
                      placeholder="Email"
                      value={emailId}
                      onChange={(e) => setEmailId(e.target.value)}
                    />
                  </label>

                  {/* <label className="input input-bordered flex items-center gap-2">
                    <input
                      type="password"
                      className="grow"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </label> */}
                  <label className="input input-bordered flex items-center gap-2 justify-between">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="grow"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="cursor-pointer"
                    >
                      {showPassword ? (
                        // 👁️ Eye Open (visible)
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 3C5.5 3 1.73 6.11.5 10c1.23 3.89 5 7 9.5 7s8.27-3.11 9.5-7c-1.23-3.89-5-7-9.5-7zm0 12a5 5 0 110-10 5 5 0 010 10zm0-8a3 3 0 100 6 3 3 0 000-6z" />
                        </svg>
                      ) : (
                        // 🙈 Eye Closed (hidden)
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 4.5c-3.5 0-6.65 2.14-8 5.5 1.35 3.36 4.5 5.5 8 5.5 1.24 0 2.42-.24 3.5-.67l1.63 1.63a.75.75 0 101.06-1.06l-14-14a.75.75 0 10-1.06 1.06l2.4 2.4C2.73 6.4.92 8.04.5 10c1.23 3.89 5 7 9.5 7 1.56 0 3.03-.36 4.35-1l2.23 2.23a.75.75 0 101.06-1.06l-2.4-2.4C17.27 13.6 19.08 11.96 19.5 10c-.78-2.49-2.65-4.5-5-5.67l-1.77 1.77A5.49 5.49 0 0010 4.5zM10 13a3 3 0 01-3-3c0-.41.09-.8.25-1.15l3.9 3.9c-.34.16-.73.25-1.15.25z" />
                        </svg>
                      )}
                    </span>
                  </label>

                  <button className="btn btn-primary" onClick={handleSignUp}>
                    Sign Up
                  </button>
                  <div>
                    <Link to="/login">Already have an account? Login</Link>
                  </div>
                  {error && <div className="text-red-500">{error}</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default SignUp
