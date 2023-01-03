import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Profile from '../Profile'

function About() {
  const profileid = useSelector(state => state.userSlice.profileid)
  return (
    <div>
       <Profile />
          
    </div>
  )
}

export default About
