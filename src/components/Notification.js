import react,{useEffect,useState} from 'react'
import { useDispatch } from 'react-redux'
import { getCurrentUser } from '../redux/UserSlice'
import Card from './Card'
import Layout from './Layout'
import PostFormCard from './PostFormCard'

const Notification = () => {
const dispatch=useDispatch()
const [notification,setNotification]=useState([])

    useEffect(() => {
        dispatch(getCurrentUser({isNotify:"Notification"})).then((res) => {
            console.log(res, "GetCurrentUser");
            setNotification(res.payload.user)

        })
    }, [])

    return (
        <div>
            <Layout>
                <PostFormCard />
                <Card>
                    Notification
                </Card>
            </Layout>
        </div>
    )
}
export default Notification