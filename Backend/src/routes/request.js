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
        ],
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
module.exports = requestRouter
