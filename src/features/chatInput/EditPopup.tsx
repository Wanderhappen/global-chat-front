import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import { Box, IconButton, Paper, Typography } from '@mui/material'
import { setMessageToRename } from 'features/messageList/model/chatSlice'
import React from 'react'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'

type Props = {
  messageToRename: null | string
  clearInput: (message: string) => void
}

export const EditPopup = ({ messageToRename, clearInput }: Props) => {
  const dispatch = useAppDispatch()
  const deleteMessageToRenameHandler = () => {
    dispatch(setMessageToRename({ messageId: null, newMessage: null }))
    clearInput('')
  }
  return (
    <Box
      sx={{
        maxWidth: '760px',
        width: '100%',
      }}
    >
      {messageToRename && (
        <Paper
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            backgroundColor: '#1C1D22',
          }}
        >
          <EditIcon sx={{ color: '#ffffff', ml: '10px' }} />
          <Typography
            variant='body1'
            sx={{ ml: 1, flex: 1, color: 'rgb(255,255,255)', p: '0px 5px' }}
          >
            {messageToRename}
          </Typography>

          <IconButton
            color='primary'
            onClick={deleteMessageToRenameHandler}
          >
            <CloseIcon sx={{ color: '#ffffff' }} />
          </IconButton>
        </Paper>
      )}
    </Box>
  )
}
