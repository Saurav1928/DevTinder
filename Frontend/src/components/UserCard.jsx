import axios from "axios"
import React from "react"
import { useDispatch } from "react-redux"
import { removeUserFromFeed } from "../utils/feedSlice"
import BACKEND_URL from "../utils/constant"
//
const UserCard = ({ user, showButtonsOfCard }) => {
  const dispatch = useDispatch()
  const { firstName, lastName, about, photoUrl, gender, age, _id } = user
  const toUserId = _id

  const handleSendRequest = async (status) => {
    try {
      const res = await axios.post(
        BACKEND_URL + `/request/send/${status}/${toUserId}`,
        {},
        { withCredentials: true }
      )

      dispatch(removeUserFromFeed(toUserId))
    } catch (error) {
      console.log("Error while sending a requst : ", error)
    }
  }
  return (
    <div className="card bg-base-300 w-96 shadow-x ">
      <figure className="px-5 pt-5 ">
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
        {showButtonsOfCard && (
          <div className="card-actions mt-[-10]">
            <button
              className="btn btn-primary "
              onClick={() => handleSendRequest("ignored")}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary cursor-pointer "
              onClick={() => handleSendRequest("interested")}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserCard
