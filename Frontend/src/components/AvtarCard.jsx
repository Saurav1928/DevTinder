import React from "react"
import { Link } from "react-router-dom"

const AvtarCard = ({ connection }) => {
  const { firstName, lastName, about, photoUrl, _id } = connection

  return (
    <div className="flex justify-between items-center gap-4 bg-base-200 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Avatar Image */}
      <div className="flex items-center gap-5">
        <div className="avatar">
          <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={`${firstName} ${lastName}`}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-primary to-secondary text-white text-xl font-bold">
                {firstName && firstName[0]}
                {lastName && lastName[0]}
              </div>
            )}
          </div>
        </div>

        {/* Name and About Section */}
        <div>
          <h2 className="text-lg font-semibold">
            {firstName} {lastName}
          </h2>
          <p className="text-sm text-base-content opacity-80">
            {about || "No description available."}
          </p>
        </div>
      </div>
      <Link to={`/chat/${_id}`}>
        <button className="btn btn-primary btn-sm">Chat</button>
      </Link>
    </div>
  )
}

export default AvtarCard
