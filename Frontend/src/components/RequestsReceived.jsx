import axios from "axios"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addRequests } from "../utils/reuqestsReceivedSlice"
import RequestsCard from "./RequestsCard"
import BACKEND_URL from "../utils/constant"

const RequestsReceived = () => {
  const requestsRecieved = useSelector((store) => store.requestsRecieved)
  const dispatch = useDispatch()

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BACKEND_URL + "/user/requests/received", {
        withCredentials: true,
      })

      dispatch(addRequests(res.data.connectionRequests))
    } catch (err) {
      console.error("Error fetching requests:", err)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  if (!requestsRecieved || (requestsRecieved && requestsRecieved.length === 0))
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <div className="card bg-base-100 shadow-xl p-8 text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">
            No Requests Found
          </h1>
          <p className="text-lg text-base-content opacity-80">
            You currently have no connection requests. Check back later!
          </p>
        </div>
      </div>
    )

  return (
    <div className="flex flex-col items-center min-h-screen bg-base-200 pt-16">
      <h1 className="text-4xl font-bold text-primary mb-8">
        Requests Received
      </h1>
      <div className="w-full max-w-4xl flex flex-col gap-6">
        {requestsRecieved.map((requestsReceived, index) => (
          <RequestsCard key={index} requestsReceived={requestsReceived} />
        ))}
      </div>
    </div>
  )
}

export default RequestsReceived