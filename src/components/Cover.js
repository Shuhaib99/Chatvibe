import React, { useState } from 'react'
import axios from 'axios';
import { cloud } from '../constants'
import { useDispatch } from 'react-redux'
import { uploadProfileImage } from '../redux/UserSlice';
import Loading from './Loading';
function Cover({ url, publicID, editable, onchange }) {

    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()


    const updateCover = (e) => {
        e.preventDefault()
        const profileImg = {}
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0]
            setIsLoading(true)
            const data = new FormData()
            data.append("file", img)
            data.append("upload_preset", "")
            // axios.post(deleteFromcloud,publicID).then((res)=>{
            //     console.log("Deleted..");
            // })
            // }
            axios.post(cloud, data).then((res) => {
                profileImg.image = res.data.secure_url
                profileImg.imagePID = res.data.public_id
                profileImg.option = "coverimage"
                console.log(profileImg, "checking");
                dispatch(uploadProfileImage({ profileImg })).then((res) => {
                    setIsLoading(false)
                    onchange()
                })
            })
        }
    }



    return (
        <div className='h-36 overflow-hidden flex justify-center items-center relative'>
            <div>
                <img src={url} alt='No Cover image' />
            </div>
            {isLoading && (
                <div className='absolute inset-0 bg-white bg-opacity-80 flex items-center z-10'>
                    <div className='inline-block mx-auto'>
                        <Loading />
                    </div>
                </div>
            )}
            {
                editable && (
                    <div className='absolute right-0 bottom-0 m-2'>
                        <label htmlFor='inpCover' className='cursor-pointer flex items-center gap-1 bg-white py-1 px-2 rounded-md  shadow-md shadow-black' >
                            <input type="file" id='inpCover' onChange={updateCover} className='hidden' />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                            </svg>

                            Change cover Image</label>
                    </div>
                )
            }
        </div >

    )
}

export default Cover
