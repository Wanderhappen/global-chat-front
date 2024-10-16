import { TableFooter } from '@mui/material'
import { initializeApp } from 'app/authSlice'
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { Header } from 'shared/layout/Header/Header'
import { SuccessSnackbar } from 'shared/ui/SuccessSnackbar'

// const socketUrl = 'http://localhost:3009'
function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    // api.connect()

    // api.getId()

    dispatch(initializeApp())

    return () => {
      // dispatch(destroyConnection())
    }
  }, [])

  return (
    <>
      {/* {!isNameEntered ? ( */}
      {/*   <Login /> */}
      {/* ) : ( */}
      {/*   <> */}
      {/*     <MessagesList /> */}
      {/*     <ChatInput /> */}
      {/*   </> */}
      {/* )} */}
      {/* <Layout /> */}
      <Header />
      <SuccessSnackbar />
      <Outlet />
      <TableFooter />
    </>
  )
}

export default App
