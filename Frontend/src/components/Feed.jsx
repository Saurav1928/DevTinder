import axios from "axios"
import React, { useEffect, useState } from "react"
import BACKEND_URL from "../utils/constant"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../utils/feedSlice"
import UserCard from "./UserCard"


const Feed = () => {
  const dispatch = useDispatch()
  const feed = useSelector((store) => store.feed)

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
        <UserCard user={feed[0]} />
      </div>
    )
  )
}

export default Feed
