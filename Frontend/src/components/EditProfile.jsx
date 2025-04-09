import React, { useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"
import BACKEND_URL from "../utils/constant"
import { useNavigate } from "react-router-dom"

const EditProfile = ({ user, onSave }) => {
  const [firstName, setFirstName] = useState(user.firstName || "")
  const [lastName, setLastName] = useState(user.lastName || "")
  const [about, setAbout] = useState(user.about || "")
  const [age, setAge] = useState(user.age || "")
  const [gender, setGender] = useState(user.gender || "")
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "")
  const [popupMessage, setPopupMessage] = useState("")
  const [popupType, setPopupType] = useState("") // "success" or "error"
  const [fieldErrors, setFieldErrors] = useState({}) // To track errors for individual fields
  const [error, setError] = useState("") // To track API errors
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSaveProfile = async () => {
    const errors = {}
    if (!firstName.trim()) errors.firstName = "First name is required."
    if (!lastName.trim()) errors.lastName = "Last name is required."
    if (!age || age <= 0) errors.age = "Please enter a valid age."
    if (!gender) errors.gender = "Please select a gender."

    setFieldErrors(errors)

    if (Object.keys(errors).length > 0) {
      setPopupMessage("Please fix the errors before saving.")
      setPopupType("error")
      setTimeout(() => setPopupMessage(""), 2000)
      return
    }

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
        updatedProfile,
        { withCredentials: true }
      )

      // Fixed: Check for response structure and extract user data
      const userData = res.data.data || res.data
      dispatch(addUser(userData))

      setPopupMessage("Profile updated successfully!")
      setPopupType("success")
      setError("") // Clear any previous API errors
      setTimeout(() => {
        setPopupMessage("")
        onSave() // Notify parent component to toggle editing mode
      }, 2000)
    } catch (err) {
      console.error("Error updating profile:", err)
      setError(err.response?.data?.error || "An error occurred.") // Set the error message
      setPopupMessage("") // Clear any previous popup messages
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label">First Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {fieldErrors.firstName && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors.firstName}</p>
          )}
        </div>
        <div>
          <label className="label">Last Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {fieldErrors.lastName && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors.lastName}</p>
          )}
        </div>
        <div>
          <label className="label">About</label>
          <textarea
            className="textarea textarea-bordered w-full"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>
        <div>
          <label className="label">Age</label>
          <input
            type="number"
            className="input input-bordered w-full"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          {fieldErrors.age && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors.age}</p>
          )}
        </div>
        <div>
          <label className="label">Gender</label>
          <select
            className="select select-bordered w-full"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {fieldErrors.gender && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors.gender}</p>
          )}
        </div>
        <div>
          <label className="label">Photo URL</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-between items-center mt-1">
        {error && (
          <p className="text-red-500 text-sm mr-4 whitespace-nowrap">{error}</p>
        )}
        <button className="btn btn-primary ml-auto" onClick={handleSaveProfile}>
          Save Changes
        </button>
      </div>

      {/* Popup Notification */}
      {popupMessage && (
        <div className="toast toast-top toast-center fixed top-5 z-50">
          <div
            className={`alert ${
              popupType === "success" ? "alert-success" : "alert-error"
            } shadow-lg`}
          >
            <div>
              <span className="text-lg">
                {popupType === "success" ? "✔️" : "❌"}
              </span>
              <span>{popupMessage}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditProfile
