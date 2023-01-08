import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUser } from '../redux/UserSlice'
import Avatar from './Avatar'


function ChatBox({chat, currentuserid}) {
  const dispatch = useDispatch()
  const [userData, setUserData] = useState()
  const params = {
    userid: {
      id: ""
    }
  }
  useEffect(() => {
    params.userid.id = chat?.members?.find((id) => id !== currentuserid)
    dispatch(getUser(params)).then((res) => {
      setUserData(res?.payload?.otherDetails)
    }, [])
  })
  return (
    <div>
      <>
        <div className='hover:bg-slate-100 hover:cursor-pointer'>
          <div>
            <div className='flex items-center gap-2 mt-2'>
              <Avatar url={userData?.profilepic} />
              <div className='name font-semibold' >
                <span>{userData?.firstname + " " + userData?.lastname}</span><br />
              </div>
            </div>
          </div>

        </div>
        <hr />
      </>
    </div>
  )
}


export default ChatBox
