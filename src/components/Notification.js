import react,{useEffect} from 'react'
import Card from './Card'
import Layout from './Layout'
import PostFormCard from './PostFormCard'

const Notification = () => {
    useEffect(() => {
        
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