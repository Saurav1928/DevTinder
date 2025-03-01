import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Body from "./components/Body"
import Login from "./components/Login"
import Profile from "./components/Profile"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./components/Feed"
import ErrorPage from "./components/ErrorPage"
import Connections from "./components/Connections"
import RequestsReceived from "./components/RequestsReceived"
import SingUp from "./components/SingUp"

import WelcomePage from "./components/WelcomePage"
function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/welcomePage" element={<WelcomePage />} />
            <Route path="/" element={<Feed />} />

            <Route path="/signup" element={<SingUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<RequestsReceived />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
