import React from 'react'
import Layout from '../Layout'
import PostCard from '../PostCard'
import PostFormCard from '../PostFormCard'

function ViewHome() {
  return (
    <Layout>
      <PostFormCard />
      <PostCard />
    </Layout>
  )
}

export default ViewHome
