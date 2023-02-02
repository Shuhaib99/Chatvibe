
import react, { useState, useEffect } from 'react'
import moment from 'moment'

import { useDispatch } from 'react-redux'
import Avatar from '../Avatar'
import { deletePost } from '../../redux/PostSlice'
import Modal from '../Modal'
import { getReport,deleteReport } from '../../redux/AdminSlice'

// import { useTable } from 'react-table'

const Report = () => {
    const [reports, setReports] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [openModalDecline, setOpenModalDecline] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [confirmDecline, setConfirmDecline] = useState(false)
    const [reportID, setReportID] = useState("")
    const [postID, setPostID] = useState("")
    const dispatch = useDispatch()
    // const {
    //     getTableProps,
    //     getTableBodyProps,
    //     headerGroups,
    //     rows,
    //     prepareRow,
    // } = useTable({
    //     columns,
    //     data
    // })
    useEffect(() => { 
        dispatch(getReport()).then((res) => {
            console.log(res.payload, "Reports");
            setReports(res.payload.report)
        })

    }, [confirmDelete, confirmDecline])

    const handleDeletePost = (postid, reportId) => {
        console.log("handle delete");
        dispatch(deletePost({ postid, isSuper: reportId })).then((res) => {
            console.log(res);
            setConfirmDelete(false)
            setPostID("")
        })

    }

    const handleDeleteReport = (reportid) => {
        dispatch(deleteReport(reportid)).then((res) => {
            console.log("Deleted");
            setConfirmDecline(false)
            setReportID("")
        })
    }
    return (
        <div>

            {/* <table {...getTableProps()}>
                <thead>
                    {headerGroups?.map((headerGroup) => (


                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup?.headers?.map(column => (
                                <th {...column?.getHeaderProps()}>{column?.render('Header')}</th>
                                
                            ))}
                        </tr>))}
                </thead>

                <tbody {...getTableBodyProps()}>
                    {rows?.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row?.getRowProps()}>
                                {
                                    row?.cells?.map((cell) => {
                                        return <td {...cell?.getCellProps()}>{cell?.render('cell')}</td>
                                    })}
                            </tr>
                        )
                    })}
                </tbody>
            </table> */}
            {openModalDecline && <Modal closeModal={setOpenModalDecline} confirmModal={setConfirmDecline} />}
            {openModal && <Modal closeModal={setOpenModal} confirmModal={setConfirmDelete} />}
            {/* <div className='overflow-auto h-96'> */}
            <table className='shadow-2xl  font-[popins] border-2 border-cyan-200 '>
                <thead className='text-white '>
                    <tr>
                        <th className='px-14 bg-cyan-800'>Reporter</th>
                        <th className='px-14 bg-cyan-800'>Posted user</th>
                        <th className='px-14 bg-cyan-800'>Reason</th>
                        <th className='px-14 bg-cyan-800'>Reported Date</th>
                        <th className='px-14 bg-cyan-800'>Options</th>

                    </tr>
                </thead>


                <tbody className='text-cyan-900 text-center '>
                    {reports.map(obj => {
                        return (

                            <tr key={obj._id} className=' duration-300'>
                                <td>
                                    <div className='px-6  flex py-3 truncate'>
                                        <Avatar url={obj?.userid?.profilepic} />
                                        <span className='py-2 px-2'>{obj?.userid?.firstname + " " + obj.userid.lastname} </span>
                                    </div>
                                </td>

                                <td >
                                    <div className='px-6 flex'>
                                        <Avatar url={obj?.postid?.userid?.profilepic} />
                                        <span className='py-2 px-2'>{obj?.postid?.userid?.firstname + " " + obj?.postid?.userid?.lastname} </span>
                                    </div>
                                </td>
                                <td className='px-6'>{obj?.reason}</td>
                                <td className='px-6'>{moment(obj?.createdAt).format('DD/MM/YYYY')}</td>
                                <td >
                                    <div className='px-6 flex gap-2 truncate'>
                                        <button className='bg-red-700 text-white rounded-full p-2 cursor-pointer flex' onClick={() => {
                                            setReportID(obj._id)
                                            setOpenModalDecline(true)
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                            </svg>

                                            Decline</button>

                                        {reportID === obj._id && confirmDecline && handleDeleteReport(obj._id)}
                                        
                                        <button className='bg-green-900 text-white rounded-full p-2 cursor-pointer flex' onClick={() => {
                                            setPostID(obj?._id)
                                            setOpenModal(true)
                                            
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Remove Post</button>
                                            { postID === obj._id && confirmDelete && handleDeletePost(obj?.postid?._id, obj?._id) }
                                    </div>
                                </td>

                            </tr>)
                    })}
                </tbody>
            </table>
            {/* </div> */}

        </div >)
}
export default Report 