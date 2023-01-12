import { Avatar, Card } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUsers } from '../redux/UserSlice'

function Search() {
    const [search, setSearch] = useState("")
    const [users, setUsers] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        if (search) {
            dispatch(getUsers(search)).then((res) => {
                console.log(res.payload);
                setUsers(res.payload)
            })
        }
    }, [search])

    return (
        <div>
            <Card>
                <div className='mt-2 p-3'>
                    <div className='ml-11'>

                        <input value={search} onChange={(e) => {
                            setSearch(e.target.value)
                        }} className='p-2 w-11/12' placeholder='Search here...' />
                    </div>
                </div>
            </Card>
            {search && <div className='absolute ml-32 w-96 h-auto bg-blue-200 z-50'>
                {users?.map(obj => {
                    return (                        
                        <div key={obj._id} className='p-3'>
                           
                            <div className='flex  gap-3'>
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

        </div>

    )
}

export default Search
