const express = require("express")
const { userAuth } = require("../middlewares/auth")
const ConnectionRequest = require("../models/connectionRequest.model")
const userRouter = express.Router()
const PUBLIC_SAFE_DATA=["firstName", "lastName", "photoUrl", "about", "skills"];
// get all the received pending interested requests of loggedIn user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", PUBLIC_SAFE_DATA)
    if (connectionRequests.length == 0)
      res.json({ message: "No Request Found.." })
    else res.json({ message: "Requests found", connectionRequests })
  } catch (error) {
    res.json({ message: "Error : ", error })
  }
})

// /user/requests/accepted -> to get all the status = accepted connections..
userRouter.get("/user/requests/accepted", userAuth, async (req, res)=>{
    try {
        const loggedInUser=req.user
        const acceptedConnections=await ConnectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id},
                {fromUserId:loggedInUser._id}
            ],
            status:"accepted"
        }).populate("fromUserId", PUBLIC_SAFE_DATA).populate("toUserId", PUBLIC_SAFE_DATA)
        const data= acceptedConnections.map((row)=>{
            if(row.fromUserId._id.toString()===loggedInUser._id.toString())
                return row.toUserId;
            return row.fromUserId;
        })
        res.json({
            message :"All Accepted Connections Found...", data
        })
    } catch (error) {
        res.json({ message: "Error : ", error })
      }
})
module.exports = { userRouter }
