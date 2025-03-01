import axios from 'axios'
import React from 'react'

import { useDispatch } from "react-redux"
import { removeRequest } from "../utils/reuqestsReceivedSlice"
import BACKEND_URL from "../utils/constant"
import { addConnection } from "../utils/connectionSlice"
//
const RequestsCard = ({ requestsReceived }) => {
  const dispatch = useDispatch()

  const { _id } = requestsReceived
  const { firstName, lastName, about, photoUrl } = requestsReceived.fromUserId
  const reviewRequest = async (status) => {
    try {
      const res = await axios.post(
        BACKEND_URL + `/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      )

      dispatch(removeRequest(_id))
      if (status == "accepted")
        dispatch(addConnection(res.data.userOfWhomReuqestIsAccepted))
    } catch (error) {
      console.log("Error while reviewing request : ", error)
    }
  }
  return (
    <div className="flex justify-between items-center gap-4 bg-slate-700 p-4 text-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-start items-center gap-5 w-[50%]">
        <figure className="w-16 h-16">
          <img
            src={photoUrl || "https://via.placeholder.com/150"}
            alt={`${firstName} ${lastName}`}
            className="rounded-full object-cover w-full h-full"
          />
        </figure>

        {/* Name and About Section */}
        <div>
          <h2 className="text-lg font-semibold ">
            {firstName} {lastName}
          </h2>
          <p className="text-sm ">{about || "No description available."}</p>
        </div>
      </div>
      <button
        className="btn btn-xs sm:btn-sm md:btn-sm lg:btn-md bg-green-500"
        onClick={() => reviewRequest("accepted")}
      >
        Accept
      </button>
      <button
        className="btn btn-xs sm:btn-sm md:btn-sm lg:btn-md bg-red-500"
        onClick={() => reviewRequest("rejected")}
      >
        Reject
      </button>
    </div>
  )
}

export default RequestsCard;
