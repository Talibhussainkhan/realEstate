import { configureStore } from '@reduxjs/toolkit'
import  userReducer  from './userSlice/userSlice'

export const store = configureStore({
  reducer: {
    user : userReducer
  },
  // not show any error on browser
  middleware : (getDefaultMiddleware)=>
    getDefaultMiddleware({
        serializableCheck : false,
    }),
})