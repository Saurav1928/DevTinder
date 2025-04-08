const express = require('express');
const { userAuth } = require('../middlewares/auth')
const Chat = require('../models/chat.model')
const chatRouter = express.Router();

chatRouter.get("/chat/:targetUserId", userAuth,  async (req, res) => {
const { targetUserId} = req.params
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
    if(!chat){
        // chat does not exist so create new chat
        // create message object
        chat = await Chat.create({
            participants: [loggedInUserId, targetUserId],
            messages: []
        })
        await chat.save()
        console.log("Chat created")
    }
    res.json(chat);

} catch (error) {
    console.log("Error while fetching chat", error)
    res.status(500).json({ message: "Internal server error" })
    
}
})

module.exports = chatRouter;