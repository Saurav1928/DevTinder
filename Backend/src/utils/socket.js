const socket = require("socket.io")
const Chat = require("../models/chat.model")


const initializeSocket = (server) => {
    const io = socket(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true,
        },
    })
    io.on("connection", (socket) => {
        // handle socket events here
        socket.on("joinChat", ({ loggedInUserId, targetUserId, loggedInUserFirstName }) => {
        // chat happens inside a room and there are multiple particpants in room whome can chat with each other
        // so there must be a unique room id
        //   console.log("Logged In User : ", loggedInUserId)
        //   console.log("Target User : ", targetUserId)

            const roomId = [loggedInUserId, targetUserId].sort().join("_")// loggedInUserId_targetUserId
            console.log(loggedInUserFirstName + " Joined the room : ", roomId)

            socket.join(roomId)
        })
        socket.on("sendMessage", async ({
            firstName,
            loggedInUserId,
            targetUserId,
            text
        }) => {


            try {

                const roomId = [loggedInUserId, targetUserId].sort().join("_")
                console.log("Message sent from ", firstName, " to room : ", roomId)
                //   console.log(firstName, ":", text)
                /// save message to database
                // TODO: check if users are frnds or Not 

                // 2 cases 
                // 1. if chat exists then push message to chat
                // 2. if chat does not exists then create new chat and push message to chat
                let chat = await Chat.findOne({
                    participants: {
                        $all: [loggedInUserId, targetUserId]
                    }
                })
                if (!chat) {
                    // chat does not exist so create new chat
                    // create message object
                    chat = await Chat.create({
                        participants: [loggedInUserId, targetUserId],
                        messages: []
                    })
                }
                // now chat exists so push message to chat
                const message = {
                    senderId: loggedInUserId,
                    text: text
                }
                chat.messages.push(message)
                await chat.save()
                console.log("Message saved to database")
                // emit message to room
                io.to(roomId).emit("messageReceived", {
                    firstName,
                    text
                })
            } catch (error) {
                console.log("Error while saving message to database", error)
            }

        })
        socket.on("disconnect", () => { })

    })
}

module.exports = initializeSocket