import axios from "axios"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import BACKEND_URL from "../utils/constant"
import { removeUser } from "../utils/userSlice"

const NavBar = () => {
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // console.log("FirstName : ", user?.firstName)
  // console.log("NAVBAR USER:", user?.user)
  // console.log(user?.user?.firstName)
  const handleLogout = async () => {
    try {
      // console.log("Logout clivked..")
      await axios.post(BACKEND_URL + "/logout", {}, { withCredentials: true })
      dispatch(removeUser())
      return navigate("/login")
    } catch (error) {
      console.log("Error while logout : " + error.message)
    }
  }
  return (
    <div className="navbar bg-base-300 ">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          👨🏻‍💻 DevTinder
        </Link>
      </div>
      {user && (
        <div className="flex-none flex items-center gap-1">
          <div className="form-control"> </div>
          <div>Welcome, {user.firstName}</div>
          <div className="dropdown dropdown-end mx-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              {user && (
                <div className="w-10 rounded-full">
                  <img alt="User Photo" src={user.photoUrl} />
                </div>
              )}
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default NavBar
