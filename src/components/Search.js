
import React, { useState, useEffect } from 'react'
import Avatar from './Avatar'
import Card from './Card'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUsers } from '../redux/UserSlice'
import OutsideClickHandler from 'react-outside-click-handler'
import { refr } from '../redux/PostSlice'

function Search() {
    const [search, setSearch] = useState("")
    const [users, setUsers] = useState([])
    const [ispop,setIspop]=useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if (search) {
            dispatch(getUsers(search)).then((res) => {
                setUsers(res.payload)
            })
        }
    }, [search])

    return (
        <div>

            <Card>

                <div className='ml-11 relative'>

                    <input value={search} onChange={(e) => {
                        setIspop(true)
                        setSearch(e.target.value)
                    }} className='p-2 w-11/12' placeholder='Search here...' />
                </div>

            </Card>
            <OutsideClickHandler onOutsideClick={(e) => { setIspop(false) }}>
                {search && ispop && <div className='absolute ml-32 w-96 h-auto bg-blue-900 text-white z-50 rounded-md'>
                    {users?.map(obj => {
                        return (
                            <div key={obj._id} className='p-3'>

                                <div className='flex  gap-3 cursor-pointer'>
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
