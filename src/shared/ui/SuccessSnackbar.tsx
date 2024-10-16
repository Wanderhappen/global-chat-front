import Alert from '@mui/material/Alert'
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar'
import { addNotifyMessage, selectNotifyMessage } from 'app/appSlice'
import * as React from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'

export const SuccessSnackbar = () => {
  const dispatch = useAppDispatch()

  const notifyMessage = useSelector(selectNotifyMessage)
  const open = Boolean(notifyMessage)

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(addNotifyMessage(null))
  }

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity='success'
          variant='filled'
          sx={{ width: '100%' }}
        >
          {notifyMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}
