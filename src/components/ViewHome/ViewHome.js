import React from 'react'
import Layout from '../Layout'
import PostCard from '../PostCard'
import PostFormCard from '../PostFormCard'
import Search from '../Search'

function ViewHome() {
  return (
    <Layout>
     
        <Search />
      <div className='mt-5'>
      <PostFormCard />
      </div >
      <PostCard userid={""} />
    </Layout>
  )
}

export default ViewHome
