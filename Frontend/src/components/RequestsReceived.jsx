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
      <div className="flex justify-center pt-20 bg-base-200 min-h-screen">
        <div className="card bg-base-100 shadow-xl p-8 text-center w-full max-w-4xl">
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
    <div className="flex justify-center pt-20 bg-base-200 min-h-screen">
      <div className="card bg-base-100 w-full max-w-4xl shadow-xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-primary text-center">
            Requests Received
          </h1>
          <div className="divider"></div>
          <div className="flex flex-col gap-4">
            {requestsRecieved.map((requestsReceived, index) => (
              <RequestsCard key={index} requestsReceived={requestsReceived} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RequestsReceived