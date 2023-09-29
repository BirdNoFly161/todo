import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: null,
}

export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action)=>{
      state.user = action.payload;
    },
    clearUser: (state)=>{
      state.user = null;
    },
    setAuthToken: (state, action)=>{
      state.token = action.payload;
    },
    clearAuthToken: (state)=>{
      state.token = null;
    },
  },
})

// Action creators are generated for each case reducer function
//export const {} = counterSlice.actions

export default counterSlice.reducer