import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { logout } from 'app/authSlice'
import {
  chatApi,
  type ClientMessageType,
  type ServerMessageType,
} from 'features/messageList/api/api'
import { createAppAsyncThunk } from 'shared/utils/create-app-async-thunk'

// const initialstate = {}

// Создаем слайс
export const slice = createSlice({
  name: 'chat',
  initialState: {
    messages: [] as ClientMessageType[],
    renameMessage: {
      message: null as null | string,
      messageId: null as null | string,
    },
    typingUsers: null as null | string,
    countUsers: 1,
  },
  reducers: {
    fetchMessages: (
      state,
      action: PayloadAction<{ messages: ServerMessageType[]; userId: string }>
    ) => {
      state.messages = action.payload.messages.map((message) => ({
        ...message,
        isMyMessage: message.user.userid === action.payload.userId,
      }))
    },

    addNewMessage: (
      state,
      action: PayloadAction<{ message: ServerMessageType; token: string }>
    ) => {
      state.messages.push({
        ...action.payload.message,
        isMyMessage: action.payload.message.messageId === action.payload.token,
      })
    },

    setMessageToRename: (
      state,
      action: PayloadAction<{
        messageId: string | null
        newMessage: string | null
      }>
    ) => {
      state.renameMessage.message = action.payload.newMessage
      state.renameMessage.messageId = action.payload.messageId
    },

    renameMessage: (
      state,
      action: PayloadAction<{ message: ServerMessageType; messageId: string }>
    ) => {
      const message = state.messages.find(
        (msg) => msg.messageId === action.payload.messageId
      )
      if (message) {
        message.message = action.payload.message.message
      }
    },

    deleteMessage: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter(
        (m) => m.messageId !== action.payload
      )
    },

    notifyTyping: (state, action: PayloadAction<string>) => {
      state.typingUsers = action.payload
    },

    setCountUsers: (state, action: PayloadAction<number>) => {
      state.countUsers = action.payload
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(editMessage.fulfilled, (state) => {
        state.renameMessage.message = null
        state.renameMessage.messageId = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.messages = []
        state.renameMessage.message = null
        state.renameMessage.messageId = null
        state.typingUsers = null
      })
  },
  selectors: {
    selectMessages: (state) => state.messages,
    selectTyping: (state) => state.typingUsers,
    selectMessageToRename: (state) => state.renameMessage.message,
    selectCountUsers: (state) => state.countUsers,
  },
})

export const getMessages = createAppAsyncThunk(
  'chat/getMessages',
  async (_, { getState, rejectWithValue, dispatch }) => {
    const { token, user } = getState().auth
    if (token && user) {
      chatApi.connect()

      chatApi.fetchMessages((messages) => {
        dispatch(fetchMessages({ messages, userId: user.userid }))
      })

      chatApi.newMessageSent((message) =>
        dispatch(addNewMessage({ message, token }))
      )

      chatApi.notifyTyping((name) => {
        dispatch(notifyTyping(`${name} печатает...`))
        setTimeout(() => {
          dispatch(notifyTyping(''))
        }, 2000)
      })

      chatApi.notifyMessageEdit((arg) => {
        dispatch(renameMessage(arg))
      })

      chatApi.notifyMessageDelete((messageId) => {
        dispatch(deleteMessage(messageId))
      })

      chatApi.usersCount((count) => {
        dispatch(setCountUsers(count))
      })
    }
  }
)

export const deleteMessages = createAppAsyncThunk(
  `${slice.reducerPath}/getMessages`,
  async (_, { getState, rejectWithValue, dispatch }) => {
    chatApi.disconnect()
  }
)

export const typeMessage = createAppAsyncThunk(
  `${slice.reducerPath}/typeMessage`,
  (state, { getState, dispatch }) => {
    const token = getState().auth.token
    if (token) {
      chatApi.clientTyping(token)
    }
  }
)

export const editMessage = createAppAsyncThunk<void, string>(
  `${slice.reducerPath}/editMessage`,
  (newMessage, { getState, dispatch }) => {
    console.log('Я попал в санку')
    const messageId = getState().chat.renameMessage.messageId
    if (messageId && newMessage) {
      chatApi.clientMessageEdit({ newMessage, messageId })
    }
  }
)

export const removeMessage = createAppAsyncThunk<void, string>(
  `${slice.reducerPath}/removeMessage`,
  (messageId, { getState, dispatch }) => {
    console.log('Я попал в санку')
    chatApi.clientMessageDelete(messageId)
  }
)

export const sendMessage = createAppAsyncThunk<void, string>(
  `${slice.reducerPath}/chatInput`,
  async (text, { getState }) => {
    const token = getState().auth.token
    if (token) {
      chatApi.clientMessageSent({ token, text })
    }
  }
)

// Экспортируем редьюсеры и действия
export const {
  addNewMessage,
  fetchMessages,
  notifyTyping,
  renameMessage,
  setMessageToRename,
  deleteMessage,
  setCountUsers,
} = slice.actions
export const chatReducer = slice.reducer
export const {
  selectMessages,
  selectTyping,
  selectMessageToRename,
  selectCountUsers,
} = slice.selectors
export const chatPath = slice.reducerPath
