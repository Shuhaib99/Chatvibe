import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getFollowingUsers } from '../redux/UserSlice'
import Avatar from './Avatar'

function Following(props) {
    const [following, setFollowing] = useState([])

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getFollowingUsers(props.id)).then((res) => {
            console.log(res.payload.following, "GET FOLLOWERS");
            setFollowing(res.payload.following)
        })
    }, [])
    return (
        <div className=''>
            {following.map(obj => {
                return (
                    obj.following.map(obj => {
                        return (
                            <div key={obj._id} className='flex gap-4 items-center'>
                                <div className='pb-3'>
                                    <Avatar url={obj?.profilepic} />
                                </div>
                                <div>
                                    <h3 className='font-bold'>{obj?.firstname}</h3>
                                    {/* <div className='text-sm leading-3'>5 mutual friends</div> */}
                                </div>
                            </div>
                        )
                    })
                )
            })}

        </div>
    )
}

export default Following
