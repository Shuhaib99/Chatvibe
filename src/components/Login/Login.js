import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { loginUser, signUpUser, googleUser, otpAuth } from '../../redux/AuthSlice';
import { Link, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import LoadOnButton from '../LoadOnButton'
import './Login.css';


function Login(props) {

    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [signupError, setSignupError] = useState(false)
    const [otp, setOtp] = useState(false)
    const [otpVerify, setOtpVerify] = useState("")
    const [otpNumber, setOtpNumber] = useState("")
    const [errFirstname, setErrFirstname] = useState(true)
    // const [errLastname, setErrLastname] = useState(true)
    const [errEmail, setErrEmail] = useState(true)
    const [errPassword, setErrPassword] = useState(true)
    const [otpError, setOtpError] = useState(false)
    const [showRegLog, setShowRegLog] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

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
            console.log(userObject);
            navigate('/')
        })
    }
    function GVerify() {
        /*global  google*/
        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GClientID,
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

    const otpVerification = (e) => {
        e.preventDefault()
        try {
            if (props.user === "signup") {
                firstnameRegex.test(firstname) ? setErrFirstname(true) : setErrFirstname(false)
                emailRegex.test(email) ? setErrEmail(true) : setErrEmail(false)
                PasswordRegex.test(password) ? setErrPassword(true) : setErrPassword(false)
                if (firstnameRegex.test(firstname) && PasswordRegex.test(password)) {
                    setIsLoading(true)
                    dispatch(otpAuth({ email })).then((res) => {
                        if (res.payload.user === false) {
                            setSignupError(true)
                        } else if (res.payload.response.otp) {
                            console.log(res.payload.response.otp,"otp");
                            setOtpNumber(res.payload.response.otp)
                            setOtp(true)
                            setShowRegLog(true)
                        }else{
                            console.log("OTP error.....");
                            setIsLoading(false)
                            setOtpError(true)
                        }

                    })
                    setIsLoading(false)
                    console.log("ok");
                }
            }
        } catch (error) {
            return error
        }
    }
    function LoginReg(){
        try {
            setIsLoading(true)
           
            if (props.user === "signup") {
                if (otpNumber === otpVerify) {
                    console.log("Inside otp ok");
                    firstnameRegex.test(firstname) ? setErrFirstname(true) : setErrFirstname(false)
                    emailRegex.test(email) ? setErrEmail(true) : setErrEmail(false)
                    PasswordRegex.test(password) ? setErrPassword(true) : setErrPassword(false)
                    if (firstnameRegex.test(firstname) && emailRegex.test(email) && PasswordRegex.test(password)) {

                        dispatch(signUpUser({ firstname, lastname, email, password })).then((res) => {
                            if (res.payload.user === false) {
                                console.log("user false");
                                setSignupError(true)
                            } else {
                                setOtp(false)
                                setShowRegLog(false)
                                navigate('/');

                            }
                        })
                        setIsLoading(false)
                    }
                    else {
                        setIsLoading(false)
                        console.log("Signup error");
                    }
                } else {
                    setIsLoading(false)
                    setOtpError(true)
                }
            }
            else {
               
                emailRegex.test(email) ? setErrEmail(true) : setErrEmail(false)
                PasswordRegex.test(password) ? setErrPassword(true) : setErrPassword(false)
                if (emailRegex.test(email) && PasswordRegex.test(password)) {

                    dispatch(loginUser({ email, password })).then(() => {
                        navigate('/');
                        // console.log("testing");
                    });
                    setIsLoading(false)
                } else {
                    setIsLoading(false)
                    console.log("validation error");
                }
            }
        } catch (error) {
            return error
        }
    }
    //.....................................................
    const handleRegister = (e) => {
        
        e.preventDefault()
        LoginReg()
        
    }
    return (
        <div className='h-screen w-full bg-cover bg-center bg-fixed bg-[url("https://dm0qx8t0i9gc9.cloudfront.net/watermarks/image/rDtN98Qoishumwih/abstract-colorful-social-network-people-background_zJgPXisO_SB_PM.jpg")]'>
            <div className='bg-black/90 w-full h-screen'>

                <div className='flex flex-col h-screen justify-center'>
                    <form className=' space-y-5 ' onSubmit={props.user === 'user' ? handleRegister : otp ? handleRegister : otpVerification}>

                        <center>
                            <h1 className='rounded-lg  text-orange-700 text-6xl'>
                                Chatvibe </h1>{props.user ? <span><br />
                                    <p className='rounded-lg text-orange-300'> ChatVibe helps you connect and share
                                        with<br /> the people in your life.</p>
                                </span> : ""}
                        </center>

                        <center>
                            {props.user === "user" ? <h2 className='text-white text-4xl '>Sign in</h2> : <h2 className='text-white text-4xl'>Signup</h2>}
                        </center>
                       {isLoading && <center className='text-orange-500'> <LoadOnButton />Please wait...</center> }
                        {props.user === "signup" ?
                            <div className=' space-y-5'>
                                <center>
                                    <input className='w-96 p-2 px-3 bg-transparent border border-white outline-none rounded-3xl text-white' type="text" onChange={(e) => {
                                        setFirstname(e.target.value)
                                        setErrFirstname(true)
                                    }}
                                        value={firstname} size="small" label='First name' placeholder='Enter first name' />
                                    <span style={{ display: errFirstname ? "none" : "block", color: "red", fontSize: "12px" }}>First name Shoud be 4 Characters</span>
                                </center>

                                <center>
                                    <input className='w-96 p-2 px-3 bg-transparent border border-white outline-none rounded-3xl text-white' type="text" onChange={(e) => {
                                        setLastname(e.target.value)

                                    }}
                                        value={lastname} size="small" label='Last name' placeholder='Enter Last name' />
                                    {/* <span style={{ display: errLastname ? "none" : "block", color: "red", fontSize: "12px" }}>Lasst name Shoud be Enter</span> */}
                                </center>
                            </div>
                            : ""}
                        <center>
                            <input className='w-96 p-2 px-3 bg-transparent border border-white outline-none rounded-3xl text-white' onChange={(e) => {
                                setEmail(e.target.value)
                                setErrEmail(true)
                                setSignupError(false)
                            }}
                                value={email} size="small" type="email" label='Email ID' placeholder='Info@example.com' />
                            <span style={{ display: errEmail ? "none" : "block", color: "red", fontSize: "12px" }}>Please enter valid email</span>
                            {signupError && <div>
                                <span className='text-red-600'>
                                    Entered email allready exist !
                                </span>
                            </div>}
                        </center>
                        <center>
                            <input className='w-96 p-2 px-3 bg-transparent border border-white outline-none rounded-3xl text-white' onChange={(e) => {
                                setPassword(e.target.value)
                                setErrPassword(true)
                            }}
                                value={password} size="small" label='Password' placeholder='Enter Password' type='password' autoComplete='on' />
                            <span style={{ display: errPassword ? "none" : "block", color: "red", fontSize: "12px" }}>Password Shoud be 3 Characters</span>
                        </center>
                        <br />
                        {otp && <center>
                            <div className='text-white font-semibold text-center'> Verify OTP </div>
                            <input className='w-96 p-2 px-3 bg-transparent border border-white outline-none rounded-xl text-white' onChange={(e) => {
                                setOtpVerify(e.target.value)
                                setOtpError(false)
                            }}
                                value={otpVerify} size="small" placeholder='Enter OTP' autoComplete='on' />
                        </center>}
                        {
                            otpError && <center> <div className='text-red-600 text-center'>Entered otp wrong</div> </center>
                        }
                        {props.user === "user" ? <div>
                            <center>
                                <Link className='text-white  text-xs hover:border-b' to="">
                                    Forgotten Password?
                                </Link>
                            </center>
                        </div> : ""}
                        {showRegLog === false ? <center>
                            <button
                                className='w-96 p-2 px-3 bg-transparent border border-white outline-none rounded-xl text-white hover:bg-slate-200 hover:text-black duration-300'

                                type='submit'   >{props.user === "signup" ? "Register" : "Login"}</button>

                        </center> : ""}

                        {otp ? <center>
                            <button
                                className='w-96 p-2 px-3 bg-transparent border border-white outline-none rounded-xl text-white hover:bg-slate-200 hover:text-black duration-300'
                                type='submit' >
                                Send OTP
                            </button>

                        </center>
                            : ""}
                        <center>
                            {props.user === "user" ? <div className='text-white text-xs'>
                                Don't have an account? <Link to='/signup'> Signup </Link>
                            </div> : props.user === "signup" ? <div className='text-white text-xs'>
                                Allready have an account? <Link to='/login'> Login </Link>
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



