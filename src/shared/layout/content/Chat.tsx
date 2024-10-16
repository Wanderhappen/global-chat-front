import { ChatInput } from 'features/chatInput/ChatInput'
import { MessagesList } from 'features/messageList/ui/MessagesList'
import React from 'react'
import { Container } from 'shared/ui/container/Container'
import s from './chat.module.css'

export const Chat = () => {
  return (
    <div className={s.chat}>
      <Container>
        <MessagesList />
        <ChatInput />
      </Container>
    </div>
  )
}
