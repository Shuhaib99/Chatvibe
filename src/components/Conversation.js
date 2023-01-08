import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUser } from '../redux/UserSlice'
import Avatar from './Avatar'

function Conversation({ data, currentuserid,online }) {
  const dispatch = useDispatch()
  const [userData, setUserData] = useState([])
  const params = {
    userid: {
      id: ""
    }
  }
  useEffect(() => {
    params.userid.id = data?.members?.find((id) => id !== currentuserid)
    dispatch(getUser(params)).then((res) => {
      setUserData(res.payload.otherDetails)

    })
  }, [data,currentuserid])
  // console.log(userData.profilepic,"res Connv");
  return (
    <>
      <div className='hover:bg-slate-100 hover:cursor-pointer'>
        <div>
          { online && <div className='rounded-full w-3 h-3 bg-green-600 absolute ml-9 z-10'></div> }
          <div className='flex items-center gap-2 mt-2'>
            <Avatar url={userData.profilepic} />
            <div className='name font-semibold' >
              <span>{userData?.firstname + " " + userData?.lastname}</span><br />
              <span className='font-normal text-xs text-gray-400'>{online ? "Online" : "Offline"}</span>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </>
  )
}

export default Conversation
