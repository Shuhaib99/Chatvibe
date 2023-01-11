import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getSavedPosts } from '../redux/UserSlice'
import Card from './Card'
import Layout from './Layout'
import PostFormCard from './PostFormCard'

function SavedPosts() {
    const [savedPosts, setSavedPosts] = useState("")
    const dispatch = useDispatch()
    useEffect(() => {
        console.log("HELLLLLOOOO");
        dispatch(getSavedPosts()).then((res) => {
            console.log(res, "savedposts");
            // setSavedPosts(res.payload.user.savedPosts)
        })
    }, [])

    return (
        <div>
            <Layout>
                <PostFormCard />
                {/* {savedPosts?.map(obj => {
                    return <div>
                        <Card key={obj._id} >
                            <div className='flex gap-3'>
                            </div>
                            <div>
                                <div className='my-3 text-sm'>
                                    <p>{obj.description}</p>
                                    <div className='rounded-md overflow-hidden'>
                                        <img src={obj.images} alt='' />
                                    </div>
                                </div>
                            </div>

                        </Card>
                    </div>
                })
                } */}
            </Layout>
        </div>
    )
}

export default SavedPosts
