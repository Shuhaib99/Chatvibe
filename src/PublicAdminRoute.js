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

export default function PublicAdminRoute() {
  if (isLoggedIn()) {
   return <Navigate to="/admin_home" />
  }
  else {
    return <Outlet />
  }
}