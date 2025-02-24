const express = require("express")
const requestRouter = express.Router()
const { userAuth } = require("../middlewares/auth")
const ConnectionRequest = require("../models/connectionRequest.model")

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id
      const toUserId = req.params.toUserId
      const status = req.params.status
      const ALLOWED_STATUS = ["interested", "ignored"]
      if (!ALLOWED_STATUS.includes(status))
        throw new Error("Invalid Status : " + status)
      const newConnectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      })
      // checking if already existing connectionRequest..
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId: fromUserId, toUserId: toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ], // as we are finding by both id and hence we must have index on this field for faster searching...
        // hence we can have compound index for this fields -> check connectionrequestModel
      })
      if (existingConnectionRequest)
        throw new Error(`You cant sent more than one request to same person..`)
      const connectionData = await newConnectionRequest.save()
      return res.json({
        message: "Connection Request Sent Successfully!!",
        connectionData: connectionData,
      })
    } catch (err) {
      res.status(400).json({
        message: "Error Sending Connection Request..", // Fixed parentheses
        error: err.message,
      })
    }
  }
)

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user
      const { status, requestId } = req.params
      //allowed status should only be accepted or rejected
      const ALLOWED_STATUS = ["accepted", "rejected"]
      if (!ALLOWED_STATUS.includes(status))
        throw new Error("Status is Invalid!!")
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      })
      if (!connectionRequest) throw new Error("Connection Request Not Found..")
      // console.log(connectionRequest)
      connectionRequest.status = status
      // console.log(connectionRequest)
      const data = await connectionRequest.save()
      res.json({
        message: "Connection Request " + status + " successfully!!",
        data,
      })
    } catch (err) {
      res.status(400).send("ERROR : " + err)
    }
  }
)
module.exports = requestRouter
