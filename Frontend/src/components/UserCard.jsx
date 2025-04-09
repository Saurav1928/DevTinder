import React, { useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { removeUserFromFeed } from "../utils/feedSlice"
import BACKEND_URL from "../utils/constant"
import { motion, useMotionValue, useTransform } from "framer-motion"

const UserCard = ({ user, showButtonsOfCard, onSwipe }) => {
  const dispatch = useDispatch()
  const { firstName, lastName, about, photoUrl, gender, age, _id } = user
  const toUserId = _id
  const [isAnimating, setIsAnimating] = useState(false)

  // For swipe functionality
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-30, 30])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])

  const background = useTransform(
    x,
    [-150, -75, 0, 75, 150], // Adjusted range for earlier color effect
    [
      "rgba(239, 68, 68, 0.6)",
      "rgba(239, 68, 68, 0.3)",
      "rgba(255, 255, 255, 0)",
      "rgba(16, 185, 129, 0.3)",
      "rgba(16, 185, 129, 0.6)",
    ]
  )
  const handleSendRequest = async (status) => {
    try {
      setIsAnimating(true)

      await axios.post(
        BACKEND_URL + `/request/send/${status}/${toUserId}`,
        {},
        { withCredentials: true }
      )

      dispatch(removeUserFromFeed(toUserId))

      // Add a slight delay before calling onSwipe to allow animation to complete
      setTimeout(() => {
        if (onSwipe) onSwipe()
        setIsAnimating(false)
      }, 300)
    } catch (error) {
      console.log("Error while sending a request: ", error)
      setIsAnimating(false)
    }
  }

  const handleDragEnd = (event, info) => {
    if (isAnimating) return

    if (info.offset.x > 100) {
      // Swiped right - Interested
      handleSendRequest("interested")
    } else if (info.offset.x < -100) {
      // Swiped left - Ignore
      handleSendRequest("ignored")
    }
  }

  const handleManualSwipe = (direction) => {
    if (isAnimating) return

    if (direction === "right") {
      x.set(200)
      handleSendRequest("interested")
    } else {
      x.set(-200) //
      handleSendRequest("ignored")
    }
  }

  return (
    <motion.div
      className="card bg-base-100 w-96 shadow-xl relative overflow-hidden"
      style={{ background, opacity, x, rotate }}
      animate={
        isAnimating
          ? x.get() > 0
            ? { x: 500, opacity: 0 }
            : { x: -500, opacity: 0 }
          : { x: 0, opacity: 1 }
      }
      transition={{ duration: 0.8 }}
      drag={!isAnimating ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: "grabbing" }}
    >
      {/* Swipe indicators */}
      <div
        className="absolute top-1/2 left-6 -translate-y-1/2 z-10 bg-red-500 text-white p-3 rounded-full opacity-0 transition-opacity duration-1000"
        style={{ opacity: x.get() < -50 ? Math.abs(x.get()) / 100 : 0 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>

      <div
        className="absolute top-1/2 right-6 -translate-y-1/2 z-10 bg-green-500 text-white p-3 rounded-full opacity-0 transition-opacity duration-1000"
        style={{ opacity: x.get() > 50 ? x.get() / 100 : 0 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <figure className="px-5 pt-5">
        <div className="w-full h-80 overflow-hidden rounded-md">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={`${firstName} ${lastName}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-primary to-secondary text-white text-4xl font-bold">
              {firstName && firstName[0]}
              {lastName && lastName[0]}
            </div>
          )}
        </div>
      </figure>

      <div className="card-body">
        <h2 className="card-title text-2xl">
          {firstName} {lastName}, {age}
        </h2>
        <p className="text-base-content opacity-80">{gender}</p>
        <p className="text-base-content">
          {about || "No description available."}
        </p>

        {showButtonsOfCard && (
          <div className="card-actions justify-between mt-4">
            <button
              className="btn btn-outline btn-error btn-circle btn-lg"
              onClick={() => handleManualSwipe("left")}
              disabled={isAnimating}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <button
              className="btn btn-outline btn-success btn-circle btn-lg"
              onClick={() => handleManualSwipe("right")}
              disabled={isAnimating}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default UserCard
