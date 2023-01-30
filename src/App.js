import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './Pages/Login'
import Admin from './Pages/Admin'
import Signup from './Pages/Signup'
import ViewHome from './Pages/ViewHome'
import Profile from './Pages/Profile'
import About from './Pages/About'
import Followers from './Pages/Followers'
import Posts from './Pages/Posts'
import Following from './Pages/Following'
import Chat from './Pages/Chat'
import SavedPosts from './Pages/SavedPosts'
import AdminHome from './Pages/AdminHome'
import Notification from './Pages/Notification'

// import { useSelector } from 'react-redux'
import ProtectedAdminRoute from './ProtectedAdminRoute'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import PublicAdminRoute from './PublicAdminRoute'





function App() {
  // let { user } = useSelector(state => state)
  let USER
  return (
    <div>
      <BrowserRouter>
        <Routes >

          <Route element={<ProtectedRoute />} >
            <Route path='/' exact element={<ViewHome />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/about' element={<About />} />
            <Route path='/followers' element={<Followers />} />
            <Route path='/following' element={<Following />} />
            <Route path='/posts' element={<Posts />} />
            <Route path='/chat' element={<Chat />} />
            <Route path='/savedposts' element={<SavedPosts />} />
            <Route path='/notification' element={<Notification />} />

          </Route>

          <Route element={<PublicRoute />} >
            <Route path='/login' element={<Login user={USER = "user"} />} />
            <Route path='/signup' element={<Signup user={USER = "signup"} />} />
          </Route>


          <Route element={<ProtectedAdminRoute />} >
            <Route path='/admin_home' element={<AdminHome />} />
          </Route>

          <Route element={<PublicAdminRoute />} >
            <Route path='/admin' element={<Admin />} />
          </Route>


        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
