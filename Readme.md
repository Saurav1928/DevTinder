# DevTinder

DevTinder is a platform designed to connect developers for collaboration and networking. Users can create profiles, send/receive connection requests, and upgrade to premium plans for additional features.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Setup Instructions](#setup-instructions)
- [Frontend Documentation](#frontend-documentation)
- [Backend Documentation](#backend-documentation)
- [Environment Variables](#environment-variables)
- [Future Enhancements](#future-enhancements)

---

## Project Overview
DevTinder is a full-stack application that connects developers worldwide. It includes features like user authentication, profile management, connection requests, and premium membership plans with Razorpay integration.

---

## Features
- **User Authentication**: Signup, login, and logout functionality.
- **Profile Management**: Edit and view user profiles.
- **Connection Requests**: Send, accept, or reject connection requests.
- **Premium Membership**: Upgrade to premium plans with Razorpay integration.
- **Email Notifications**: AWS SES integration for email notifications.
- **Cron Jobs**: Automated reminders for pending connection requests.

---

## Technologies Used

### Frontend
- React (with Vite)
- Redux Toolkit (State Management)
- TailwindCSS (Styling)
- DaisyUI (UI Components)
- Axios (HTTP Requests)

### Backend
- Node.js (Runtime)
- Express.js (Web Framework)
- MongoDB (Database)
- Razorpay (Payment Gateway)
- AWS SES (Email Service)
- JWT (Authentication)
- Node-Cron (Scheduled Jobs)

---

## Folder Structure

### Frontend
```
Frontend/
├── src/
│   ├── components/       # React components
│   ├── utils/            # Redux slices and constants
│   ├── App.jsx           # Main App component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── vite.config.js        # Vite configuration
└── package.json          # Dependencies and scripts
```

### Backend
```
Backend/
├── src/
│   ├── app.js            # Main server file
│   ├── config/           # Database configuration
│   ├── middlewares/      # Authentication middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── utils/            # Utility functions (e.g., Razorpay, SES)
├── .env                  # Environment variables
├── package.json          # Dependencies and scripts
└── .gitignore            # Ignored files
```

---

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB
- Razorpay Account
- AWS SES Setup

### Steps
1. **Clone the Repository:**
```bash
git clone <repository-url>
cd DevTinder
```

2. **Install Frontend Dependencies:**
```bash
cd Frontend
npm install
```

3. **Install Backend Dependencies:**
```bash
cd ../Backend
npm install
```

4. **Configure Environment Variables:**
Create a `.env` file in the `Backend/` directory and add the required variables (see [Environment Variables](#environment-variables)).

5. **Start the Backend Server:**
```bash
npm run dev
```

6. **Start the Frontend Server:**
```bash
cd ../Frontend
npm run dev
```

7. **Access the App:**
Navigate to [http://localhost:5173](http://localhost:5173)

---

## Frontend Documentation

### Key Features
- **State Management:** Redux Toolkit for managing user, feed, and connection state.
  - `userSlice`: Manages user authentication state.
  - `feedSlice`: Handles the user feed.
  - `connectionSlice`: Manages user connections.
  - `requestsReceivedSlice`: Handles received connection requests.

- **Routing:** React Router for navigating between pages (Feed, Profile, Premium, etc).

- **Styling:** TailwindCSS + DaisyUI for a responsive, modern UI.

### Components
- `NavBar.jsx`: Navigation bar with links to different pages.
- `UserCard.jsx`: Displays user info and request options.
- `Premium.jsx`: Premium plans with Razorpay integration.
- `EditProfile.jsx`: Allows editing user profile.
- `RequestsReceived.jsx`: Displays connection requests received.

### API Integration
Using Axios for HTTP requests.
Example:
```js
const res = await axios.get(BACKEND_URL + "/user/feed", { withCredentials: true });
```

---

## Backend Documentation

### Key Features
- **Authentication:** JWT-based authentication using cookies. Middleware `userAuth` protects routes.
- **Database:** MongoDB with Mongoose models.
  - `User`: Stores user details.
  - `ConnectionRequest`: Manages requests.
  - `Payment`: Tracks premium memberships.
- **Payments:** Razorpay integration for handling payments.
- **Webhooks:** Razorpay webhook for payment event handling.
- **Email Notifications:** AWS SES for sending email notifications.
- **Cron Jobs:** Daily reminders for pending requests using `node-cron`.

### API Endpoints
#### Authentication
- `POST /signup`: User signup
- `POST /login`: User login
- `POST /logout`: User logout

#### Profile
- `GET /profile/view`: View profile
- `PATCH /profile/edit`: Edit profile
- `PATCH /profile/forgetPassword`: Update password

#### Connections
- `GET /user/feed`: Get user feed
- `GET /user/requests/received`: Get received requests
- `GET /user/connections`: Get accepted connections
- `POST /request/send/:status/:toUserId`: Send request
- `POST /request/review/:status/:requestId`: Review request

#### Payments
- `POST /payment/createOrder`: Create Razorpay order
- `POST /payment/webhook`: Razorpay webhook
- `GET /premium/verify`: Verify premium status

---

## Environment Variables
Create a `.env` file in `Backend/` directory with:
```env
PORT=7000
MONGO_URI=<your-mongodb-uri>
MY_SECRET=<your-jwt-secret>
AWS_ACCESS_KEY_ID=<your-aws-access-key>
AWS_SECRET_ACCESS_KEY=<your-aws-secret-key>
RAZORPAY_KEY_ID=<your-razorpay-key-id>
RAZORPAY_KEY_SECRET=<your-razorpay-key-secret>
RAZORPAY_WEBHOOK_SECRET=<your-razorpay-webhook-secret>
```

---

## Future Enhancements
- **Real-Time Chat:** Add WebSocket-based chat.
- **Advanced Search:** Filter and sort developer connections.
- **Analytics:** Dashboard and usage stats for premium users.
- **Localization:** Multi-language support.
- **Batch Emailing:** Optimize bulk email notifications for large user bases.

---

Feel free to contribute and raise issues or PRs. Happy coding! 🚀