import { createSlice } from "@reduxjs/toolkit"

const reuqestsReceivedSlice= createSlice({
    name:"requestsRecived",
    initialState:null,
    reducers:{
        addRequests:(state, action)=>action.payload,
        removeRequest:(state, action)=> {
            // this logic is for, so that when we click on accept or rejct thenit should be removed from list
            const newArray= state.filter(req=> req._id!==action.payload) 
            return newArray
        }
    }
})
export const {addRequests, removeRequest}=reuqestsReceivedSlice.actions
export default reuqestsReceivedSlice.reducer