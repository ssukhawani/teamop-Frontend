import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../Slices/home/counterSlice'

export const store = configureStore({
  reducer: {
      counter:counterReducer
  },
})
