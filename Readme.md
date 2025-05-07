# DevTinder

DevTinder is a full-stack platform designed to connect developers for collaboration, networking, and innovation. Users can create profiles, send/receive connection requests, chat in real-time, and upgrade to premium plans for additional features. The platform is built with a modern tech stack and focuses on providing a seamless user experience.

---

## 📑 Table of Contents

- [Project Overview](#project-overview)  
- [Features](#features)  
- [Technologies Used](#technologies-used)  
- [Folder Structure](#folder-structure)  
- [Setup Instructions](#setup-instructions)  
- [Frontend Documentation](#frontend-documentation)  
- [Backend Documentation](#backend-documentation)  
- [Environment Variables](#environment-variables)  
- [Future Enhancements](#future-enhancements)  
- [Contributing](#contributing)

---

## 🚀 Project Overview

DevTinder is a platform where developers can connect, collaborate, and grow their professional network. It combines the best of social networking and professional collaboration tools, enabling developers to find like-minded individuals for projects, mentorship, and more.

---

## ✨ Features

### Core Features

- **User Authentication:** Secure signup, login, and logout with JWT.
- **Profile Management:** Edit and view user profiles with full details.
- **Connection Requests:** Send, accept, or reject requests.
- **Real-Time Chat:** WebSocket-based messaging for instant communication.
- **Premium Membership:** Razorpay-powered payment system for premium plans.
- **Email Notifications:** AWS SES integration for sending emails.
- **Cron Jobs:** Automated reminders for pending requests.

### New Enhancements

- **WebSocket Chat:** Real-time messaging with profile previews.
- **Responsive UI:** Enhanced with TailwindCSS + DaisyUI.
- **Photo Previews in Chat:** Sender’s photo appears in chat messages.

---

## 🛠️ Technologies Used

### Frontend

- React (Vite)
- Redux Toolkit
- TailwindCSS
- DaisyUI
- Axios
- React Router

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication
- Razorpay for payments
- AWS SES for emails
- WebSocket (socket.io)
- Node-Cron

---

## 📁 Folder Structure

```bash
Frontend/
├── src/
│   ├── components/        # React UI components
│   ├── utils/             # Redux slices and constants
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── vite.config.js
└── package.json

Backend/
├── src/
│   ├── app.js             # Main Express app
│   ├── config/            # MongoDB and Razorpay config
│   ├── middlewares/       # JWT middleware
│   ├── models/            # Mongoose models (User, Chat, etc.)
│   ├── routes/            # API routes
│   ├── sockets/           # WebSocket handlers
│   └── utils/             # Razorpay, SES utilities
├── .env
├── package.json
└── .gitignore
```

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js v16+
- MongoDB
- Razorpay Account
- AWS SES Setup

### Steps

1. Clone the Repository:

```bash
git clone <repository-url>
cd DevTinder
```

2. Install Frontend Dependencies:

```bash
cd Frontend
npm install
```

3. Install Backend Dependencies:

```bash
cd ../Backend
npm install
```

4. Configure Environment Variables:

Create a `.env` file in the `Backend/` directory (see [Environment Variables](#environment-variables)).

5. Start the Backend Server:

```bash
npm run dev
```

6. Start the Frontend Server:

```bash
cd ../Frontend
npm run dev
```

7. Access the App:

Visit [http://localhost:5173](http://localhost:5173)

---

## 🌐 Frontend Documentation

### State Management (Redux Slices)

- `userSlice`: Auth state
- `feedSlice`: Suggested users
- `connectionSlice`: Active connections
- `requestsReceivedSlice`: Incoming requests

### Components

- `NavBar.jsx`: Navigation bar
- `UserCard.jsx`: Shows user info and request buttons
- `Premium.jsx`: Razorpay plans
- `EditProfile.jsx`: Profile editing form
- `RequestsReceived.jsx`: Incoming request panel
- `Chat.jsx`: Real-time chat interface

### API Example (Axios)

```js
const res = await axios.get(`${BACKEND_URL}/user/feed`, {
  withCredentials: true
});
```

---

## 🧩 Backend Documentation

### Key Features

- **JWT Auth:** Middleware `userAuth` protects routes
- **MongoDB Models:**
  - `User`: User profile info
  - `ConnectionRequest`: Sent/received requests
  - `Chat`: Message history
- **Real-Time Chat:** Via socket.io, stores messages in MongoDB
- **Payments:** Razorpay integration + webhook
- **Emails:** AWS SES integration

### Chat WebSocket Event

```js
socket.on("sendMessage", async ({ firstName, loggedInUserId, targetUserId, text }) => {
  const sender = await User.findById(loggedInUserId).select("firstName photoUrl");
  const message = { senderId: loggedInUserId, text };

  const chat = await Chat.findOneAndUpdate(
    { participants: { $all: [loggedInUserId, targetUserId] } },
    { $push: { messages: message } },
    { new: true }
  );

  io.to(targetUserId).emit("messageReceived", {
    firstName: sender.firstName,
    text,
    photoUrl: sender.photoUrl,
  });
});
```

### Chat API Endpoint

```http
GET /chat/:targetUserId
```

Returns the chat history and target user's info (first name, last name).

---

## 🔐 Environment Variables

Create a `.env` file inside the `Backend/` directory:

```env
PORT=7000
MONGO_URI=your_mongodb_uri
MY_SECRET=your_jwt_secret
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret
```

---

## 🚧 Future Enhancements

- 🔍 **Advanced Search:** Filter by skills, interests, and location.
- 📊 **Analytics Dashboard:** For premium users.
- 🌎 **Localization:** Add multi-language support.
- 📧 **Batch Emailing:** Optimize large-scale emails.
- 🎥 **Video Calls:** Enable video calling for premium members.

---

## 🤝 Contributing

Feel free to fork the repo, raise issues, or submit pull requests. Let’s build the ultimate developer network together! 🚀
