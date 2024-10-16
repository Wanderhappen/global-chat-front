import { createSlice, isRejected, type PayloadAction } from '@reduxjs/toolkit'
import { initializeApp, logout } from 'app/authSlice'

const slice = createSlice({
  name: 'app',
  initialState: {
    isInitialized: false,
    notifyMessage: null as null | string | number,
    error: null as null | string,
  },
  reducers: {
    addNotifyMessage: (
      state,
      action: PayloadAction<string | number | null>
    ) => {
      state.notifyMessage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeApp.fulfilled, (state) => {
        state.isInitialized = true
      })
      .addCase(logout.fulfilled, (state) => {
        state.notifyMessage = null
        state.error = null
      })
      .addMatcher(isRejected, (state, action: any) => {
        if (action.payload) {
          state.error = action.payload
        } else {
          state.error = 'Неизвестная ошибка'
        }
        console.log(state.error)
      })
  },
  selectors: {
    selectNotifyMessage: (state) => state.notifyMessage,
  },
})

export const { addNotifyMessage } = slice.actions

export const appPath = slice.reducerPath
export const appReducer = slice.reducer
export const { selectNotifyMessage } = slice.selectors
