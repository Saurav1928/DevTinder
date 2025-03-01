import React from "react";

const AvtarCard = ({ connection }) => {
  const { firstName, lastName, about, photoUrl } = connection;

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
    <button className="btn btn-xs sm:btn-sm md:btn-sm lg:btn-md bg-slate-900">Chat</button>
     </div>
  );
};

export default AvtarCard;
