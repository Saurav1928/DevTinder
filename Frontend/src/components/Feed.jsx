import axios from "axios"
import React, { useEffect, useState } from "react"
import BACKEND_URL from "../utils/constant"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../utils/feedSlice"
import UserCard from "./UserCard"
import { useNavigate } from "react-router-dom"

const Feed = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((store) => store.user)
  const feed = useSelector((store) => store.feed)
  console.log("USER : ", user)
  if (!user) navigate("/weclomePage")
  const getFeed = async () => {
    if (feed) return
    try {
      const res = await axios.get(BACKEND_URL + "/user/feed", {
        withCredentials: true,
      })
      // console.log("RES: ", res.data)
      dispatch(addFeed(res.data))
    } catch (error) {
      console.log("Error : ", error)
    }
  }
  useEffect(() => {
    getFeed()
  }, [])
  useEffect(() => {
    if (!user) {
      navigate("/welcomePage") // Redirect to welcome page if user is not logged in
    }
  }, [user, navigate])
  // if (feed) con
  console.log("F: ", feed)
  if (feed && feed.length === 0)
    return (
      <div className="mt-20 text-center text-4xl font-bold pt-10">
        Empty Feed
      </div>
    )
  return (
    feed && (
      <div className="flex justify-center pt-18">
        <UserCard user={feed[0]} showButtonsOfCard={true} />
      </div>
    )
  )
}

export default Feed
