import { StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
// import App from './App.tsx'
import Dashboard from './routes/Dashboard.tsx'
import Login from './routes/Login.tsx'
import ProtectedRoute from './routes/ProtectedRoute.tsx'
import { AuthProvider } from './auth/AuthProvider.tsx'

const router = createBrowserRouter([
  { 
    path: '/auth/login',
    element: <Login />,
  },
  { 
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/dashboard', 
        element: <Dashboard />, 
      }
    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>,
)