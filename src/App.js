import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './Pages/Login'
import Admin from './Pages/Admin'
import Signup from './Pages/Signup'

function App() {
  let USER
  return (

    <div className="App">
      <BrowserRouter>
        <Routes >
          <Route path='/' element={<Login user={USER = "user"} />} />
        </Routes>
        <Routes >
          <Route path='/admin' element={<Admin user={USER = "admin"} />} />
        </Routes>
        <Routes >
          <Route path='/signup' element={<Signup user={USER = "signup"} />} />
        </Routes>
      </BrowserRouter>

    </div>

  );
}

export default App;
