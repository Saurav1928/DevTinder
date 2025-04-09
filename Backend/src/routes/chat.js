const express = require('express');
const { userAuth } = require('../middlewares/auth')
const Chat = require('../models/chat.model')
const User = require('../models/user.model') // Import User model
const chatRouter = express.Router();

chatRouter.get("/chat/:targetUserId", userAuth, async (req, res) => {
    const { targetUserId } = req.params
    const loggedInUserId = req.user._id
    try {
    let chat = await Chat.findOne({
        participants: {
            $all: [loggedInUserId, targetUserId]
        }
    }).populate({
        path: "messages.senderId",
        select: "firstName lastName photoUrl"
    });

      if (!chat) {
          // Chat does not exist, so create a new chat
          chat = await Chat.create({
              participants: [loggedInUserId, targetUserId],
              messages: []
      })
        await chat.save();
    }

      // Fetch target user's details
      const targetUser = await User.findById(targetUserId).select("firstName lastName")
      res.json({ chat, targetUser }) // Include targetUser in the response
  } catch (error) {
      console.log("Error while fetching chat", error)
      res.status(500).json({ message: "Internal server error" })
  }
});

module.exports = chatRouter;