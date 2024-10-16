import App from 'app/App'
import { Login } from 'features/auth/ui/Login'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Layout } from 'shared/layout/Layout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Navigate to={'/404'} />,
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
  {
    path: '/404',
    // element: <ErrorPage />,
  },
])
