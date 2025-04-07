import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { createSocketConnection } from "../utils/socket"
import { useSelector } from "react-redux"

const Chat = () => {
  const { targetUserId } = useParams()
  const loggedInUser = useSelector((store) => store.user)
  const loggedInUserId = loggedInUser?._id
  const loggedInUserFirstName = loggedInUser?.firstName

  //   console.log("Target User id:", targetUserId);
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    if (!loggedInUserId) return
    // as soon as page loads, the socket connection is made and join chat event is emmitted
    const socket = createSocketConnection()
    socket.emit("joinChat", {
      loggedInUserId,
      targetUserId,
      loggedInUserFirstName,
    })
    // socket.on("messageReceived", ({ firstName, text }) => {
    //   console.log("Message received from ", firstName, " : ", text)
    //   // setMessages((prevMessages) => [...prevMessages, { text }])
    //   setMessages([...messages, { firstName, text }])
    //   // i am unable to see below console log messages in the console
    //   console.log("messages", messages)
    //   console.log("ENd")
    // })
    socket.on("messageReceived", ({ firstName, text }) => {
      console.log("Message received from ", firstName, " : ", text)

      setMessages((prevMessages) => {
        const updated = [...prevMessages, { firstName, text }]
        console.log("Updated messages", updated)
        setNewMessage("") // Clear the input field after sending the message
        return updated
      })
    })

    // VERY VERY IMP : disconnects the socket connection , otherwis
    return () => {
      socket.disconnect()
    }
  }, [loggedInUserId, targetUserId])

  const sendMessage = () => {
    if (!loggedInUserId) return
    const socket = createSocketConnection()
    socket.emit("sendMessage", {
      firstName: loggedInUserFirstName,
      loggedInUserId,
      targetUserId,
      text: newMessage,
    })
  }
  return (
    <div className="mt-24 max-w-3xl mx-auto h-[75vh] flex flex-col bg-gray-700 shadow-lg rounded-lg overflow-hidden border border-gray-300">
      {/* Header */}
      <div className="bg-slate-900 text-white px-6 py-4 font-bold text-xl">
        Chat with User ID: {targetUserId}
      </div>

      {/* Chat messages area */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-700">
        {messages.length > 0 ? (
          messages.map((msg, index) => {
            const isOwnMessage = msg.firstName === loggedInUserFirstName
            return (
              <div
                key={index}
                className={`chat ${isOwnMessage ? "chat-end" : "chat-start"}`}
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="User avatar"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {msg.firstName}
                  <time className="text-xs opacity-50 ml-2">Just now</time>
                </div>
                <div className="chat-bubble">{msg.text}</div>
                <div className="chat-footer opacity-50">
                  {isOwnMessage ? "Seen" : "Delivered"}
                </div>
              </div>
            )
          })
        ) : (
          <div className="text-center text-gray-300 mt-4">
            Start the conversation 🚀
          </div>
        )}
      </div>

      {/* Message input */}
      <div className="flex items-center gap-4 px-6 py-4 bg-grey-800 border-t border-gray-200">
        <input
          type="text"
          className="flex-1 h-10 px-4 border rounded-lg focus:outline-none focus:ring-1  "
          placeholder="Type your message here..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-4 py-2 rounded-lg shadow transition"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default Chat
