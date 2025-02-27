import React from "react"

const UserCard = ({ user }) => {
//   console.log("USER : ", user)
  const { firstName, lastName, about, photoUrl, gender, age } = user
  console.log("USER from USER CARD : ", user)
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
          <button className="btn btn-primary ">Ignore</button>
          <button className="btn btn-secondary ">Interested</button>
        </div>
      </div>
    </div>
  )
}

export default UserCard
