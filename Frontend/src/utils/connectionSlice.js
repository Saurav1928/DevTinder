import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connections",
  initialState: null, // State starts as null
  reducers: {
    addAllConnections: (state, action) => action.payload, // Handles setting multiple connections
    addConnection: (state, action) => {
      if (!state) {
        state = [] // Initialize state as an empty array if it's null
      }
      state.push(action.payload) // Add the new connection
      return state
    },
    removeConnections: () => null, // Reset state to null when removing connections
  },
})

export const { addAllConnections, removeConnections, addConnection } =
  connectionSlice.actions
export default connectionSlice.reducer;
