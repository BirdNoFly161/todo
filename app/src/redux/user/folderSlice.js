import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedFolder: null,
};

export const folderSlice = createSlice({
  name: "selectedFolder",
  initialState,
  reducers: {
    setSelectedFolder: (state, action) => {
      state.selectedFolder = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedFolder } = folderSlice.actions;

export default folderSlice.reducer;
