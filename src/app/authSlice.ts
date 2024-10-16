import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { authAPI, type UserType } from 'features/messageList/api/api'
// import { connectSocket } from 'features/messageList/model/chatSlice'
import { createAppAsyncThunk } from 'shared/utils/create-app-async-thunk'

const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: null as UserType | null,
    token: null as null | string,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ token: string; user: UserType }>) => {
          state.isLoggedIn = true
          state.token = action.payload.token
          state.user = action.payload.user
        }
      )
      .addCase(
        initializeApp.fulfilled,
        (state, action: PayloadAction<{ token: string; user: UserType }>) => {
          state.isLoggedIn = true
          state.token = action.payload.token
          state.user = action.payload.user
        }
      )
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false
        state.user = null
        state.token = null
      })
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectUserName: (state) => state.user?.name,
    selectUserId: (state) => state.user?.userid,
  },
})

export const initializeApp = createAppAsyncThunk<{
  token: string
  user: UserType
}>(
  `${slice.reducerPath}/initializeApp`,
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await authAPI.auth()
      console.log(response.data)
      const { user, token } = response.data

      return { token, user }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
      }
      return rejectWithValue(error.response?.data.message)
    }
  }
)

export const login = createAppAsyncThunk<
  { token: string; user: UserType },
  string
>('auth/login', async (name, { rejectWithValue }) => {
  try {
    const response = await authAPI.register(name) // Отправляем имя на бэкэнд
    console.log(response.data)
    const { token, user } = response.data // Извлекаем токен и

    return { token, user } // Возвращаем токен и пользователя
  } catch (e: any) {
    return rejectWithValue(e)
  }
})

export const logout = createAppAsyncThunk(
  'auth/logout',
  async (name, { rejectWithValue, dispatch }) => {
    try {
      await authAPI.logout()
    } catch (e: any) {
      return rejectWithValue(e)
    }
  }
)

export const authPath = slice.reducerPath
export const authReducer = slice.reducer
export const { selectIsLoggedIn, selectUserId, selectUserName } =
  slice.selectors
export const authActions = slice.actions
