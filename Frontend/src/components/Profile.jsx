import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import EditProfile from "./EditProfile"
import axios from "axios"
import { addUser } from "../utils/userSlice"
import BACKEND_URL from "../utils/constant"

const Profile = () => {
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(BACKEND_URL + "/profile", {
          withCredentials: true,
        })
        dispatch(addUser(res.data)) // Update Redux store with the fetched user data
      } catch (err) {
        console.error("Error fetching user data:", err)
      }
    }

    if (!user) {
      fetchUser()
    }
  }, [user, dispatch])

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <h1 className="text-3xl font-bold text-red-500">User not found!</h1>
      </div>
    )
  }

  const toggleEditMode = () => {
    setIsEditing(!isEditing)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 pt-16">
      <div className="card bg-base-100 w-full max-w-4xl shadow-xl">
        <div className="card-body">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-primary">
              {isEditing ? "Edit Profile" : "My Profile"}
            </h1>
            <button
              className={`btn ${
                isEditing ? "btn-outline btn-secondary" : "btn-primary"
              }`}
              onClick={toggleEditMode}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>
          <div className="divider"></div>
          {isEditing ? (
            <EditProfile user={user} onSave={() => setIsEditing(false)} />
          ) : (
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Picture with improved styling */}
              <div className="flex flex-col items-center gap-4">
                <div className="avatar">
                  <div className="w-40 h-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4 shadow-lg overflow-hidden">
                    {user.photoUrl ? (
                      <img
                        src={user.photoUrl}
                        alt="User Avatar"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-primary to-secondary text-white text-4xl font-bold">
                        {user.firstName && user.firstName[0]}
                        {user.lastName && user.lastName[0]}
                      </div>
                    )}
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-center">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-primary font-medium">{user.emailId}</p>
              </div>

              {/* User Details with improved styling */}
              <div className="flex-grow bg-base-200 rounded-lg p-6 shadow-md">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-primary mb-3 flex items-center">
                    <span className="mr-2">About Me</span>
                    <div className="h-1 flex-grow bg-primary opacity-30 rounded"></div>
                  </h3>
                  <p className="text-base-content text-lg leading-relaxed">
                    {user.about || "No bio available."}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-3 flex items-center">
                    <span className="mr-2">Details</span>
                    <div className="h-1 flex-grow bg-primary opacity-30 rounded"></div>
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-lg">
                      <span className="font-semibold w-28">Gender:</span>
                      <span className="text-base-content">
                        {user.gender || "Not specified"}
                      </span>
                    </li>
                    <li className="flex items-center text-lg">
                      <span className="font-semibold w-28">Age:</span>
                      <span className="text-base-content">
                        {user.age || "Not specified"}
                      </span>
                    </li>
                    <li className="flex items-center text-lg">
                      <span className="font-semibold w-28">Membership:</span>
                      <span
                        className={`${
                          user.isPremium
                            ? "text-amber-500 font-medium"
                            : "text-base-content"
                        }`}
                      >
                        {user.isPremium ? "Premium" : "Basic"}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
