import axios from "axios"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../utils/feedSlice"
import UserCard from "./UserCard"
import { useNavigate } from "react-router-dom"
import BACKEND_URL from "../utils/constant"

const Feed = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((store) => store.user)
  const feed = useSelector((store) => store.feed)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const getFeed = async () => {
    if (feed && feed.length > 0) {
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      const res = await axios.get(BACKEND_URL + "/user/feed", {
        withCredentials: true,
      })
      dispatch(addFeed(res.data))
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching feed:", error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (user?.isVerified) {
      getFeed()
    } else if (user && !user.isVerified) {
      navigate("/notverified")
    }
  }, [user, navigate])

  useEffect(() => {
    if (!user) {
      navigate("/welcomePage")
    }
  }, [user, navigate])

  const handleSwipeComplete = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1)
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200 pt-16">
        <div className="card bg-base-100 shadow-xl p-8">
          <div className="flex flex-col items-center gap-4">
            <div className="loading loading-spinner loading-lg text-primary"></div>
            <p className="text-xl font-medium">Finding matches for you...</p>
          </div>
        </div>
      </div>
    )
  }

  // No users in feed
  if (!feed || feed.length === 0 || currentIndex >= feed.length) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200 pt-16">
        <div className="card bg-base-100 shadow-xl p-8">
          <h1 className="text-3xl font-bold text-primary text-center">
            No More Profiles
          </h1>
          <div className="divider"></div>
          <p className="text-center text-lg">
            You've seen all available profiles. Check back later for new
            matches!
          </p>
          <div className="flex justify-center mt-4">
            <button
              className="btn btn-primary"
              onClick={() => {
                setIsLoading(true)
                getFeed()
                setCurrentIndex(0)
              }}
            >
              Refresh Profiles
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-base-200 pt-16">
      <h1 className="text-3xl font-bold text-primary mb-8">Find Your Match</h1>
      <div className="relative w-96">
        <div className="flex justify-center">
          <UserCard
            key={feed[currentIndex]._id} // Add key for proper React rendering
            user={feed[currentIndex]}
            showButtonsOfCard={true}
            onSwipe={handleSwipeComplete}
          />
        </div>

        <div className="text-center mt-6 text-base-content opacity-80">
          <p>Swipe right if interested, left to ignore</p>
          <p className="text-sm mt-2">
            Profile {currentIndex + 1} of {feed.length}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Feed