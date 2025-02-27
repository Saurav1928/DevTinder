import { createSlice } from "@reduxjs/toolkit"

const reuqestsReceivedSlice= createSlice({
    name:"requestsRecived",
    initialState:null,
    reducers:{
        addRequests:(state, action)=>action.payload,
        removeRequests:()=> null
    }
})
export const {addRequests, removeRequests}=reuqestsReceivedSlice.actions
export default reuqestsReceivedSlice.reducer