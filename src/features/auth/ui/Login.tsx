// import { addName } from 'features/messageList/model/chatSlice'
import { login, selectIsLoggedIn } from 'app/authSlice'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'

export const Login = () => {
  const [name, setName] = useState('')
  const [error, setError] = useState<null | string>(null)
  const dispatch = useAppDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  if (isLoggedIn) {
    return <Navigate to={'/'} />
  }

  const addNameHandler = () => {
    if (name.length > 2) {
      setError(null)
      // dispatch(addName(name))
      dispatch(login(name))
    } else {
      setError('Name must be 3 characters or longer.')
    }
  }

  return (
    <div>
      <p>Введите свое имя</p>
      <input
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <button onClick={addNameHandler}>Add name</button>
      <br />
      {error && <span style={{ color: 'red' }}>{error}</span>}
    </div>
  )
}
