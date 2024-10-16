import { selectIsLoggedIn } from 'app/authSlice'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Chat } from 'shared/layout/content/Chat'
import s from './Layout.module.css'

export const Layout = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
  }, [])

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }
  return (
    <div className={s.layout}>
      {/* <AppBar /> */}
      {/* <Dialogs /> */}

      {/* <Dialogs /> */}
      <Chat />
    </div>
  )
}
