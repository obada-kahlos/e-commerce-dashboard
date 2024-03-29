import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '../data-access/api/api.slice' // assuming you have apiSlice in apiSlice.js
import { profileImage } from '../data-access/slices/profile-image'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    profileImage,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})