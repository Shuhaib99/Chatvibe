
import { React } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
// const useAuth = () => {    
//     let { user } = useSelector(state => state)
//     console.log(user, "testingg");
//     return user.isLoggedin
//     //const user = { loggedIn: false }

// }
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

