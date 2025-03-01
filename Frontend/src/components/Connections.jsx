import axios from "axios";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
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
      <div className="text-center font-bold my-10 text-2xl pt-10">
        No connections found
      </div>
    )

  return (
    <div className="container mx-auto my-10 flex justify-center pt-10">
      <div className="w-full max-w-3xl flex flex-col gap-4  p-5 rounded-lg shadow-md">
        <div className="text-center text-4xl font-bold">My Connections🤝</div>
        {connections &&
          connections.map((connection, index) => (
            <AvtarCard key={index} connection={connection} />
          ))}
      </div>
    </div>
  )
}

export default Connections;
