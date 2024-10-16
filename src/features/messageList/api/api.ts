// import { io, Socket } from 'socket.io-client'
//
import axios from 'axios'
import { io, Socket } from 'socket.io-client'

const socketUrl = 'https://chat-y607.onrender.com'

export const chatApi = {
  socket: null as null | Socket,

  connect() {
    if (chatApi.socket === null) {
      chatApi.socket = io(socketUrl)
    }
  },

  fetchMessages: (callback: (messages: ServerMessageType[]) => void) => {
    chatApi.socket?.on('all-messages', callback)
  },

  newMessageSent: (callback: (message: ServerMessageType) => void) => {
    chatApi.socket?.on('new-message', callback)
  },

  notifyTyping(callback: (name: string) => void) {
    chatApi.socket?.on('notify-typing', callback)
  },

  notifyMessageEdit(
    callback: (arg: { message: ServerMessageType; messageId: string }) => void
  ) {
    chatApi.socket?.on('message-updated', callback)
  },

  notifyMessageDelete(callback: (messageId: string) => void) {
    chatApi.socket?.on('message-deleted', callback)
  },

  usersCount(callback: (count: number) => void) {
    chatApi.socket?.on('users-count', callback)
  },

  clientMessageEdit(arg: { messageId: string; newMessage: string }) {
    chatApi.socket?.emit('message-update', arg)
  },

  clientMessageDelete(messageId: string) {
    chatApi.socket?.emit('message-delete', messageId)
  },

  clientMessageSent({ text, token }: { text: string; token: string }) {
    chatApi.socket?.emit('client-message-sent', {
      token: token,
      text: text,
    })
  },

  clientTyping(token: string) {
    chatApi.socket?.emit('client-typing', {
      token: token,
    })
  },

  disconnect: () => {
    chatApi.socket?.disconnect()
    chatApi.socket = null
  },
}

// Создаем экземпляр Axios
const instance = axios.create({
  baseURL: 'http://localhost:3009', // URL твоего бэкенда
  withCredentials: true, // Включаем для отправки куки с запросами
})

export const authAPI = {
  // Метод для авторизации (проверка токена)
  auth() {
    return instance.post<AuthResponse>('/auth') // Токен автоматически будет отправлен через куки
  },

  // Метод для регистрации (создание нового пользователя)
  register(name: string) {
    return instance.post<RegisterResponse>('/register', { name }) // Отправляем только имя для регистрации
  },

  logout() {
    return instance.post('/logout')
  },
}

export type ServerMessageType = {
  message: string
  messageId: string
  user: UserType
}

export type ClientMessageType = ServerMessageType & {
  isMyMessage: boolean
}

export type UserType = {
  userid: string
  name: string
}

export type RegisterResponse<D = {}> = {
  message: string
  token: string
  user: UserType
}

export type AuthResponse = {
  message: string
  user: UserType
  token: string
}
