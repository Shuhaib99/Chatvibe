import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Card from '../components/Card'
import PostCard from '../components/PostCard'
import Avatar from '../components/Avatar'
import { Link, useLocation } from 'react-router-dom'
import { getUser, follow, unfollow } from '../redux/UserSlice'
import FriendsInfo from './FriendsInfo'
import { useDispatch } from 'react-redux'
import LoadOnButton from './LoadOnButton'
// import Loading from './Loading'

function Profile() {
  const [user, setUser] = useState("")
  // const [userDetails, setUserDetails] = useState([])
  // const [isLoading, setIsLoading] = useState(false)
  const [isBttnLoading, setBttnIsLoading] = useState(false)
  const [refresh, setRefresh] = useState("")
  const dispatch = useDispatch()
  const router = useLocation()
  const userid = router.state
  console.log(router.state, "rouuuuuuuute stateeeeeeeeeeeee");
  // const user = useSelector(state => state.UserSlice.user)
  const pathname = router.pathname

  const isPosts = pathname.includes('/posts') || pathname === '/profile/'

  const isAbout = pathname.includes('/about')
  // console.log(router,"router",pathname,isAbout,"IsPost checking");
  const isFriends = pathname.includes('/friends')
  const isPhotos = pathname.includes('/photos')
  const tab_classes = 'flex gap-2 px-6 items-center border-b-4 border-b-white'
  const active_tab_classes = 'flex gap-2 px-6 py-1 items-center border-socialBlue border-b-4 text-socialBlue font-bold'

  function handleFollow(id) {
    setBttnIsLoading(true)
    dispatch(follow(id)).then((res) => {
      console.log(res);
      setBttnIsLoading(false)
      setRefresh("Follow")
    })
  }
  function handleUnFollow(id) {
    setBttnIsLoading(true)
    dispatch(unfollow(id)).then((res) => {
      console.log(res);
      setBttnIsLoading(false)
      setRefresh("Unfollow")
    })
  }

  useEffect(() => {
    // setIsLoading(true)
    dispatch(getUser({ userid })).then((res) => {
      console.log(res.payload);
      setUser(res.payload)
      // setIsLoading(false)
    })
  }, [refresh])


  return (
    <Layout>
      {/* {isLoading && <Loading />} */}
      <Card noPadding={true}>

        <div className='relative overflow-hidden rounded-md'>
          <div className='h-36 overflow-hidden flex justify-center items-center'>
            <img src='https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1333&q=80' alt='img' />
          </div>
          <div className='absolute top-24 left-4'>
            <Avatar size={'lg'} />
          </div>
          <div className='p-4 pb-4'>
            <div className='ml-40 '>
              <h1 className='text-3xl font-bold'>
                {user?.otherDetails?.firstname + " " + user?.otherDetails?.lastname}
              </h1>
              <div className='text-gray-500 leading-4'>United Kingdom</div>
            </div>
            <div>


              {userid.id === user.userid ? "" : user.otherDetails?.followers.includes(user.userid) ?

                <button onClick={() => {
                  handleUnFollow(userid)
                }} className='mt-3 ml-40 bg-socialBlue text-white px-6 py-1 rounded-md '>
                  {isBttnLoading ? <LoadOnButton /> : "Unfollow"}</button>
                :
                <button onClick={() => {
                  handleFollow(userid)
                }} className='mt-3 ml-40 bg-socialBlue text-white px-6 py-1 rounded-md '>
                  {isBttnLoading ? <LoadOnButton /> : "Follow"}
                </button>
              }
            </div>

            <div className='mt-10 flex gap-0'>
              <Link to="/posts" className={isPosts ? active_tab_classes : tab_classes}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                Posts
              </Link>
              <Link to="/about" className={isAbout ? active_tab_classes : tab_classes} >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
                About
              </Link>
              <Link to="/friends" className={isFriends ? active_tab_classes : tab_classes} >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
                Followers
              </Link>
              <Link to="/photos" className={isPhotos ? active_tab_classes : tab_classes} >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                Following
              </Link>
            </div>
          </div>
        </div>
      </Card>
      {isPosts && (
        <div>
          Posts
          <PostCard userid={userid} />
        </div>
      )}
      {isAbout && (
        <div>
          <Card>
            <h2 className='text-3xl mb-2 '>About me</h2>
            <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </Card>
        </div>
      )}
      {isFriends && (
        <div>
          <Card>
            <h2 className='text-3xl mb-2 '>Friends</h2>
            <div className='border-b p-3'>
              <FriendsInfo />
            </div>
            <div className='border-b p-3'>
              <FriendsInfo />
            </div>
            <div className='border-b p-3'>
              <FriendsInfo />
            </div>
          </Card>
        </div>
      )}
      {isPhotos && (
        <div>
          <Card>
            <div className='grid grid-cols-2 gap-4'>
              <div className='rounded-md overflow-hidden h-48 flex items-center shadow-md'>
                <img src="https://images.unsplash.com/photo-1657444984080-5c08464bde8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDl8dG93SlpGc2twR2d8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" alt='img' />
              </div>
              <div className='rounded-md overflow-hidden h-48 flex items-center shadow-md'>
                <img src="https://images.unsplash.com/photo-1661956602153-23384936a1d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt='img' />
              </div>
              <div className='rounded-md overflow-hidden h-48 flex items-center shadow-md'>
                <img src="https://images.unsplash.com/photo-1671138638073-ba77c5c2e388?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" alt='img' />
              </div>
              <div className='rounded-md overflow-hidden h-48 flex items-center shadow-md'>
                <img src="https://images.unsplash.com/photo-1671311576479-21411c2ddfb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1Nnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" alt='img' />
              </div>
            </div>
          </Card>
        </div>
      )}


    </Layout>
  )
}

export default Profile
