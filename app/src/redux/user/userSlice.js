import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
}

export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
})

// Action creators are generated for each case reducer function
//export const {} = counterSlice.actions

export default counterSlice.reducer