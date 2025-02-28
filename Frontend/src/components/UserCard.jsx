import axios from "axios"
import React from "react"
import BACKEND_URL from "../utils/constant"
import { useDispatch } from "react-redux"
import { removeUserFromFeed } from "../utils/feedSlice"

const UserCard = ({ user }) => {
  // console.log("USER CARD : ", user)
  const dispatch = useDispatch()
  const { firstName, lastName, about, photoUrl, gender, age, _id } = user
  const toUserId = _id
  // console.log("USER ID ", _id)
  const sendRequest = async (status) => {
    try {
      const res = await axios.post(
        BACKEND_URL + `/request/send/${status}/${toUserId}`,
        {},
        { withCredentials: true }
      )
      console.log("RES : ", res.data)
      dispatch(removeUserFromFeed(toUserId))

      // console.log("REQUEST SENT to : ", firstName + " : " + status)
    } catch (error) {
      console.log("Error while sending a requst : ", error)
    }
  }
  //   console.log("USER : ", user)
  return (
    <div className="card bg-base-300 w-96 shadow-x ">
      <figure className="px-5 pt-5 ">
        {/* Fixed width and height, object-fit to maintain aspect ratio */}
        <img
          src={photoUrl}
          alt="User Image"
          className="rounded-md"
          style={{ width: "350px", height: "350px", objectFit: "cover" }}
        />
      </figure>
      <div className="card-body items-center">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>
          {gender}, {age}
        </p>
        <p>{about}</p>
        <div className="card-actions mt-[-10]">
          <button
            className="btn btn-primary "
            onClick={() => sendRequest("ignored")}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary "
            onClick={() => sendRequest("interested")}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserCard
