import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { savePosts } from '../redux/PostSlice'
import { getSavedPosts } from '../redux/UserSlice'
import Card from './Card'
import Layout from './Layout'
import Modal from './Modal'
import PostFormCard from './PostFormCard'
import Search from './Search'

function SavedPosts() {
    const [savedPosts, setSavedPosts] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [deleteItem, setdeleteItem] = useState("")

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getSavedPosts()).then((res) => {
            console.log(res.payload.savedPosts, "savedposts");
            setSavedPosts(res.payload.savedPosts)
        })
    }, [confirmDelete])

    const handleDeleteSavedPost = (postid) => {
        console.log(postid, "test");
        dispatch(savePosts({ postid: postid, savedpostdelete: true })).then((res) => {
            setConfirmDelete(false)
        })
    }
    return (
        <div>
            <Search />
            <div className='md:mt-32'>
                <Layout>
                    {/* <Search /> */}
                    <PostFormCard />
                    {openModal && <Modal closeModal={setOpenModal} confirmModal={setConfirmDelete} />}
                    {savedPosts?.map(obj => {

                        return (
                            <Card key={obj._id}>
                                {obj?.savedposts.length === 0 ? <div className='text-center font-semibold'>No saved photos.</div> :
                                    <div className='grid grid-cols-2 gap-4'>
                                        {obj?.savedposts?.map(obj => {
                                            return (

                                                <div key={obj._id} >
                                                    <div className='rounded-md  transition duration-300 shadow-md cursor-pointer border-2 '>
                                                        <div className='z-50'>
                                                            <button className='ml-auto' onClick={() => {
                                                                setdeleteItem(obj._id)
                                                                setOpenModal(true)
                                                            }}>
                                                                {deleteItem === obj._id && confirmDelete && handleDeleteSavedPost(obj._id)}
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-red-700 w-6 h-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                            </button>

                                                        </div>

                                                        <div className='text-sm '>

                                                            <div className='h-48 overflow-auto postComments items-center opacity-100 hover:opacity-80'>
                                                                <p>{obj.description}</p>
                                                                <img src={obj.images} alt='' />

                                                            </div>

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
        </div>
    )
}

export default SavedPosts
