import React from 'react'
import Login from '../components/Login/Login'

function loginadmin(props) {
  return (
    <div>
      <Login user={props.user}/>
    </div>
  )
}

export default loginadmin
