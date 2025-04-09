import axios from "axios"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { removeUser } from "../utils/userSlice"
import { removeConnections } from "../utils/connectionSlice"
import { removeFeed } from "../utils/feedSlice"
import { removeAllRequests } from "../utils/reuqestsReceivedSlice"
import BACKEND_URL from "../utils/constant"

const NavBar = () => {
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.post(BACKEND_URL + "/logout", {}, { withCredentials: true })
      dispatch(removeConnections())
      dispatch(removeFeed())
      dispatch(removeUser())
      dispatch(removeAllRequests())
      return navigate("/welcomePage")
    } catch (error) {
      console.log("Error while logout : " + error.message)
    }
  }

  // Generate initials as fallback for avatar
  const getInitials = () => {
    if (!user) return ""
    return `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`
  }

  return (
    <div className="navbar bg-base-100 fixed top-0 left-0 w-full z-50 shadow-lg px-4">
      <div className="flex-1">
        <Link
          to={user ? "/" : "/welcomePage"}
          className="btn btn-ghost text-xl font-bold text-primary"
        >
          👨🏻‍💻 DevTinder
        </Link>
      </div>
      {user && (
        <div className="flex-none flex items-center gap-4">
          <div className="text-base-content font-medium hidden md:block">
            Welcome,{" "}
            <span className="text-primary font-semibold">{user.firstName}</span>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              {user && (
                <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                  {user.photoUrl ? (
                    <img
                      alt="User Photo"
                      src={user.photoUrl}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-primary to-secondary text-white font-bold">
                      {getInitials()}
                    </div>
                  )}
                </div>
              )}
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content bg-base-100 rounded-lg z-[10] w-56 shadow-lg mt-2 p-2"
            >
              <li className="menu-title font-bold px-4 pt-2 text-primary select-none">
                <span>Account</span>
              </li>
              <div className="divider my-0"></div>
              <li>
                <Link to="/profile" className="py-3 hover:bg-base-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/connections" className="py-3 hover:bg-base-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  Connections
                </Link>
              </li>
              <li>
                <Link to="/premium" className="py-3 hover:bg-base-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-amber-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Premium
                </Link>
              </li>
              <li>
                <Link to="/requests" className="py-3 hover:bg-base-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                  </svg>
                  Requests
                </Link>
              </li>
              <div className="divider my-0"></div>
              <li>
                <a
                  onClick={handleLogout}
                  className="text-error py-3 hover:bg-base-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm1 2v10h10V5H4zm4 5a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                    <path d="M11 10a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1z" />
                  </svg>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default NavBar