import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: "",
  password: ""
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    updateState:(state,{payload}) =>{
        state.email = payload.email;
        state.password = payload.password
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateState } = loginSlice.actions;

export default loginSlice.reducer;