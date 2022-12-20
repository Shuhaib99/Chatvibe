import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './Pages/Login'
import Admin from './Pages/Admin'
import Signup from './Pages/Signup'
import ViewHome from './Pages/ViewHome'
import Profile from './Pages/Profile'
import About from './Pages/About'
import Friends from './Pages/Friends'
import Posts from './Pages/Posts'
import Photos from './Pages/Photos'

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
            <Route path='/profile' exact element={<Profile />} />
            <Route path='/about' exact element={<About />} />
            <Route path='/friends' exact element={<Friends />} />
            <Route path='/photos' exact element={<Photos />} />
            <Route path='/posts' exact element={<Posts />} />
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
