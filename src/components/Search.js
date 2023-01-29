
import React, { useState, useEffect } from 'react'
import Avatar from './Avatar'
import Card from './Card'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUsers } from '../redux/UserSlice'
import OutsideClickHandler from 'react-outside-click-handler'
import { refr } from '../redux/PostSlice'
import Logo from './Logo'

function Search() {
    const [search, setSearch] = useState("")
    const [users, setUsers] = useState([])
    const [ispop, setIspop] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if (search) {
            dispatch(getUsers(search)).then((res) => {
                setUsers(res.payload)
            })
        }
    }, [search])

    return (
        <div className='fixed z-50  w-full top-0  '>

            <Card>
                <div className='ml-11 relative flex'>
                    <div className=''>
                        <Logo />
                    </div>
                    <div className='w-full'>
                        <center>
                            <input value={search} onChange={(e) => {
                                setIspop(true)
                                setSearch(e.target.value)
                            }} className='p-2 w-11/12' placeholder='Search here...' />
                        </center>
                    </div>
                </div>

            </Card>
            <OutsideClickHandler onOutsideClick={(e) => { setIspop(false) }}>
                {search && ispop && <div className='absolute md:mx-24 w-80 ml-5 md:w-96 h-auto bg-blue-900 text-white z-50 rounded-md'>
                    {users?.map(obj => {
                        return (
                            <div key={obj._id} className='p-3'>

                                <div className='flex  gap-3 cursor-pointer hover:text-yellow-400 rounded-md'>
                                    <div>
                                        <Link to='/profile/' state={{ id: obj?._id }}>
                                            <Avatar url={obj?.profilepic} />
                                        </Link>
                                    </div>
                                    <div>
                                        <p className=' font-semibold mt-2'>{obj.firstname + " " + obj.lastname}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>}
            </OutsideClickHandler>
        </div>

    )
}

export default Search
