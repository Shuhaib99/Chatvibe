import React from 'react'
import Layout from '../Layout'
import PostCard from '../PostCard'
import PostFormCard from '../PostFormCard'
import Search from '../Search'

function ViewHome() {
  return (
    <Layout>

      <Search />
      <PostFormCard />
      <PostCard userid={""} />
    </Layout>
  )
}

export default ViewHome
