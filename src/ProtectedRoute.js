
import { React } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const isLoggedIn = () => {
  try {
    const val = localStorage.getItem('token')
    return !!val
  } catch {
    return false
  }
}

export default function ProtectedRoute() {
  if (isLoggedIn()) {
    return <Outlet />
  }
  else {
    return <Navigate to="/login" />
  }
}

