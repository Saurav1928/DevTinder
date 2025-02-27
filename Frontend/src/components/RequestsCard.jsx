import axios from 'axios'
import React from 'react'
import BACKEND_URL from '../utils/constant'

const RequestsCard = ({ requestsReceived }) => {
  console.log("REQ:", requestsReceived)
  const {_id}=requestsReceived
  const { firstName, lastName, about, photoUrl } = requestsReceived.fromUserId
const handleRequest= async (status)=>{
try {
    const res= await axios.post(BACKEND_URL+`/request/review/${status}/${_id}`,{}, {withCredentials:true} )
console.log("Request ", status, " successfully!!")
console.log("RES : ", res)
} catch (error) {
    console.log("Error while reviewing request : ", error)
}
}
  return (
    <div className="flex justify-between items-center gap-4 bg-slate-700 p-4 text-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Avatar Image */}
      <div className="flex justify-around items-center gap-5">
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
      <button className="btn btn-xs sm:btn-sm md:btn-sm lg:btn-md bg-green-500" onClick={()=>handleRequest("accepted")}>
        Accept 
      </button>
      <button className="btn btn-xs sm:btn-sm md:btn-sm lg:btn-md bg-red-500" onClick={()=>handleRequest("rejected")}>
        Reject 
      </button>
    </div>
  )
}

export default RequestsCard;
