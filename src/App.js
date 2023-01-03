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

// import { useSelector } from 'react-redux'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'

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
          </Route>

          <Route element={<PublicRoute />} >
            <Route path='/login' element={<Login user={USER = "user"} />} />
            <Route path='/admin' element={<Admin user={USER = "admin"} />} />
            <Route path='/signup' element={<Signup user={USER = "signup"} />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
