import React from "react"

const PremiumCard = ({
  planName,
  description,
  features,
  price,
  buttonText,
  buttonStyle,
  membershipType,
  handlePremiumBuy, // Receiving function from parent
}) => {
  return (
    <div className="card w-full bg-base-100 shadow-2xl transition-transform hover:scale-104 p-10 hover:border-1 border-amber-700 hover:cursor-pointer">
      <div className="card-body flex">
        <h2 className="card-title text-3xl font-bold">{planName}</h2>
        <p>{description}</p>
        <ul className="list-disc ml-5 mt-4">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
      <div>
        <div className="card-actions justify-center mt-6">
          <button
            className={`btn ${buttonStyle}`}
            onClick={() => handlePremiumBuy(membershipType)} // Passing membershipType
          >
            {buttonText}
          </button>
        </div>
        <p className="text-center mt-6 text-xl font-bold">₹{price}/month</p>
      </div>
    </div>
  )
}

export default PremiumCard
