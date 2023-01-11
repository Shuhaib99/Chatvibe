import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getFollowers } from '../redux/UserSlice'
import Avatar from './Avatar'

function Followers(props,refresh) {
    const [followers, setFollowers] = useState([])

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getFollowers(props.id)).then((res) => {
            console.log(res.payload.followers, "GET FOLLOWERS");
            setFollowers(res.payload.followers)
        })
    }, [refresh])
    return (
        <div className='flex gap-2'>
            {followers.map(obj => {
                return (
                    obj.followers.map(obj => {
                        return (
                            <div>
                                <div key={obj._id} className='flex gap-4'>
                                    <Avatar url={obj?.profilepic} />
                                    <div>
                                        <h3 className='font-bold'>{obj?.firstname}</h3>
                                        {/* <div className='text-sm leading-3'>5 mutual friends</div> */}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )
            })}

        </div>
    )
}

export default Followers
