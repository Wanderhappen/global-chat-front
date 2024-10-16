import { Box } from '@mui/material'
import {
  deleteMessages,
  getMessages,
  selectMessages,
  selectTyping,
} from 'features/messageList/model/chatSlice'
import { Message } from 'features/messageList/ui/Message'
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import s from './MessagesList.module.css'

export const MessagesList = () => {
  const dispatch = useAppDispatch()

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messages = useSelector(selectMessages)
  const typingUsers = useSelector(selectTyping)

  useEffect(() => {
    dispatch(getMessages())
    return () => {
      dispatch(deleteMessages)
    }
  }, [])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const showNameFunc = (index: number) => {
    if (index === 0) {
      return true
    }
    return messages[index].user.userid !== messages[index - 1].user.userid
  }

  return (
    <Box
      sx={{
        flexGrow: '1',
        maxWidth: '760px',
        width: '100%',
        overflowY: 'auto',
        borderRadius: '10px',
        padding: '70px 16px 16px',
        backgroundColor: '#141416',
      }}
      className={s.scroll}
    >
      {messages.map((m, index) => {
        return (
          <Message
            m={m}
            showName={showNameFunc(index)}
            key={m.messageId}
          />
        )
      })}
      {typingUsers}
      <div ref={messagesEndRef} />
    </Box>
  )
}
