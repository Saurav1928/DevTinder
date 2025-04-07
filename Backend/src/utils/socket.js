const socket = require("socket.io")


const initializeSocket = (server) => {
    const io = socket(server, {
        cors: {
          origin: "http://localhost:5173",
          credentials: true,
        },
      });
      io.on("connection", (socket)=>{
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
          socket.on("sendMessage", ({
              firstName,
              loggedInUserId,
              targetUserId,
              text
          }) => {

              const roomId = [loggedInUserId, targetUserId].sort().join("_")
              console.log("Message sent from ", firstName, " to room : ", roomId)
              console.log(firstName, ":", text)
              io.to(roomId).emit("messageReceived", {
                  firstName,
                  text
              })
          })
          socket.on("disconnect", () => { })

      })
}

module.exports = initializeSocket