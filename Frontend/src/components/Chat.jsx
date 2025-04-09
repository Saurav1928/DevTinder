import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { createSocketConnection } from "../utils/socket"
import { useSelector } from "react-redux"
import axios from "axios"
import BACKEND_URL from "../utils/constant"

const Chat = () => {
  const { targetUserId } = useParams()
  const loggedInUser = useSelector((store) => store.user)
  const loggedInUserId = loggedInUser?._id
  const loggedInUserFirstName = loggedInUser?.firstName

  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [targetUserName, setTargetUserName] = useState("")
  const [socket, setSocket] = useState(null)

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/chat/${targetUserId}`, {
        withCredentials: true,
      })

      const chatMessages = res?.data?.chat?.messages?.map((msg) => {
        const { senderId, text } = msg
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text: text,
          photoUrl: senderId?.photoUrl,
        }
      })

      const targetUser = res?.data?.targetUser
      setTargetUserName(targetUser?.firstName || "Unknown User")

      setMessages(chatMessages)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  useEffect(() => {
    if (!loggedInUserId) return

    // Create socket connection once
    const newSocket = createSocketConnection()
    setSocket(newSocket)

    newSocket.emit("joinChat", {
      loggedInUserId,
      targetUserId,
      loggedInUserFirstName,
    })

    newSocket.on("messageReceived", ({ firstName, text, photoUrl }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { firstName, text, photoUrl },
      ])
    })

    return () => {
      newSocket.disconnect()
    }
  }, [loggedInUserId, targetUserId])

  const sendMessage = () => {
    if (!loggedInUserId || !newMessage.trim() || !socket) return

    // Send message through socket
    socket.emit("sendMessage", {
      firstName: loggedInUserFirstName,
      loggedInUserId,
      targetUserId,
      text: newMessage,
      photoUrl: loggedInUser?.photoUrl,
    })

    // Clear input field - don't add message to local state
    // Let the socket event handle adding the message to avoid duplication
    setNewMessage("")
  }

  // Function to get initials for avatar fallback
  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="mt-24 max-w-3xl mx-auto h-[75vh] flex flex-col bg-base-300 shadow-xl rounded-lg overflow-hidden border border-base-200">
      {/* Header */}
      <div className="bg-base-200 text-base-content px-6 py-4 font-bold text-xl flex items-center">
        <span className="text-primary">Chat with</span>
        <span className="ml-2">{targetUserName}</span>
      </div>

      {/* Chat messages area */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4 bg-base-100">
        {messages.length > 0 ? (
          messages.map((msg, index) => {
            const isOwnMessage = msg.firstName === loggedInUserFirstName
            return (
              <div
                key={index}
                className={`chat ${isOwnMessage ? "chat-end" : "chat-start"}`}
              >
                <div className="chat-header">
                  {msg.firstName}
                  <time className="text-xs opacity-50 ml-2">Just now</time>
                </div>
                <div className="chat-bubble chat-bubble-primary">
                  {msg.text}
                </div>
                <div className="chat-footer opacity-50">
                  {isOwnMessage ? "Seen" : "Delivered"}
                </div>
              </div>
            )
          })
        ) : (
          <div className="text-center text-base-content opacity-60 mt-4 flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            Start the conversation 🚀
          </div>
        )}
      </div>

      {/* Message input */}
      <div className="flex items-center gap-4 px-4 py-3 bg-base-200 border-t border-base-300">
        <input
          type="text"
          className="flex-1 h-10 px-4 input input-bordered focus:ring-2 focus:ring-primary"
          placeholder="Type your message here..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="btn btn-primary"
          onClick={sendMessage}
          disabled={!newMessage.trim()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Chat