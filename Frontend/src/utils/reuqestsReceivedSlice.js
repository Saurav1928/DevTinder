import { createSlice } from "@reduxjs/toolkit"

const reuqestsReceivedSlice = createSlice({
  name: "requestsRecived",
  initialState: [],
  reducers: {
    addRequests: (state, action) => action.payload,
    removeAllRequests:(state, action)=>null,
    removeRequest: (state, action) => {
      // this logic is for, so that when we click on accept or rejct thenit should be removed from list
      const newArray = state.filter((req) => req._id !== action.payload)
      return newArray
    },
  },
})
export const {addRequests, removeRequest, removeAllRequests}=reuqestsReceivedSlice.actions
export default reuqestsReceivedSlice.reducer