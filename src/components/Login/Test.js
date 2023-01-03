// import React from 'react'
// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux'
// import { loginUser, signUpUser } from '../../redux/AuthSlice';
// import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material'
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import GoogleIcon from '@mui/icons-material/Google';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import AppleIcon from '@mui/icons-material/Apple';
// import IconButton from '@mui/material/IconButton';
// import Stack from '@mui/material/Stack';
// import { Link, useNavigate } from 'react-router-dom';
// import './Login.css';

// function Login(props) {

//     const [firstname, setFirstname] = useState("")
//     const [lastname, setLastname] = useState("")
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")

//     const [errFirstname, setErrFirstname] = useState("")
//     const [errLastname, setErrLastname] = useState("")
//     const [errEmail, setErrEmail] = useState("")
//     const [errPassword, setErrPassword] = useState("")

//     const navigate = useNavigate()
//     const dispatch = useDispatch()

//     const paperStyle = { padding: 20, height: '70vh', width: 320 }
//     const avatarStyle = { backgroundColor: "#F65454" }
//     const btnStyle = { backgroundColor: "#F65454", margin: "20px 0" }
//     const textboxMargin = { margin: "5px 0", }
//     const chatvibe = { color: "#F65454" }
//     let { user } = useSelector(state => state)

//     const handleRegister = () => {
//         try {
//             if (props.user === "signup") {
//                 dispatch(signUpUser({ firstname, lastname, email, password })).then(() => {
//                     navigate('/');
//                 });
//             }
//             else {
//                 dispatch(loginUser({ email, password })).then(() => {
//                     navigate('/');
//                 });
//             }
//         } catch (error) {
//             return error
//         }
//     }

//     return (
//         <div>
//             <Grid>
//                 <Stack sx={{ ml: 50, my: 11 }} direction="row" alignItems="center" spacing={10}>
//                     <h1 className='bg-gradient-to-r from-slate-50 to-[#F65454] rounded-lg text-white text-6xl'>
//                         Chatvibe... {props.user ? <span><br />  <Typography>
//                             ChatVibe helps you connect and share
//                             with<br /> the people in your life.
//                         </Typography></span> : ""}</h1>

//                     <Paper elevation={10} style={paperStyle}>
//                         <Grid align='center'> <Avatar style={avatarStyle}><LockOutlinedIcon />
//                         </Avatar> {props.user === "user" ? <h2>Login</h2> : props.user === "admin" ? <h2>Admin</h2> : <h2>Signup</h2>}</Grid>

//                         {props.user === "signup" ?
//                             <div>
//                                 <TextField onChange={(e) => {
//                                     setFirstname(e.target.value)
//                                     setErrFirstname("")
//                                 }}
//                                     value={firstname} size="small" style={textboxMargin} label='First name' placeholder='Enter first name' fullWidth />
//                                 <span style={chatvibe}>{errFirstname}</span>
//                                 <TextField onChange={(e) => {
//                                     setLastname(e.target.value)
//                                     setErrLastname("")
//                                 }}
//                                     value={lastname} size="small" style={textboxMargin} label='Last name' placeholder='Enter Last name' fullWidth />
//                                 <span style={chatvibe}>{errLastname}</span>
//                             </div>
//                             : ""}

//                         <TextField onChange={(e) => {
//                             setEmail(e.target.value)
//                             setErrEmail("")
//                         }}
//                             value={email} size="small" style={textboxMargin} type="email" label='Email ID' placeholder='Info@example.com' fullWidth />
//                         <span style={chatvibe}>{errEmail}</span>

//                         <TextField onChange={(e) => {
//                             setPassword(e.target.value)
//                             setErrPassword("")
//                         }}
//                             value={password} size="small" style={textboxMargin} label='Password' placeholder='Enter Password' type='password' fullWidth />
//                         <span style={chatvibe}>{errPassword}</span>

//                         {props.user === "user" ? <div>
//                             <FormControlLabel
//                                 control={<Checkbox defaultChecked sx={{ color: "#F65454", '&.Mui-checked': { color: "#F65454", } }} />}
//                                 label={<Typography variant="caption">Keep me Logged in. </Typography>} />

//                             <Typography variant="caption"><Link >
//                                 Forgot password?
//                             </Link></Typography>
//                         </div> : ""}
//                         <Button onClick={() => { handleRegister() }}
//                             variant="contained" style={btnStyle} fullWidth>{props.user === "signup" ? "Register" : "Login"}</Button>

//                         {props.user === "user" ? <div>
//                             <Typography variant="caption"> Don't have an account? <Link to='/signup'> Signup </Link>
//                             </Typography><br /><br />
//                         </div> : ""}

//                         <Typography variant='caption'>
//                             _____________or continue with_____________
//                         </Typography>
//                         <Stack direction="row" alignItems="center" spacing={5}>

//                             <IconButton color="primary"> <GoogleIcon /> </IconButton>
//                             <IconButton color="primary"> <FacebookIcon /> </IconButton>
//                             <IconButton color="black"> <AppleIcon /> </IconButton>
//                             <IconButton color="primary"> <TwitterIcon /> </IconButton>


//                         </Stack>
//                     </Paper>
//                 </Stack>
//             </Grid>

//         </div>
//     )
// }

// export default Login



// import React from 'react'

// function Test() {
//   return (
//     <div>
//       Testingggg
//     </div>
//   )
// }

// export default Test
