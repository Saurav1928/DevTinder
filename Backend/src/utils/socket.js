const socket = require("socket.io")


const initializeSocket = (socket) => {
    const io = socket(server, {
        cors: {
          origin: "http://localhost:5173",
          credentials: true,
        },
      });
      io.on("connection", (socket)=>{
        // handle socket events here
      })
}

module.exports = initializeSocket