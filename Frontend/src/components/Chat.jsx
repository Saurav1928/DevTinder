import React, { useState } from "react"
import { useParams } from "react-router-dom"

const Chat = () => {
  const { targetUserId } = useParams()
  //   console.log("Target User id:", targetUserId);
  const [messages, setMessages] = useState([
    { text: "Hello" },
    { text: "How are you?" },
  ])

  return (
    <div className="mt-24 max-w-3xl mx-auto h-[75vh] flex flex-col bg-gray-700 shadow-lg rounded-lg overflow-hidden border border-gray-300">
      {/* Header */}
      <div className="bg-slate-900 text-white px-6 py-4 font-bold text-xl">
        Chat with User ID: {targetUserId}
      </div>

      {/* Chat messages area */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-700">
        {/* Example messages */}
        {messages &&
          messages.map((msg, index) => (
            <div className="chat chat-start" key={index}>
              <div className="chat-header">
                Akshay Saini
                <time className="text-xs opacity-50">2 hours ago</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          ))}
      </div>

      {/* Message input */}
      <div className="flex items-center gap-4 px-6 py-4 bg-grey-800 border-t border-gray-200">
        <input
          type="text"
          className="flex-1 h-10 px-4 border rounded-lg focus:outline-none focus:ring-1  "
          placeholder="Type your message here..."
        />
        <button className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-4 py-2 rounded-lg shadow transition">
          Send
        </button>
      </div>
    </div>
  )
}

export default Chat
