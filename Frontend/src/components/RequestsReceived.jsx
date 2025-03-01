import axios from "axios"
import React, { useEffect } from "react"

import { useDispatch, useSelector } from "react-redux"
import { addRequests } from "../utils/reuqestsReceivedSlice"
import RequestsCard from "./RequestsCard"
import BACKEND_URL from "../utils/constant"
//
const RequestsReceived = () => {
  const requestsRecieved = useSelector((store) => store.requestsRecieved)
  const dispatch = useDispatch()

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BACKEND_URL + "/user/requests/received", {
        withCredentials: true,
      })

      dispatch(addRequests(res.data.connectionRequests))
    } catch (err) {}
  }
  useEffect(() => {
    fetchRequests()
  }, [])

  if (!requestsRecieved || (requestsRecieved && requestsRecieved.length === 0))
    return (
      <div className="text-center font-bold my-10 text-2xl pt-10 ">
        No Requests found..
      </div>
    )

  return (
    requestsRecieved && (
      <div className="container mx-auto my-10 flex justify-center pt-10">
        <div className="w-full max-w-3xl flex flex-col gap-4  p-5 rounded-lg shadow-md">
          <div className="text-center text-4xl font-bold">
            Requests Received
          </div>
          {requestsRecieved &&
            requestsRecieved.map((requestsReceived, index) => (
              <RequestsCard key={index} requestsReceived={requestsReceived} />
            ))}
        </div>
      </div>
    )
  )
}

export default RequestsReceived
