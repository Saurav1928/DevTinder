const express = require("express")
const requestRouter = express.Router()
const { userAuth } = require("../middlewares/auth")
const ConnectionRequest = require("../models/connectionRequest.model")
const User = require("../models/user.model")
const sendEmail = require("../utils/sendEmail")
const USER_SAFE_DATA = [
  "firstName",
  "lastName",
  "photoUrl",
  "about",
  "skills",
  "gender",
  "age",
]

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
      const toUser = await User.findOne({ _id: toUserId })
      const fromUser = req.user
      if (status === "interested") {
        const resEmail = await sendEmail.run({
          fromEmail: fromUser.emailId,
          toEmail: toUser.emailId,
          subject: "🚀 You've Got a Connection Request on DevTinder!",
          body: `Hi ${toUser.firstName},
        
        I hope you're doing well! ${fromUser.firstName} has sent you a connection request on DevMatcher (https://devmatcher.online) and would love to collaborate on exciting projects with you. 
        
        Whether you're looking to build the next big thing or share some ideas, this could be the perfect opportunity to create something amazing together. Let's connect and start innovating!
        
        Best,
        The DevTinder Team`,
        })

        // console.log("Request sent...", resEmail)
      }

      // console.log({ toUser, fromUser })
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

      connectionRequest.status = status

      const data = await connectionRequest.save()
      const fromUserId = data.fromUserId
      const userOfWhomReuqestIsAccepted = await User.findOne({
        _id: fromUserId,
      })
      // console.log("Request is accepted from ", userOfWhomReuqestIsAccepted)
      // console.log("Request is accepted by ", loggedInUser)
      const { _id, firstName, lastName, photoUrl, about, skills, gender, age } =
        userOfWhomReuqestIsAccepted
      if (status === "accepted") {
        // console.log("--------------------------------------------")
        // console.log(loggedInUser)
        // console.log(userOfWhomReuqestIsAccepted)
        // console.log("--------------------------------------------")

        const requestAccepted = await sendEmail.run({
          fromEmail: loggedInUser.emailId,
          toEmail: userOfWhomReuqestIsAccepted.emailId,
          subject: "🚀 Your Connection Request has been Accepted on DevTinder!",
          body: `Hi ${userOfWhomReuqestIsAccepted.firstName},
          I hope you're doing well! ${loggedInUser.firstName} has accepted your connection request on DevMatcher (https://devmatcher.online) and would love to collaborate on exciting projects with you. 
          Whether you're looking to build the next big thing or share some ideas, this could be the perfect opportunity to create something amazing together. \nLet's connect and start innovating!
          \nBest,
          The DevTinder Team`,
        })
        // console.log("Request Accepted...", requestAccepted)
      }
      res.json({
        message: "Connection Request " + status + " successfully!!",
        data,
        userOfWhomReuqestIsAccepted: {
          _id,
          firstName,
          lastName,
          photoUrl,
          about,
          skills,
          gender,
          age,
        },
      })
    } catch (err) {
      res.status(400).send("ERROR : " + err)
    }
  }
)
module.exports = requestRouter
