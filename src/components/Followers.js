import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFollowers } from '../redux/UserSlice'
import Avatar from './Avatar'

function Followers(props) {
    const [followers, setFollowers] = useState([])

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getFollowers(props.id)).then((res) => {
            //console.log(res.payload.followers, "GET FOLLOWERS");
            setFollowers(res.payload.followers)
        })
    }, [props])
    return (
        <div className=''>
            {followers.map(obj => {
                return (
                    obj.followers.map(obj => {
                        return (
                            <div key={obj._id}>
                                <div key={obj._id} className='flex gap-4 items-center'>
                                    <div className='pb-3'>
                                        <Avatar url={obj?.profilepic} />
                                    </div>
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
