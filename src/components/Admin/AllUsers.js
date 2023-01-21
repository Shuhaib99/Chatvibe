
import react, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { blockOrUnBlockUsers, getAllUsers } from '../../redux/AdminSlice'
import Modal from '../Modal'
import Avatar from '../Avatar'

const AllUsers = () => {
    const [users, setUsers] = useState([])
    const [openModalBlock, setOpenModalBlock] = useState(false)
    const [confirmAction, setConfirmAction] = useState(false)
    const [confirmId, setConfirmId] = useState("")
    const [refresh, setRefresh] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllUsers()).then((res) => {
            //console.log(res.payload);
            setUsers(res.payload)
        })
    }, [refresh])

    const handleBlock_UnBlockUser = (userid, isblock) => {
        dispatch(blockOrUnBlockUsers({ userid: userid, isBlock: isblock })).then((res) => {
            console.log(res, "handle");
            setConfirmAction(false)
            setConfirmId("")
            setRefresh(!refresh)
        })
    }
    return (
        <div>
            {openModalBlock && <Modal closeModal={setOpenModalBlock} confirmModal={setConfirmAction} />}

            <table className='shadow-2xl  font-[popins] border-2 border-cyan-200 ml-9'>
                <thead className='text-white '>
                    <tr>
                        <th className='px-14 bg-cyan-800'>Name</th>
                        <th className='px-14 bg-cyan-800'>Email</th>
                        <th className='px-14 bg-cyan-800'>Followers</th>
                        <th className='px-14 bg-cyan-800'>Following</th>

                        <th className=' bg-cyan-800'>status</th>
                        <th className='px-10 bg-cyan-800'>Action</th>

                    </tr>
                </thead>
                <tbody className='text-cyan-900 text-center '>
                    {users.map(obj => {
                        return (
                            <tr key={obj._id} className=' duration-300 '>
                                <td>
                                    <div className='px-6  flex py-3'>
                                        <Avatar url={obj?.profilepic} />
                                        <span className='py-2 px-2'>{obj?.firstname + " " + obj?.lastname} </span>
                                    </div>
                                </td>
                                <td >{obj.email} </td>
                                <td>{obj.total_followers} </td>
                                <td >{obj.total_following} </td>

                                <td className='px-14 '>
                                    {!obj?.isBlock && <div className={`${!obj?.isBlock} text-green-500 font-extrabold rounded-md p-2 flex items-end gap-2`}>
                                        <div className=''>Active</div>

                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>

                                    </div>
                                    }

                                    {obj?.isBlock && <div className={`${!obj?.isBlock} text-red-500 font-extrabold rounded-md p-2 flex items-end gap-2`}>
                                        <div className=''>Blocked</div>

                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                            </svg>
                                        </div>

                                    </div>

                                    }
                                </td>

                                <td className='px-14'>

                                    {!obj?.isBlock ? <button className='bg-red-700 text-white rounded-full  items-center cursor-pointer flex' onClick={() => {
                                        setConfirmId(obj?._id)

                                        setOpenModalBlock(true)
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                        </svg>

                                    </button>
                                        :
                                        <button className='bg-green-700 text-white rounded-full  items-center cursor-pointer  flex' onClick={() => {
                                            setConfirmId(obj?._id)
                                            setOpenModalBlock(true)
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>

                                        </button>

                                    }

                                    {confirmId === obj?._id && confirmAction && handleBlock_UnBlockUser(obj._id, obj.isBlock)}

                                </td>

                            </tr>
                        )
                    })}

                </tbody>
            </table >


        </div >
    )
}
export default AllUsers