
import axios from 'axios';
import { cloud } from '../constants'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadImage } from '../redux/PostSlice';
import toast, { Toaster } from 'react-hot-toast';
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css';
import Avatar from './Avatar'
import Card from './Card'




function PostFormCard() {
    // const [profile,setProfile]=useState(null)
    const [content, setContent] = useState("")
    const [image, setImage] = useState(null)
    let loading = useSelector(state => state.postSlice.loading)
    // const imageRef = useRef()
    const dispatch = useDispatch()
    const notify = () => toast.success(loading);

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0]
            setImage(img)
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        const newPost = {
            desc: content
        }
        //if (content || image) {
        if (image) {
            const data = new FormData()
            //const filename= Date.now()+image.name
            //data.append("name",filename)
            data.append("file", image)
            data.append("upload_preset", "a6ul1tvu")

            //console.log(newPost);            
            axios.post(cloud, data).then((res) => {
                newPost.image = res.data.secure_url
                newPost.imagePID = res.data.public_id
                dispatch(uploadImage({ newPost })).then((res) => {
                    notify()
                })
            })
        } else if (content) {
            dispatch(uploadImage({ newPost })).then((res) => {
                notify()
            })
        }


        //}
    }

    return (
        <div>
            <Toaster toastOptions={{
                success: {
                    style: {
                        border: '2px solid black',
                        padding: '16px'
                    },
                },
                error: {
                    style: {
                        background: 'red',
                    },
                },
            }} />
            <Card>
                <div className='flex gap-1'>
                    <Avatar />
                    <textarea value={content} onChange={(e) => {
                        setContent(e.target.value)
                    }} className='grow p-3 h-14' placeholder={'Whats on your mind, Shuhaib?'} />
                </div>
                <div className='flex gap-5 items-center mt-2'>
                    <div>
                        <button className='flex gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                            People</button>
                    </div>
                    <div>
                        <button className='flex gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                            Check in</button>
                    </div>
                    <div>
                        <button className='flex gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                            </svg>
                            Mood</button>
                    </div>

                    <div>

                        <input type="file" hidden id='inpfile' onChange={onImageChange} />
                        <label htmlFor='inpfile' className='flex gap-2 cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            Image</label>
                    </div>
                    <div className='grow text-right'>
                        <button onClick={(e) => {
                            handleSubmit(e)
                        }} className='bg-socialBlue text-white px-6 py-1 rounded-md '>Share</button>
                    </div>
                </div>

                {image && (
                    <div>
                        <img src={URL.createObjectURL(image)} alt="" />

                    </div>
                )}
            </Card>
        </div>
    )
}

export default PostFormCard
