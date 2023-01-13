
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { bySuper } from '../../redux/AuthSlice'
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errEmail, setErrEmail] = useState(false)
  const [errPassword, setErrPassword] = useState(false)
  const [errLogin, setErrLogin] = useState(false)
  const dispatch = useDispatch()
  const navigate=useNavigate()

  let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  let PasswordRegex = /^[a-zA-Z0-9]{7,15}$/


  const handleLogin = () => {
    emailRegex.test(email) ? setErrEmail(false) : setErrEmail(true)
    PasswordRegex.test(password) ? setErrPassword(false) : setErrPassword(true)
    if (emailRegex.test(email) && PasswordRegex.test(password)) {
      dispatch(bySuper({ email, password })).then((res) => {
        //console.log(res.payload.login_status);
        if (res.payload.login_status === false) {
          setErrLogin(true)
        }else{
          navigate('/admin_home');
        }
      })
    }
  }

  return (
    <div className='h-screen bg-black flex justify-center  z-50 text-white '>
      {/* <div className='bg-black h-screen text-white'> */}
      <div className='flex justify-center items-center  '>
        <div>
          <div className=' flex'>
            <h1 className='rounded-lg  text-orange-700 text-6xl'>
              Chatvibe </h1>
            <label className='text-yellow-400 ' >Admin</label><br />
          </div>
          <input value={email} className='w-96 p-2 px-3 mt-5 bg-transparent border border-white outline-none rounded-3xl text-yellow-400' type="text" onChange={(e) => {
            setEmail(e.target.value)
            setErrEmail(false)
          }} placeholder='Info@example.com'/>
          <span style={{ display: !errEmail ? "none" : "block", color: "red", fontSize: "12px" }}>Please enter valid email</span>
          <br />
          <input value={password} className='w-96 p-2 px-3 mt-5 bg-transparent border border-white outline-none rounded-3xl text-yellow-400' type="password" onChange={(e) => {
            setPassword(e.target.value)
            setErrPassword(false)
          }} placeholder='Enter Password'/>
          <span style={{ display: !errPassword ? "none" : "block", color: "red", fontSize: "12px" }}>password atleast 7 characters</span>
          <br /><br />
          {errLogin && <span className='ml-11 text-red-700'>Please check your email and password </span>}<br />
          <div className='px-24'>
            <button
              className='w-44 p-2 px-3 bg-transparent border border-white outline-none rounded-xl text-white hover:text-yellow-400 duration-300'
              type='submit'
              onClick={() => {
                handleLogin()
              }} >
              Login
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
