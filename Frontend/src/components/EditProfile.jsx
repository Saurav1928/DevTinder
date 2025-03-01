import React, { useState } from "react"
import UserCard from "./UserCard"
import BACKEND_URL from "../utils/constant"
import axios from "axios"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"
import Toast from "./Toast"

const EditProfile = ({ user }) => {
  if (!user) return <div>No User</div>
  const [firstName, setFirstName] = useState(user.firstName || "")
  const [lastName, setLastName] = useState(user.lastName || "")
  const [about, setAbout] = useState(user.about || "")
  const [age, setAge] = useState(user.age || "")
  const [gender, setGender] = useState(user.gender || "")
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "")
  const [error, setError] = useState("")
  const [showToast, setShowToast] = useState(false)
  const dispatch = useDispatch()
  const handleSaveProfile = async () => {
    try {
      const updatedProfile = {
        firstName,
        lastName,
        about,
        age,
        gender,
        photoUrl,
      }
      const res = await axios.patch(
        BACKEND_URL + "/profile/edit",
        { firstName, lastName, about, photoUrl, gender, age },
        { withCredentials: true }
      )

      dispatch(addUser(updatedProfile))
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false)
      }, 1000)
      //   console.log("Profile Updated Successfully : ", updatedProfile)
    } catch (err) {
      console.log("Error : ", err)
      setError(err)
    }
  }

  return (
    <>
      <div className="flex justify-center gap-10 my-5 pb-20">
        <div className="flex justify-center items-center ">
          <div className="card bg-base-300 w-96 shadow-xl min-h-full flex flex-col justify-between">
            <div className="card-body">
              <div className="flex flex-col gap-5">
                <h1 className="text-center font-bold text-3xl">Edit Profile</h1>

                {/* First Name */}
                <div className="relative">
                  <label className="text-sm font-medium text-gray-600 absolute -top-3 left-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full mt-4"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>

                {/* Last Name */}
                <div className="relative">
                  <label className="text-sm font-medium text-gray-600 absolute -top-3 left-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full mt-4"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>

                {/* About */}
                <div className="relative">
                  <label className="text-sm font-medium text-gray-600 absolute -top-3 left-2">
                    About
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full mt-4"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    required
                  />
                </div>

                {/* Age */}
                <div className="relative">
                  <label className="text-sm font-medium text-gray-600 absolute -top-3 left-2">
                    Age
                  </label>
                  <input
                    type="number"
                    className="input input-bordered w-full mt-4"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                </div>

                {/* Gender */}
                <div className="relative">
                  <label className="text-sm font-medium text-gray-600 absolute -top-3 left-2">
                    Gender
                  </label>
                  <select
                    className="input input-bordered w-full mt-4"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Photo URL */}
                <div className="relative">
                  <label className="text-sm font-medium text-gray-600 absolute -top-3 left-2">
                    Photo URL
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full mt-4"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    required
                  />
                </div>

                <div className="card-actions justify-center">
                  <button
                    className="btn btn-primary mt-2"
                    onClick={handleSaveProfile}
                  >
                    Save Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, photoUrl, about, age, gender }}
          showButtonsOfCard={false}
        />
      </div>
      {showToast && <Toast />}
      {error && <div>Errror Occured while updating the profile....</div>}
    </>
  )
}

export default EditProfile
