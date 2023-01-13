
import { React } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const isLoggedIn = () => {
  try {
    const val = localStorage.getItem('adlog')
    return !!val
  } catch {
    return false
  }
}

export default function ProtectedRouteAdmin() {
  if (isLoggedIn()) {
    return <Outlet />
  }
  else {
    return <Navigate to="/admin" />
  }
}

