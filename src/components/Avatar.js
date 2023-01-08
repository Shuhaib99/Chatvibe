import React, { useState } from 'react'
import axios from 'axios';
import { cloud } from '../constants'
import { useDispatch } from 'react-redux'
import { uploadProfileImage } from '../redux/UserSlice';
import Loading from './Loading';
import { style } from '@mui/system';

function Avatar({ size, url, editable, onchange }) {
    let width = 'w-12 h-12'
    if (size === 'lg') {
        width = 'h-32 w-32'
    }
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    function handleAvatar(e) {
        e.preventDefault()
        console.log("At first");
        const profileImg = {}
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0]
            setIsLoading(true)
            console.log("first");
            const data = new FormData()
            data.append("file", img)
            data.append("upload_preset", process.env.REACT_APP_CLOUDFOLDER_PROFILE)
            console.log("second");
            axios.post(cloud, data).then((res) => {
                profileImg.image = res.data.secure_url
                profileImg.imagePID = res.data.public_id
                profileImg.option = "avatar"
                console.log(profileImg, "checking");
                dispatch(uploadProfileImage({ profileImg })).then((res) => {
                    setIsLoading(false)
                    onchange()
                })
            })
        }
    }
    return (
        //rounded-md shadow-md transform skew-y-12  overflow-hidden
        <div className={`${width} relative`}>
            <div className="rounded-full overflow-hidden">
                {url ? <img src={url} alt='img' className= {`${width} object-cover  `} /> : <img src="../images/avatar.webp" className='w-full' alt='img' />}
            </div>
            {isLoading && (
                <div className='absolute inset-0 bg-white bg-opacity-80 flex items-center rounded-full'>
                    <div className='inline-block mx-auto'>
                        <Loading />
                    </div>
                </div>
            )}
            {
                editable && (
                    <label className='absolute bottom-0 right-0 shadow-md shadow-gray-500 p-2 bg-white rounded-full cursor-pointer'>
                        <input type="file" className='hidden' onChange={handleAvatar} />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>

                    </label>
                )
            }
        </div>

    )
}

export default Avatar
