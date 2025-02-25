const express = require("express")
const { userAuth } = require("../middlewares/auth")
const ConnectionRequest = require("../models/connectionRequest.model")
const userRouter = express.Router()
const USER_SAFE_DATA = ["firstName", "lastName", "photoUrl", "about", "skills"]
const User = require("../models/user.model")
// get all the received pending interested requests of loggedIn user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA)
    if (connectionRequests.length == 0)
      res.json({ message: "No Request Found.." })
    else res.json({ message: "Requests found", connectionRequests })
  } catch (error) {
    res.json({ message: "Error : ", error })
  }
})

// /user/requests/accepted -> to get all the status = accepted connections..
userRouter.get("/user/requests/accepted", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user
    const acceptedConnections = await ConnectionRequest.find({
      $or: [{ toUserId: loggedInUser._id }, { fromUserId: loggedInUser._id }],
      status: "accepted",
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA)
    const data = acceptedConnections.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString())
        return row.toUserId
      return row.fromUserId
    })
    res.json({
      message: "All Accepted Connections Found...",
      data,
    })
  } catch (error) {
    res.json({ message: "Error : ", error })
  }
})

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    /*
       logged in user should be able to see all the users except
      - himself
      - users who has already sent a request to loggedInUser (interseted, rejected, accepted, ignored) or loggedInUser has sent a connection request to user
      ----------------------------------------------------- APPROACH ----------------------------------------------------------
      - loop over all the connections and add all the toUser and fromUser where (toUser=loggedInUser or fromUser=loggedInUser)
      - use set to store all the connections id to avoid duplicate

    */
    const loggedInUser = req.user
    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    })
    const usersWhomLoggedInUserWantToHide = new Set()
    connectionRequests.forEach((req) => {
      usersWhomLoggedInUserWantToHide.add(req.fromUserId.toString())
      usersWhomLoggedInUserWantToHide.add(req.toUserId.toString())
    })
    const feed = await User.find({
      _id: { $nin: Array.from(usersWhomLoggedInUserWantToHide) },
    }).select(USER_SAFE_DATA)
    res.json(feed)
  } catch (error) {
    res.status(400).send("ERROR:" + error)
  }
})
module.exports = { userRouter }
