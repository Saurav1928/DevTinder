import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { addAllConnections } from "../utils/connectionSlice"
import AvtarCard from "./AvtarCard"
import BACKEND_URL from "../utils/constant"

const Connections = () => {
  const connections = useSelector((store) => store.connections)
  const dispatch = useDispatch()

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BACKEND_URL + "/user/connections", {
        withCredentials: true,
      })
      dispatch(addAllConnections(res.data.connections))
    } catch (error) {
      console.log("Error fetching Connections: ", error)
    }
  }

  useEffect(() => {
    if (!connections) fetchConnections()
  }, [connections])

  if (connections && connections.length === 0)
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200 pt-16">
        <h1 className="text-3xl font-bold text-red-500">
          No connections found!
        </h1>
      </div>
    )

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 pt-16">
      <div className="card bg-base-100 w-full max-w-4xl shadow-xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-primary text-center">
            My Connections 🤝
          </h1>
          <div className="divider"></div>
          <div className="flex flex-col gap-4">
            {connections &&
              connections.map((connection, index) => (
                <AvtarCard key={index} connection={connection} />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Connections
