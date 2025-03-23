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
       
        dispatch(addUser(res.data))
        navigate("/profile") // Redirect to homepage after successful signup
      } else {
        setError("Please fill in all fields.")
      }
    } catch (error) {
 
      setError("Error while signing up: " + error.message)
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

                  <label className="input input-bordered flex items-center gap-2">
                    <input
                      type="password"
                      className="grow"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
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
