import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getSavedPosts } from '../redux/UserSlice'
import Card from './Card'
import Layout from './Layout'
import PostFormCard from './PostFormCard'

function SavedPosts() {
    const [savedPosts, setSavedPosts] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        console.log("HELLLLLOOOO");
        dispatch(getSavedPosts()).then((res) => {
            console.log(res.payload.savedPosts, "savedposts");
            setSavedPosts(res.payload.savedPosts)
        })
    }, [])
    // console.log(savedPosts.savedPosts,"saveeeeeeeeeee");
    return (
        <div>
            <Layout>
                <PostFormCard />
                {savedPosts?.map(obj => {

                    return (
                        <Card key={obj._id}>
                            {obj?.savedposts.length === 0 ? <div className='text-center font-semibold'>No saved photos.</div> :
                                <div className='grid grid-cols-2 gap-4'>

                                    {obj?.savedposts?.map(obj => {
                                        return (
                                            <div key={obj._id} >
                                                <div className='my-3 text-sm'>
                                                    <p>{obj.description}</p>
                                                    <div className='rounded-md overflow-hidden h-48 flex items-center opacity-100 hover:opacity-80 transition duration-300 shadow-md cursor-pointer border-2 border-rose-600 '>
                                                        <img src={obj.images} alt='' />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                    }
                                </div>}
                        </Card>
                    )
                })
                }

            </Layout>
        </div>
    )
}

export default SavedPosts
