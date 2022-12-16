import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './Pages/Login'
import Admin from './Pages/Admin'
import Signup from './Pages/Signup'
import ViewHome from './Pages/ViewHome'
// import { useSelector } from 'react-redux'
import ProtectedRoute from './ProtectedRoute'

function App() {
  // let { user } = useSelector(state => state)
  let USER
  return (

    <div className="App">
      <BrowserRouter>
        <Routes >
          <Route element={<ProtectedRoute />} >
            <Route path='/' exact element={<ViewHome />} />
          </Route>

          <Route path='/login' element={<Login user={USER = "user"} />} />
       
          <Route path='/admin' element={<Admin user={USER = "admin"} />} />
        
          <Route path='/signup' element={<Signup user={USER = "signup"} />} />
          
        </Routes>
      </BrowserRouter>

    </div>

  );
}

export default App;
