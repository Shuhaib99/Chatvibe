import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { loginUser, signUpUser, googleUser } from '../../redux/AuthSlice';
import { Link, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import './Login.css';


function Login(props) {

    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [errFirstname, setErrFirstname] = useState(true)
    // const [errLastname, setErrLastname] = useState(true)
    const [errEmail, setErrEmail] = useState(true)
    const [errPassword, setErrPassword] = useState(true)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const client= process.env.GCLIENTID
    // let { user } = useSelector(state => state)

    // let usernameRegex = /^[a-zA-Z0-9]{5,12}$/
    let firstnameRegex = /^[a-zA-Z0-9]{4,12}$/
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    let PasswordRegex = /^[a-zA-Z0-9]{3,15}$/


    //..................Gooooogle..........................

    function handleCallbackResponse(response) {
        var userObject = jwt_decode(response.credential);
        dispatch(googleUser(userObject)).then(() => {
            navigate('/')
        })
    }
    function GVerify(){
        /*global  google*/
        google.accounts.id.initialize({
            client_id:"",
            callback: handleCallbackResponse,
        });

        google.accounts.id.renderButton(
            document.getElementById("googlebtn"),
            { theme: "outline", size: "large", shape: "rectangle" }
        );
        //google.accounts.id.prompt();
    }

    
    useEffect(() => {
        GVerify()
    }, [])


    //.....................................................
    const handleRegister = (e) => {
        e.preventDefault()
        try {
            if (props.user === "signup") {
                firstnameRegex.test(firstname) ? setErrFirstname(true) : setErrFirstname(false)
                emailRegex.test(email) ? setErrEmail(true) : setErrEmail(false)
                PasswordRegex.test(password) ? setErrPassword(true) : setErrPassword(false)
                if (firstnameRegex.test(firstname) && emailRegex.test(email) && PasswordRegex.test(password)) {
                    dispatch(signUpUser({ firstname, lastname, email, password })).then(() => {
                        navigate('/');
                    });
                }
                else {
                    console.log("Signup error");
                }
            }
            else {
                console.log("Login");
                emailRegex.test(email) ? setErrEmail(true) : setErrEmail(false)
                PasswordRegex.test(password) ? setErrPassword(true) : setErrPassword(false)
                if (emailRegex.test(email) && PasswordRegex.test(password)) {
                    dispatch(loginUser({ email, password })).then(() => {
                        navigate('/');
                    });
                } else {
                    console.log("validation error");
                }
            }
        } catch (error) {
            return error
        }
    }

    return (
        <div className='h-screen w-full bg-cover bg-center bg-fixed bg-[url("https://dm0qx8t0i9gc9.cloudfront.net/watermarks/image/rDtN98Qoishumwih/abstract-colorful-social-network-people-background_zJgPXisO_SB_PM.jpg")]'>
            <div className='bg-black/90 w-full h-screen'>

                <div className='flex flex-col h-screen justify-center'>
                    <form className=' space-y-5 ' onSubmit={handleRegister}>

                        <center>
                            <h1 className='rounded-lg  text-orange-700 text-6xl'>
                                Chatvibe </h1>{props.user ? <span><br />
                                    <p className='rounded-lg text-orange-300'> ChatVibe helps you connect and share
                                        with<br /> the people in your life.</p>
                                </span> : ""}
                        </center>

                        <center>
                            {props.user === "user" ? <h2 className='text-white text-4xl '>Sign in</h2> : props.user === "admin" ? <h2 className='text-white text-4xl'>Admin</h2> : <h2 className='text-white text-4xl'>Signup</h2>}
                        </center>
                        {props.user === "signup" ?
                            <div className=' space-y-5'>
                                <center>
                                    <input className='w-96 p-2 px-3 bg-transparent border border-white outline-none rounded-xl text-white' type="text" onChange={(e) => {
                                        setFirstname(e.target.value)
                                        setErrFirstname(true)
                                    }}
                                        value={firstname} size="small" label='First name' placeholder='Enter first name' />
                                    <span style={{ display: errFirstname ? "none" : "block", color: "red", fontSize: "12px" }}>First name Shoud be 4 Characters</span>
                                </center>

                                <center>
                                    <input className='w-96 p-2 px-3 bg-transparent border border-white outline-none rounded-xl text-white' type="text" onChange={(e) => {
                                        setLastname(e.target.value)

                                    }}
                                        value={lastname} size="small" label='Last name' placeholder='Enter Last name' />
                                    {/* <span style={{ display: errLastname ? "none" : "block", color: "red", fontSize: "12px" }}>Lasst name Shoud be Enter</span> */}
                                </center>
                            </div>
                            : ""}
                        <center>
                            <input className='w-96 p-2 px-3 bg-transparent border border-white outline-none rounded-xl text-white' onChange={(e) => {
                                setEmail(e.target.value)
                                setErrEmail(true)
                            }}
                                value={email} size="small" type="email" label='Email ID' placeholder='Info@example.com' />
                            <span style={{ display: errEmail ? "none" : "block", color: "red", fontSize: "12px" }}>Please enter valid email</span>
                        </center>
                        <center>
                            <input className='w-96 p-2 px-3 bg-transparent border border-white outline-none rounded-xl text-white' onChange={(e) => {
                                setPassword(e.target.value)
                                setErrPassword(true)
                            }}
                                value={password} size="small" label='Password' placeholder='Enter Password' type='password' autoComplete='on' />
                            <span style={{ display: errPassword ? "none" : "block", color: "red", fontSize: "12px" }}>Password Shoud be 3 Characters</span>
                        </center>
                        {props.user === "user" ? <div>
                            <center>
                                <Link className='text-white  text-xs hover:border-b' to="">
                                    Forgotten Password?
                                </Link>
                            </center>
                        </div> : ""}
                        <center>
                            <button
                                className='w-96 p-2 px-3 bg-transparent border border-white outline-none rounded-xl text-white hover:bg-slate-200 hover:text-black duration-300'

                                type='submit'   >{props.user === "signup" ? "Register" : "Login"}</button>

                        </center>
                        <center>
                            {props.user === "user" ? <div className='text-white text-xs'>
                                Don't have an account? <Link to='/signup'> Signup </Link>
                            </div> : ""}
                            <br />
                            <div>
                                <p className='text-white text-xs'>__________________or continue with__________________</p>
                            </div><br />
                                <div className='w-96' id='googlebtn'>

                                </div>                           
                        </center>

                    </form>
                </div >
            </div>
        </div>
    )
}

export default Login



