import axios from "axios"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
//
import { removeUser } from "../utils/userSlice"
import { removeConnections } from "../utils/connectionSlice"
import { removeFeed } from "../utils/feedSlice"
import { removeAllRequests, removeRequest } from "../utils/reuqestsReceivedSlice"
import BACKEND_URL from "../utils/constant"

const NavBar = () => {
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.post(
       BACKEND_URL + "/logout",
        {},
        { withCredentials: true }
      )
      dispatch(removeConnections())
      dispatch(removeFeed())
      dispatch(removeUser())
      dispatch(removeAllRequests());
      return navigate("/welcomePage")
    } catch (error) {
      console.log("Error while logout : " + error.message)
    }
  }
  return (
    <div className="navbar bg-base-300 fixed top-0">
      <div className="flex-1">
        <Link
          to={user ? "/" : "/welcomePage"}
          className="btn btn-ghost text-xl"
        >
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
              className="menu menu-sm dropdown-content bg-base-300  rounded-box z-[10]  w-52  shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests Received</Link>
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
