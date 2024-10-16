import SendIcon from '@mui/icons-material/Send'
import { Box, IconButton, InputBase, Paper } from '@mui/material'
import { EditPopup } from 'features/chatInput/EditPopup'
import { EmojiPopup } from 'features/chatInput/EmojiPopup'
import {
  editMessage,
  selectMessageToRename,
  sendMessage,
  setMessageToRename,
  typeMessage,
} from 'features/messageList/model/chatSlice'
import React, { type ChangeEvent, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { throttle } from 'shared/utils/trottle'

export const ChatInput = () => {
  const dispatch = useAppDispatch()
  const messageToRename = useSelector(selectMessageToRename)
  const [message, setMessage] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (messageToRename !== null) {
      setMessage(messageToRename)
    }
  }, [messageToRename])

  useEffect(() => {
    inputRef.current?.focus()

    const handleClick = () => {
      inputRef.current?.focus()
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  const throttledDispatchTypeMessage = throttle(
    () => dispatch(typeMessage()),
    1000
  )

  const typingHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.currentTarget.value)
    throttledDispatchTypeMessage()
  }

  const enterPressHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submitOrEditMessage()
    }
    if (e.key === 'Escape') {
      dispatch(setMessageToRename({ messageId: null, newMessage: null }))
      setMessage('')
    }
  }

  const submitOrEditMessage = () => {
    if (message.trim()) {
      if (messageToRename) {
        dispatch(editMessage(message))
      } else {
        dispatch(sendMessage(message))
      }
      setMessage('')
    }
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    submitOrEditMessage()
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '760px',
        width: '100%',
      }}
    >
      <EditPopup
        clearInput={setMessage}
        messageToRename={messageToRename}
      />
      <Paper
        component='form'
        onSubmit={submitHandler}
        sx={{
          p: '10px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          backgroundColor: '#1C1D22',
        }}
      >
        <EmojiPopup callback={setMessage} />
        <InputBase
          inputRef={inputRef}
          sx={{ ml: 1, flex: 1, color: 'rgb(255,255,255)' }}
          multiline
          placeholder='Write a message'
          inputProps={{ 'aria-label': 'write message' }}
          value={message}
          onChange={typingHandler}
          onKeyDown={enterPressHandler}
        />
        <IconButton
          color='primary'
          onClick={submitOrEditMessage}
        >
          <SendIcon sx={{ color: '#ffffff' }} />
        </IconButton>
      </Paper>
    </Box>
  )
}
