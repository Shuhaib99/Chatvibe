import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, signUpUser } from '../../redux/AuthSlice';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login(props) {

    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [errFirstname, setErrFirstname] = useState("")
    const [errLastname, setErrLastname] = useState("")
    const [errEmail, setErrEmail] = useState("")
    const [errPassword, setErrPassword] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    let { user } = useSelector(state => state)

    const handleRegister = () => {
        try {

            if (props.user === "signup") {
                dispatch(signUpUser({ firstname, lastname, email, password })).then(() => {
                    navigate('/');
                });
            }
            else {
                console.log("Login");
                dispatch(loginUser({ email, password })).then(() => {
                    navigate('/');
                });
            }
        } catch (error) {
            return error
        }
    }

    return (
        <div className='h-screen w-full bg-cover bg-center bg-fixed bg-[url("https://dm0qx8t0i9gc9.cloudfront.net/watermarks/image/rDtN98Qoishumwih/abstract-colorful-social-network-people-background_zJgPXisO_SB_PM.jpg")]'>
            <div className='bg-black/90 w-full h-screen'>

                <div className='flex flex-col h-screen justify-center'>
                    <form action='' className=' space-y-5 '>
                        {/* <div > */}
                        <center>
                            <h1 className='rounded-lg  text-orange-700 text-6xl'>
                                Chatvibe... </h1>{props.user ? <span><br />
                                    <p className='rounded-lg text-orange-300'> ChatVibe helps you connect and share
                                        with<br /> the people in your life.</p>
                                </span> : ""}
                            {/* </div> */}
                        </center>
                        <center>
                            {props.user === "user" ? <h2 className='text-white text-4xl '>Sign in</h2> : props.user === "admin" ? <h2 className='text-white text-4xl'>Admin</h2> : <h2 className='text-white text-4xl'>Signup</h2>}
                        </center>
                        {props.user === "signup" ?
                            <div className=' space-y-5'>
                                <center>
                                    <input className='w-96 p-2 px-3 bg-transparent border border-white outline-none rounded-xl text-white' type="text" onChange={(e) => {
                                        setFirstname(e.target.value)
                                        setErrFirstname("")
                                    }}
                                        value={firstname} size="small" label='First name' placeholder='Enter first name' />
                                    <span >{errFirstname}</span>
                                </center>

                                <center>
                                    <input className='w-96 p-2 px-3 bg-transparent border border-white outline-none rounded-xl text-white' type="text" onChange={(e) => {
                                        setLastname(e.target.value)
                                        setErrLastname("")
                                    }}
                                        value={lastname} size="small" label='Last name' placeholder='Enter Last name' />

                                    <span >{errLastname}</span>
                                </center>
                            </div>
                            : ""}
                        <center>
                            <input className='w-96 p-2 px-3 bg-transparent border border-white outline-none rounded-xl text-white' onChange={(e) => {
                                setEmail(e.target.value)
                                setErrEmail("")
                            }}
                                value={email} size="small" type="email" label='Email ID' placeholder='Info@example.com' />
                            <span>{errEmail}</span>
                        </center>
                        <center>
                            <input className='w-96 p-2 px-3 bg-transparent border border-white outline-none rounded-xl text-white' onChange={(e) => {
                                setPassword(e.target.value)
                                setErrPassword("")
                            }}
                                value={password} size="small" label='Password' placeholder='Enter Password' type='password' />
                            <span >{errPassword}</span>
                        </center>
                        {props.user === "user" ? <div>
                            {/* <FormControlLabel
                        control={<Checkbox defaultChecked sx={{ color: "#F65454", '&.Mui-checked': { color: "#F65454", } }} />}
                        label={<Typography variant="caption">Keep me Logged in. </Typography>} /> */}
                            <center>
                                <Link className='text-white  text-xs hover:border-b' to="" >
                                    Forgotten Password?
                                </Link>
                            </center>
                        </div> : ""}
                        <center>
                            <button className='w-96 p-2 px-3 bg-transparent border border-white outline-none rounded-xl text-white hover:bg-slate-200 hover:text-black duration-300'
                                onClick={() => { handleRegister() }}
                                variant="contained">{props.user === "signup" ? "Register" : "Login"}</button>

                        </center>
                        <center>
                            {props.user === "user" ? <div className='text-white text-xs'>
                                Don't have an account? <Link to='/signup'> Signup </Link>
                            </div> : ""}
                            <br />
                            <div>
                                <p className='text-white text-xs'>__________________or continue with__________________</p>
                            </div>

                        </center>

                        {/* <IconButton color="primary"> <GoogleIcon /> </IconButton>
                <IconButton color="primary"> <FacebookIcon /> </IconButton>
                <IconButton color="black"> <AppleIcon /> </IconButton>
                <IconButton color="primary"> <TwitterIcon /> </IconButton> */}

                    </form>
                </div >
            </div>
        </div>
    )
}

export default Login



