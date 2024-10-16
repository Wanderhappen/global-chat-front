// src/store.ts
import { configureStore } from '@reduxjs/toolkit'
import { appPath, appReducer } from 'app/appSlice'
import { authPath, authReducer } from 'app/authSlice'
import { chatPath, chatReducer } from 'features/messageList/model/chatSlice'

export const store = configureStore({
  reducer: {
    [appPath]: appReducer,
    [chatPath]: chatReducer,
    [authPath]: authReducer,
  },
})
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
