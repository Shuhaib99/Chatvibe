import React from 'react'
import Login from '../components/Login/Login'

function signuppage(props) {
  return (
    <div>      
      <Login  user={props.user}/>
    </div>
  )
}

export default signuppage
