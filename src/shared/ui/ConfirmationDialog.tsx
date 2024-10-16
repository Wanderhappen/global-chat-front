import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

type Props = {
  callback: () => void
  showDialog: boolean
  setShowDialog: (showDialog: boolean) => void
}

export const ConfirmationDialog = ({
  callback,
  showDialog,
  setShowDialog,
}: Props) => {
  const closePopup = () => {
    setShowDialog(false)
  }

  const confirmHandler = () => {
    callback()
    closePopup()
  }

  return (
    <Dialog
      open={showDialog}
      onClose={closePopup}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: '#26272D', // Фоновый цвет диалога
          color: '#FFFFFF', // Цвет текста
          borderRadius: '8px', // Закругление углов
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Тень
        },
      }}
    >
      <DialogTitle id='alert-dialog-title'>{'Are you sure?'}</DialogTitle>
      <DialogContent>
        <DialogContentText
          id='alert-dialog-description'
          sx={{ color: '#FFFFFF' }}
        >
          Do you want to log out of your account?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={closePopup}
          sx={{ color: '#3bff00' }}
        >
          Cancel
        </Button>
        <Button
          onClick={confirmHandler}
          autoFocus
          sx={{ color: '#ff0000' }}
        >
          LOG OUT
        </Button>
      </DialogActions>
    </Dialog>
  )
}
