import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connections", // Match the name in store setup
  initialState: null,
  reducers: {
    addConnections: (state, action) => action.payload, // Set the payload to the state
    removeConnections: () => null,
  },
});

export const { addConnections, removeConnections } = connectionSlice.actions;
export default connectionSlice.reducer;
