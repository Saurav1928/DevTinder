import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./components/Body"
import Login from "./components/Login"
import Profile from "./components/Profile"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./components/Feed"
import ErrorPage from "./components/ErrorPage"
import Connections from "./components/Connections"
import RequestsReceived from "./components/RequestsReceived"
function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<RequestsReceived />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
