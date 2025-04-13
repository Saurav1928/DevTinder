import { Provider } from "react-redux"
import ProtectedRoute from "./components/ProtectedRoute"
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom"
import appStore from "./utils/appStore"
import Body from "./components/Body"
import Login from "./components/Login"
import Profile from "./components/Profile"

import Feed from "./components/Feed"

import Connections from "./components/Connections"
import RequestsReceived from "./components/RequestsReceived"
import WelcomePage from "./components/WelcomePage"
import SignUp from "./components/SignUp"
import Premium from "./components/Premium"
import Chat from "./components/Chat"
import UserNotVerified from "./components/UserNotVerified"
import PrivacyPolicy from "./components/PrivacyPolicy"
import ContactUs from "./components/ContactUs"
function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/welcomePage" element={<WelcomePage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/notverified" element={<UserNotVerified />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Feed />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/connections"
              element={
                <ProtectedRoute>
                  <Connections />
                </ProtectedRoute>
              }
            />
            <Route
              path="/premium"
              element={
                <ProtectedRoute>
                  <Premium />
                </ProtectedRoute>
              }
            />
            <Route
              path="/requests"
              element={
                <ProtectedRoute>
                  <RequestsReceived />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat/:targetUserId"
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/contact" element={<ContactUs />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
