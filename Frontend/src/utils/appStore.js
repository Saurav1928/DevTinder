import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import feedReducer from "./feedSlice"
import connectionReducer from "./connectionSlice" // Correct reducer name
import requestsRecievedReducer from "./reuqestsReceivedSlice"
const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionReducer,
    requestsRecieved: requestsRecievedReducer,
  },
})

export default appStore
