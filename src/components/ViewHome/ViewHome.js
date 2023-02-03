import React from 'react'
import Layout from '../Layout'
import PostCard from '../PostCard'
import PostFormCard from '../PostFormCard'
import Search from '../Search'

function ViewHome() {
  return (
    <div>
      <Search />
      <div className='md:mt-32'>
        <Layout>
          <PostFormCard />
          <PostCard userid={""} />
        </Layout>
      </div>
    </div>
  )
}

export default ViewHome
