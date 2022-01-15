import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../Slices/home/counterSlice'
import authReducer from '../Slices/login/loginSlice'


export const store = configureStore({
  reducer: {
      counter:counterReducer,
      user:authReducer,
  },
})
