import axios from "axios"
import React, { useEffect, useState } from "react"
import BACKEND_URL from "../utils/constant"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../utils/feedSlice"
import UserCard from "./UserCard"

const Feed = () => {
  const dispatch = useDispatch()
  const feed = useSelector((store) => store.feed)
  if (feed) console.log("0th FEED :  ", feed[0])
  const getFeed = async () => {
    if (feed) return
    try {
      const res = await axios.get(BACKEND_URL + "/user/feed", {
        withCredentials: true,
      })
      dispatch(addFeed(res.data))
    } catch (error) {
      console.log("Error : ", error)
    }
  }
  useEffect(() => {
    getFeed()
    if (feed) console.log("0th FEED :  ", feed[0])
  }, [])
  return (
    feed && (
      <div className="flex justify-center">
        <UserCard user={feed[0]} />
      </div>
    )
  )
}

export default Feed
