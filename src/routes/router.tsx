import App from 'app/App'
import { Login } from 'features/auth/ui/Login'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Layout } from 'shared/layout/Layout'

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <Navigate to='/myChat' />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/myChat',
          element: <Layout />,
        },
      ],
    },
  ],
  {
    basename: '/global-chat-front', // Указываем базовый путь
  }
)
