import axios from "axios"
import React from "react"
import { useDispatch } from "react-redux"
import { removeRequest } from "../utils/reuqestsReceivedSlice"
import BACKEND_URL from "../utils/constant"
import { addConnection } from "../utils/connectionSlice"

const RequestsCard = ({ requestsReceived }) => {
  const dispatch = useDispatch()

  if (!requestsReceived) return null // Handle undefined data gracefully

  const { _id } = requestsReceived
  const { firstName, lastName, about, photoUrl, gender, age } =
    requestsReceived?.fromUserId || {}

  // Utility function to truncate text to 25 words
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ")
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "..."
    }
    return text
  }

  const reviewRequest = async (status) => {
    try {
      const res = await axios.post(
        BACKEND_URL + `/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      )

      dispatch(removeRequest(_id))
      if (status === "accepted")
        dispatch(addConnection(res.data.userOfWhomReuqestIsAccepted))
    } catch (error) {
      console.error("Error while reviewing request:", error)
    }
  }

  return (
    <div className="card bg-base-100 shadow-xl p-6 flex flex-row items-center gap-6 hover:shadow-2xl transition-shadow duration-300">
      {/* Left Column: Profile Image */}
      <div className="w-20 h-20">
        <img
          src={photoUrl || "https://via.placeholder.com/150"}
          alt={`${firstName || "Unknown"} ${lastName || "User"}`}
          className="rounded-full object-cover w-full h-full"
        />
      </div>

      {/* Center Column: User Info */}
      <div className="flex-1">
        <h2 className="text-xl font-bold text-primary">
          {firstName || "Unknown"} {lastName || "User"}
        </h2>
        <p className="text-sm text-base-content opacity-80">
          {gender ? `${gender}, ${age || "N/A"} years old` : "N/A"}
        </p>
        <p className="text-sm text-base-content opacity-80 mt-2">
          {truncateText(about || "No description available.", 18)}
        </p>
      </div>

      {/* Right Column: Action Buttons */}
      <div className="flex flex-col gap-2">
        <button
          className="btn btn-success btn-sm"
          onClick={() => reviewRequest("accepted")}
        >
          Accept
        </button>
        <button
          className="btn btn-error btn-sm"
          onClick={() => reviewRequest("rejected")}
        >
          Reject
        </button>
      </div>
    </div>
  )
}

export default RequestsCard
