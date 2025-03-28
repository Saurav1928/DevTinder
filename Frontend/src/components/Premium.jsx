import React from "react";
import PremiumCard from "./PremiumCard";

const plans = [
  {
    planName: "Starter Plan",
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
    planName: "Pro Plan",
    membershipType: "pro",
    description: "Best suited for active developers aiming to expand connections.",
    features: [
      "Blue Tick Verification",
      "Chat with 2 people per day",
      "Send 30 collaboration requests per month",
      "Priority Customer Support",
    ],
    price: 500,
    buttonText: "Get Pro",
    buttonStyle: "btn-outline btn-secondary",
  },
  {
    planName: "Ultimate Plan",
    membershipType: "ultimate",
    description: "Designed for developers who want unlimited access and full potential.",
    features: [
      "Blue Tick Verification",
      "Chat with unlimited people",
      "Send unlimited collaboration requests",
      "Exclusive invites to DevTinder Events",
      "Premium Support",
    ],
    price: 1000,
    buttonText: "Get Ultimate",
    buttonStyle: "btn-secondary",
  },
];

const Premium = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-5xl font-bold text-center mb-12">
        Choose Your Premium Plan on DevTinder
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
        {plans.map((plan, index) => (
          <PremiumCard key={index} {...plan} />
        ))}
      </div>
    </div>
  );
};

export default Premium;
