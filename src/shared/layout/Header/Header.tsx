import AccountCircle from '@mui/icons-material/AccountCircle'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import LogoutIcon from '@mui/icons-material/Logout'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { addNotifyMessage } from 'app/appSlice'
import { logout, selectUserId, selectUserName } from 'app/authSlice'
import { selectCountUsers } from 'features/messageList/model/chatSlice'
import * as React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { copyTextToBuffer } from 'shared/hooks/copyTextToBuffer'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { ConfirmationDialog } from 'shared/ui/ConfirmationDialog'

export const Header = () => {
  const dispatch = useAppDispatch()
  const userName = useSelector(selectUserName)
  const userId = useSelector(selectUserId)
  const countUsers = useSelector(selectCountUsers)
  const [showDialog, setShowDialog] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const copyIdHandler = () => {
    userId &&
      copyTextToBuffer(userId, () =>
        dispatch(addNotifyMessage('Ваш id Скопирован'))
      )
    handleClose()
  }

  const logoutHandler = () => {
    setShowDialog(true)
    handleClose()
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position='absolute'
          sx={{
            backgroundColor: '#1C1D22',
            maxWidth: 760,
            width: '100%',
            margin: '0 auto',
            left: 0,
            right: 0,
          }}
        >
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              variant='h6'
              component='div'
              color={'rgba(255,255,255,0.8)'}
            >
              {`Users online: ${countUsers}`}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant='h6'
                component='div'
                color={'rgba(255,255,255,0.8)'}
                sx={{ whiteSpace: 'nowrap' }} // Убираем переносы
              >
                {userName}
              </Typography>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
                sx={{ padding: '4px' }} // Уменьшаем отступы для иконки
              >
                <AccountCircle />
              </IconButton>
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
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={copyIdHandler}>
                  <ContentCopyIcon sx={{ marginRight: '8px' }} />
                  Your id: {userId}
                </MenuItem>
                <MenuItem onClick={logoutHandler}>
                  <LogoutIcon sx={{ marginRight: '8px' }} />
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <ConfirmationDialog
        callback={() => dispatch(logout())}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
    </>
  )
}
