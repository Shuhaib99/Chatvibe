import React, { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts, likePosts, commentPost } from '../redux/PostSlice'
import { getPostsById } from '../redux/UserSlice'
import Avatar from './Avatar'
import Card from './Card'
import Moment from 'react-moment'
import '../App.css'
import Loading from './Loading';
// import { refr } from '../redux/PostSlice'
// import Profile from './Profile'

function PostCard(props) {
    // console.log(props.userid.id, "props");
    const dispatch = useDispatch()

    //const params = useParams()
    const [likes, setLikes] = useState([])
    const [user, setUser] = useState("")
    const [posts, setPosts] = useState([])
    const [commentText, setCommentText] = useState('')
    const [refresh, setRefresh] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    let likesArr = useSelector(state => state.postSlice.likes)
    const formref = useRef(null)
    let refrsh = useSelector(state => state.postSlice.refresh)
    // const user=useSelector(currentUser)
    // const isLikedByMe = !!likes.find(like => likes.userid === user)
    // console.log(refresh,"testrefresh"); 

    // dispatch(refr())
    function likeThisPost(postid) {

        dispatch(likePosts({ postid })).then((res) => {
            setLikes(likesArr)
        })
    }

    useEffect(() => {
        if (!props?.userid) {
            setIsLoading(true)
            dispatch(getPosts()).then((res) => {

                // console.log(res.payload, "then() Fetch posts");
                setPosts(res.payload.posts)
                setUser(res.payload.userid)
                setIsLoading(false)
            })

        } else {
            setIsLoading(true)
            // console.log("Postcard test");
            // console.log(props?.userid?.id, "props profile");
            dispatch(getPostsById(props?.userid?.id)).then((res) => {

                setPosts(res.payload.posts)
                setUser(res.payload.userid)
                setIsLoading(false)
            })

        }

    }, [likes, refrsh])



    const handleSubmit = (e, id) => {

        e.preventDefault()
        dispatch(commentPost({ commentText, id }))
            .then((res) => {
                setCommentText("")
                refresh ? setRefresh(false) : setRefresh(true)
            });

    }


    return (
        <div>
            {isLoading && (
                <div className=' flex items-center'>
                    <div className='mx-auto'>
                        <Loading />
                    </div>
                </div>
            )}
            {posts?.map(obj => {
                return <Card key={obj._id} >
                    <div className='flex gap-3'>
                        <div>
                            <Link to='/profile/' state={{ id: obj?.userid._id }}>
                                <Avatar url={obj?.userid.profilepic} />
                            </Link>
                        </div>
                        <div className='grow'>
                            <Link to="/profile" className='font-semibold'>{obj.userid.firstname + " " + obj.userid.lastname} </Link> shared a
                            <Link to="" className='text-socialBlue'> album</Link>
                            <p className='text-gray-500 text-sm'> <Moment fromNow>{obj.createdAt}</Moment></p>
                        </div>
                        <div>
                            <button className='text-gray-400'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div>
                        <div className='my-3 text-sm'>
                            <p>{obj.description}</p>
                            <div className='rounded-md overflow-hidden'>
                                <img src={obj.images} alt='' />
                            </div>
                        </div>
                    </div>
                    <div className='mt-5 flex gap-8'>
                        <button onClick={() => {
                            likeThisPost(obj._id)

                        }} className='flex gap-2 items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={obj.likes.includes(user) ? "w-6 h-6 fill-red-500" : "w-6 h-6"}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>{obj?.likes?.length}
                        </button>

                        <button onClick={() => {

                        }} className='flex gap-2 items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                            </svg>{obj.comments.length}
                        </button>

                        <button className='flex gap-2 items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                            </svg>4
                        </button>
                    </div>
                    {obj?.comments.length > 0 ? <div className=' overflow-auto h-40 rounded-md postComments'>
                        {
                            obj?.comments?.slice(0).reverse().map(comment => {

                                return comment?.commentby?._id === user ?
                                    <div key={comment?._id} className='flex flex-row-reverse mt-2 gap-2 items-center'>
                                        <div>
                                            <Avatar url={comment?.commentby?.profilepic} /></div>
                                        <div className='bg-green-300  w-64   rounded-3xl py-2 px-4 '>
                                            <span className='font-semibold mr-1'>
                                                {comment?.commentby?.firstname}</span>
                                            <span className='text-sm text-gray-500'><Moment fromNow>{comment?.createdAt}</Moment></span><br />

                                            <p className='text-sm'>{comment?.comment}</p>
                                        </div>
                                    </div>
                                    :
                                    <div key={comment?._id} className='flex gap-2 items-center mt-2'>
                                        <div> <Avatar url={comment?.commentby?.profilepic} /></div>

                                        <div className='bg-gray-200 w-64 rounded-3xl py-2 px-4 '>
                                            <span className='font-semibold mr-1'>
                                                {comment?.commentby?.firstname}</span>
                                            <span className='text-sm text-gray-500'><Moment fromNow>{comment?.createdAt}</Moment></span><br />

                                            <p className='text-sm'>{comment?.comment}</p>

                                        </div>
                                    </div>


                            })
                        }
                    </div> : ""}

                    <div className='flex mt-4 gap-3'>
                        <div>
                            <Avatar />
                        </div>
                        <div className='border grow rounded-full relative'>
                            <form action="" onSubmit={(e) => { handleSubmit(e, obj._id); }}>
                                <input ref={formref}
                                    className='block w-full p-3 px-4 overflow-hidden h-12 ' placeholder='Leave a comment'
                                    name="comment"
                                    value={commentText}

                                    onChange={(e) => { setCommentText(e.target.value) }}
                                />

                                <button type='submit' className='absolute top-3 right-3 text-gray-400'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                    </svg>

                                </button>
                            </form>



                        </div>
                    </div>
                </Card>
            })
            }
        </div >
    )
}

export default PostCard
