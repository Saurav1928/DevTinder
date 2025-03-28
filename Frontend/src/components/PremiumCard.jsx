import axios from "axios"
import React from "react"
import BACKEND_URL from "../utils/constant"

const PremiumCard = ({
  planName,
  description,
  features,
  price,
  buttonText,
  buttonStyle,
  membershipType,
}) => {
  const handlePremiumBuy = async () => {
    const order = await axios.post(
      BACKEND_URL + "/payment/createOrder",
      {
        membershipType,
      },
      { withCredentials: true }
    )

    const {keyId, amount, currency, notes, receipt, status, orderId} = order.data
    const options = {
      key: keyId, // Replace with your Razorpay key_id
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: currency,
      name: "Dev Tinder",
      description: 'Connect with other developers and collaborate on exciting projects.',
      order_id: orderId, // This is the order_id created in the backend
    prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
        contact: '9999999999'
      },
      theme: {
        color: '#1182f2'
      },
    };

    const rzp= new window.Razorpay(options);
    rzp.open();
  }
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
            onClick={() => handlePremiumBuy()}
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
