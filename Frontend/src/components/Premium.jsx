import React, { useEffect, useState } from "react"
import axios from "axios"
import BACKEND_URL from "../utils/constant"

const plans = [
  {
    planName: "Starters",
    membershipType: "starters",
    description: "For developers just starting to connect and collaborate.",
    features: [
      "Blue Tick Verification",
      "Chat with 5 people per day",
      "Send 10 collaboration requests per month",
    ],
    price: 300,
    buttonText: "Get Starter",
    buttonStyle: "btn-outline btn-primary",
  },
  {
    planName: "Pro",
    membershipType: "pro",
    description:
      "Best suited for active developers aiming to expand connections.",
    features: [
      "Blue Tick Verification",
      "Chat with 2 people per day",
      "Send 30 collaboration requests per month",
    ],
    price: 500,
    buttonText: "Get Pro",
    buttonStyle: "btn-outline btn-secondary",
  },
  {
    planName: "Ultimate",
    membershipType: "ultimate",
    description:
      "Designed for developers who want unlimited access and full potential.",
    features: [
      "Blue Tick Verification",
      "Chat with unlimited people",
      "Premium Support",
    ],
    price: 1000,
    buttonText: "Get Ultimate",
    buttonStyle: "btn-secondary",
  },
]

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false)

  useEffect(() => {
    verifyPremium()
  }, [])

  const verifyPremium = async () => {
    try {
      const res = await axios.get(BACKEND_URL + "/premium/verify", {
        withCredentials: true,
      })
      setIsUserPremium(res?.data?.isPremium)
    } catch (error) {
      console.error("Error verifying premium status:", error)
    }
  }

  const handlePremiumBuy = async (membershipType) => {
    try {
      const order = await axios.post(
        BACKEND_URL + "/payment/createOrder",
        { membershipType },
        { withCredentials: true }
      )

      const { keyId, amount, currency, notes, receipt, status, orderId } =
        order.data

      const options = {
        key: keyId,
        amount: amount,
        currency: currency,
        name: "Dev Tinder",
        description:
          "Connect with other developers and collaborate on exciting projects.",
        order_id: orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
          contact: "935622590",
        },
        theme: {
          color: "#1182f2",
        },
        handler: verifyPremium,
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (error) {
      console.error("Error creating order:", error)
    }
  }

  return isUserPremium ? (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <div className="card bg-base-100 shadow-xl p-8 text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">
          You are already a Premium User!
        </h1>
        <p className="text-lg text-base-content opacity-80">
          Enjoy all the exclusive features and benefits of your premium plan.
        </p>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <h1 className="text-5xl font-bold text-primary mb-12">
        Choose Your Premium Plan
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300 flex flex-col"
          >
            <h2 className="text-2xl font-bold text-primary mb-4">
              {plan.planName}
            </h2>
            <p className="text-base-content opacity-80 mb-4">
              {plan.description}
            </p>
            <ul className="list-disc list-inside text-base-content opacity-80 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <div className="flex justify-between items-center mt-auto">
              <p className="text-2xl font-bold text-secondary">₹{plan.price}</p>
              <button
                className={`btn ${plan.buttonStyle}`}
                onClick={() => handlePremiumBuy(plan.membershipType)}
              >
                {plan.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Premium
