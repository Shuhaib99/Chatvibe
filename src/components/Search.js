
import React, { useState, useEffect } from 'react'
import Avatar from './Avatar'
import Card from './Card'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getUsers } from '../redux/UserSlice'
import OutsideClickHandler from 'react-outside-click-handler'
// import { refr } from '../redux/PostSlice'
import Logo from './Logo'
import { chatAction, createChat } from '../redux/ChatSlice'
import Chat from './Chat/Chat'


function Search({ isChat }) {
    const [search, setSearch] = useState("")
    const [users, setUsers] = useState([])
    const [ispop, setIspop] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (search) {
            dispatch(getUsers(search)).then((res) => {
                setUsers(res.payload)
            })
        }
    }, [search])

    function handleChat(recieverid) {        
        // dispatch(createChat({ recieverid: recieverid })).then((res) => {
        //     console.log(res.payload);
        //     if (res.payload.result) {
                dispatch(chatAction(recieverid))
                navigate('/chat')
            // }
            setIspop(false)
        // }) 
    }

    return (
        <div>
            <div className='md:fixed z-50  w-full top-0'>
                <Card>
                    <div className='ml-11 flex'>
                        <div className=''>
                            <Logo />
                        </div>

                        <div className='relative md:w-[30%] flex items-center md:ml-auto'>
                            <input value={search} onChange={(e) => {
                                setIspop(true)
                                setSearch(e.target.value)
                            }} className='p-2 w-11/12 border-2 rounded-full px-5' placeholder="Search here..." />
                        </div>


                    </div>
                </Card>

                <OutsideClickHandler onOutsideClick={(e) => { setIspop(false) }}>
                    {search && ispop &&
                        <div className='absolute md:static z-50 w-full md:ml-auto -mt-4 md:w-[30%] h-auto bg-black/70 text-white rounded-md'>
                            {users?.map(obj => {
                                return (
                                    <div key={obj._id} className='p-3'>

                                        <div className='flex  gap-3 cursor-pointer hover:text-yellow-400 rounded-md'>
                                            <div>
                                                <Link to='/profile/' state={{ id: obj?._id }}>
                                                    <div className='flex gap-5'>
                                                        <Avatar url={obj?.profilepic} />
                                                        <p className=' font-semibold mt-2'>{obj.firstname + " " + obj.lastname}</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div>

                                            </div>
                                            <div className='flex justify-center items-center ml-auto text-green-400  h-10 w-10 rounded-full bg-black hover:text-yellow-400'
                                                onClick={() => { handleChat(obj._id) }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                                </svg>
                                            </div>
                                        </div>

                                    </div>
                                )
                            })}
                        </div>
                    }
                </OutsideClickHandler>
            </div>
        </div>
    )
}

export default Search
