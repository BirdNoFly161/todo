import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  token: null,
  loading: false,
};

export const userSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearUser: (state) => {
      state.currentUser = null;
    },
    setAuthToken: (state, action) => {
      state.token = action.payload;
    },
    clearAuthToken: (state) => {
      state.token = null;
    },
    setLoadingUser: (state, action) =>{
      state.loading = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setUser, clearUser, setAuthToken, clearAuthToken, setLoadingUser } =
  userSlice.actions;

export default userSlice.reducer;
