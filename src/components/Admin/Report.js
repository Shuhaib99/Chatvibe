
import react, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { date } from 'yup'
import { getReport } from '../../redux/UserSlice'
import Avatar from '../Avatar'

// import { useTable } from 'react-table'

const Report = () => {
    const [reports, setReports] = useState([])
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
    }, [])
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
            <table className='shadow-2xl  font-[popins] border-2 border-cyan-200'>
                <thead className='text-white'>
                    <tr>
                        <th className=' bg-cyan-800'>Reporter</th>
                        <th className=' bg-cyan-800'>Posted user</th>
                        <th className=' bg-cyan-800'>Reason</th>
                        <th className=' bg-cyan-800'>Date</th>
                        <th className=' bg-cyan-800'>Options</th>

                    </tr>
                </thead>
                <tbody className='text-cyan-900 text-center'>
                    {reports.map(obj => {
                        return (
                            <tr key={obj._id} className='bg-cyan-200  duration-300'>

                                <td>
                                    <div className='px-6  flex py-3'>
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
                                <td className='px-6'>{obj?.createdAt}</td>
                                <td >
                                    <div className='px-6 flex gap-2'>
                                        <button className='bg-gray-800 text-white rounded-full p-2 cursor-pointer'>Deline</button>
                                        <button className='bg-gray-800 text-white rounded-full p-2 cursor-pointer'>Remove Post</button>
                                    </div>
                                </td>

                            </tr>)
                    })}
                </tbody>
            </table>
        </div>)
}
export default Report 