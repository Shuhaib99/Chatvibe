import react, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getNotification } from '../redux/UserSlice'
import Card from './Card'
import Layout from './Layout'
import PostFormCard from './PostFormCard'
import Avatar from './Avatar'
import Moment from 'react-moment'
import Search from './Search'

const Notification = () => {
    const dispatch = useDispatch()
    const [notification, setNotification] = useState([])

    useEffect(() => {
        const isNotify = { isNotify: "Notification" }
        dispatch(getNotification()).then((res) => {
            console.log(res, "GetCurrentUser");
            setNotification(res.payload.notification.notification)

        })
    }, [])

    return (
        <div>
            <Search />
            <div className='md:mt-32'>
                <Layout>
                    <PostFormCard />
                    <Card>
                        <div>
                            {
                                notification.map(obj => {
                                    return (
                                        <div key={obj?.time} >
                                            <div className='flex gap-4 items-center bg-gray-700 text-white rounded-lg p-2 mb-2 hover:translate-y-1  duration-500'>
                                                <div>
                                                    <Avatar url={obj?.profilepic} />
                                                </div>
                                                <div>
                                                    <h3 className='text-xs break-normal'>{obj?.message}</h3>
                                                </div>
                                                <div className='text-zinc-300 text-xs'>
                                                    <Moment fromNow>{obj?.time}</Moment>
                                                </div>
                                                <div className='ml-auto'>
                                                    <img src={obj?.postpic} alt='' className='rounded-full w-10 h-10' />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </Card>
                </Layout>
            </div>
        </div>
    )
}
export default Notification