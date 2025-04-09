socket.on("sendMessage", async ({ firstName, loggedInUserId, targetUserId, text }) => {
  try {
    const sender = await User.findById(loggedInUserId).select("firstName photoUrl");
    const message = {
      senderId: loggedInUserId,
      text,
    };

    // Save the message to the database (if applicable)
    const chat = await Chat.findOneAndUpdate(
      { participants: { $all: [loggedInUserId, targetUserId] } },
      { $push: { messages: message } },
      { new: true }
    );

    // Emit the message to the target user
    io.to(targetUserId).emit("messageReceived", {
      firstName: sender.firstName,
      text,
      photoUrl: sender.photoUrl, // Include the sender's photo URL
    });
  } catch (error) {
    console.error("Error sending message:", error);
  }
});