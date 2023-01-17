import React, { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts, likePosts, commentPost, deletePost, savePosts } from '../redux/PostSlice'
import { getCurrentUser, getPostsById, addProfileId, addReport } from '../redux/UserSlice'
import InputEmoji from 'react-input-emoji'
import Avatar from './Avatar'
import Card from './Card'
import Moment from 'react-moment'
import '../App.css'
import Loading from './Loading';
import Modal from './Modal'
import OutsideClickHandler from 'react-outside-click-handler'
import toast, { Toaster } from 'react-hot-toast';
import Report from './Report'
// import { refr } from '../redux/PostSlice'
// import Profile from './Profile'

function PostCard(props) {
    // console.log(props.userid.id, "props");
    const dispatch = useDispatch()

    //const params = useParams()

    const [likes, setLikes] = useState([])
    const [user, setUser] = useState("")
    const [currentuser, setCurrentUser] = useState("")
    const [posts, setPosts] = useState([])
    const [commentText, setCommentText] = useState('')
    const [refresh, setRefresh] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [userProfile, setUserProfile] = useState(false)
    const [isPopup, setIsPOp] = useState("")
    const [openModal, setOpenModal] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [reportForm, setReportForm] = useState(false)
    const [report, setReport] = useState("")
    const [reportHandle,setReportHanle]=useState("")
    const [confirmSendReport, setConfirmSendREport] = useState(false)
    let likesArr = useSelector(state => state.postSlice.likes)
    const formref = useRef(null)
    // const btnRef = useRef()
    const notify = () => toast.success("Successfully added");
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
        dispatch(getCurrentUser()).then((res) => {
            setCurrentUser(res.payload.user)

        })
    }, [])

    // useEffect(() => {
    //     const closeButton = e => {
    //         if (e.path[0] !== btnRef.current) {
    //             setIsPOp(false)
    //         }
    //     }
    //     document.body.addEventListener('click', closeButton)
    //     return () => document.body.addEventListener('click', closeButton)
    // }, [isPopup])

    useEffect(() => {
        if (!props?.userid) {
            setIsLoading(true)
            dispatch(getPosts()).then((res) => {

                // console.log(res.payload, "then() Fetch posts");
                setPosts(res.payload.posts)
                setUser(res.payload.userid)
                setUserProfile(false)
                setIsLoading(false)
            })

        } else {
            setIsLoading(true)
            // console.log("Postcard test");
            //console.log(props?.userid?.id, "props profile");
            dispatch(getPostsById(props?.userid?.id)).then((res) => {
                //console.log(res.payload, "Profile post");
                setPosts(res.payload.posts)
                setUser(res.payload.userid)
                setUserProfile(true)
                setIsLoading(false)
            })

        }

    }, [likes, refresh, refrsh,confirmDelete])



    const handleSubmit = (e, id) => {
        e.preventDefault()
        if (commentText) {
            dispatch(commentPost({ commentText, id }))
                .then((res) => {
                    setCommentText("")
                    refresh ? setRefresh(false) : setRefresh(true)
                });
        }
    }

    const handleDelete = (postid) => {
        dispatch(deletePost({ postid,isSuper:false }))
            .then((res) => {

                console.log("deleted");
                setConfirmDelete(false)
            });
    }

    const handleSavePost = (postid) => {
        console.log(postid, "savepost");
        dispatch(savePosts({ postid: postid, savedpostdelete: false })).then((res) => {
            console.log(res);
            notify()
        })
    }

    const handleReport = (postid,reason)=>{
        console.log("inside handle Report");
        dispatch(addReport({postid,reason})).then((res)=>{
            console.log(res.payload);
            setConfirmSendREport(false)
            notify()
        })
    }

    return (
        <div>
            <Toaster toastOptions={{
                success: { style: { border: '2px solid black', padding: '16px' }, },
                error: { style: { background: 'red', }, },
            }} />

            {isLoading && (
                <div className=' flex items-center'>
                    <div className='mx-auto'>
                        <Loading />
                    </div>
                </div>
            )}

            {openModal && <Modal closeModal={setOpenModal} confirmModal={setConfirmDelete} />}
           
            {reportForm && <Report close={setReportForm} reason={setReport} confirmReport={setConfirmSendREport}/>}
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

                        <button onClick={() =>
                            setIsPOp(obj._id)

                        } className='text-gray-400'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                        </button>


                        <div className='relative'>
                            {isPopup === obj._id && <div className=' bg-slate-300  rounded-md w-44 -ml-40 top-8 absolute '>
                                <OutsideClickHandler onOutsideClick={(e) => { !openModal && !reportForm && setIsPOp("") }}>
                                    {user === obj.userid._id && <button onClick={() => {
                                        setOpenModal(true)

                                    }} className=' px-6 py-1  rounded-md w-44 mt-1 hover:bg-slate-200   flex gap-3'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                        </svg>
                                        Delete
                                    </button>}
                                    {confirmDelete && handleDelete(obj._id)}
                                  

                                    {user !== obj.userid._id && <button onClick={() => {
                                        handleSavePost(obj._id)
                                    }} className=' px-6 py-1  rounded-md w-44 mt-1 hover:bg-slate-200 flex gap-3'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                        </svg>
                                        Save
                                    </button>}
                                    {user !== obj.userid._id && <button onClick={() => {
                                         setReportForm(true)
                                    }} className=' px-6 py-1  rounded-md w-44 mt-1 hover:bg-slate-200 flex gap-3'>
                                        {confirmSendReport && handleReport(obj._id,report) }
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
                                        </svg>

                                        Report
                                    </button> }
                                </OutsideClickHandler>
                                 
                            </div>}
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

                        {/* <button className='flex gap-2 items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                            </svg>4
                        </button> */}
                    </div>
                    {
                        obj?.comments.length > 0 ? <div className=' overflow-auto h-40 rounded-md postComments'>
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
                        </div> : ""
                    }

                    {
                        !userProfile && <div className='flex mt-4 gap-3'>
                            <div>
                                <Avatar url={currentuser.profilepic} />
                            </div>
                            <div className='border grow rounded-full relative'>
                                <form action="" onSubmit={(e) => { handleSubmit(e, obj._id); }}>
                                    <input ref={formref}
                                        className='block w-full p-3 px-4 overflow-hidden h-12 ' placeholder='Leave a comment'
                                        name="comment"
                                        value={commentText}

                                        onChange={(e) => { setCommentText(e.target.value) }}
                                    />
                                    {/* <InputEmoji
                                        ref={formref}
                                        value={commentText}
                                        onChange={setCommentText}
                                        placeholder='Leave a comment'
                                    /> */}

                                    <button type='submit' className='absolute top-3 right-3 text-gray-400'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                        </svg>
                                    </button>

                                </form>



                            </div>
                        </div>
                    }
                </Card>
            })
            }
        </div >
    )
}

export default PostCard
