import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../Avatar'

import Card from '../Card'
import Navigation from '../Navigation'
import PostCard from '../PostCard'
import PostFormCard from '../PostFormCard'
function ViewHome() {
  return (
    <div className='flex mt-4 max-w-4xl mx-auto gap-6'>
      <div className='w-3/12'>
        <Navigation />
      </div>
      <div className='w-9/12'>
        <PostFormCard />
       <PostCard />
      </div>
    </div>
  )
}

export default ViewHome
