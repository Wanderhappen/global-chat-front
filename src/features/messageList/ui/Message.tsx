import { Box, Menu, MenuItem, Paper, Typography } from '@mui/material'
import { addNotifyMessage } from 'app/appSlice'
import type { ClientMessageType } from 'features/messageList/api/api'
import {
  removeMessage,
  setMessageToRename,
} from 'features/messageList/model/chatSlice'
import React, { useRef, useState } from 'react'
import { copyTextToBuffer } from 'shared/hooks/copyTextToBuffer'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'

type Props = {
  m: ClientMessageType
  showName: boolean
}

type popupMessage = 'Edit' | 'Copy text' | 'Delete'

export const Message = ({ m, showName }: Props) => {
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const anchorRef = useRef<HTMLElement | null>(null)

  const handleContextMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    setIsOpen(true)
    anchorRef.current = event.currentTarget
  }

  const CloseHandler = () => {
    setIsOpen(false)
  }

  const handleMenuAction = (action: popupMessage) => {
    switch (action) {
      case 'Edit': {
        dispatch(
          setMessageToRename({ messageId: m.messageId, newMessage: m.message })
        )
        break
      }
      case 'Copy text': {
        copyTextToBuffer(m.message, () =>
          dispatch(addNotifyMessage(`Сообщение скопировано`))
        )
        break
      }
      case 'Delete': {
        dispatch(removeMessage(m.messageId))
        dispatch(addNotifyMessage(`Сообщение удалено`))
        break
      }
    }
    CloseHandler() // Закрытие меню после выбора действия
  }

  return (
    <Box
      display='flex'
      justifyContent={m.isMyMessage ? 'flex-end' : 'flex-start'}
      marginY={1}
      onContextMenu={handleContextMenu}
    >
      <Paper
        elevation={3}
        sx={{
          paddingTop: 0.5,
          paddingBottom: 0.5,
          paddingLeft: 1,
          paddingRight: 1,
          borderRadius: '16px',
          backgroundColor: m.isMyMessage ? '#BDD2B6' : '#26272D',
          maxWidth: '70%',
          borderTopLeftRadius: m.isMyMessage ? '16px' : '0',
          borderTopRightRadius: m.isMyMessage ? '0' : '16px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {showName && (
          <Typography
            variant='body1'
            component='span'
            color={m.isMyMessage ? '#1D1E22' : '#FFFFFF'}
          >
            <b>{m.user.name}: </b>
          </Typography>
        )}

        <Typography
          variant='body1'
          component='span'
          color={m.isMyMessage ? '#1D1E22' : '#FFFFFF'}
        >
          {m.message}
        </Typography>
      </Paper>

      <Menu
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: '#26272D',
            color: '#FFFFFF',
            borderRadius: '8px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          },
          '& .MuiMenuItem-root': {
            '&:hover': {
              backgroundColor: '#4a4b57',
            },
          },
        }}
        anchorEl={anchorRef.current}
        open={isOpen}
        onClose={CloseHandler}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: m.isMyMessage ? 'right' : 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: m.isMyMessage ? 'right' : 'left',
        }}
      >
        {m.isMyMessage && (
          <MenuItem onClick={() => handleMenuAction('Edit')}>Edit</MenuItem>
        )}

        <MenuItem onClick={() => handleMenuAction('Copy text')}>
          Copy text
        </MenuItem>
        <MenuItem onClick={() => handleMenuAction('Delete')}>Delete</MenuItem>
      </Menu>
    </Box>
  )
}
