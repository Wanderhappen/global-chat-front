import { store } from 'app/store'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import './app/styles/global.css'
import { router } from 'routes/router'

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
