import React, { useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { addReport } from '../redux/UserSlice'

function Report({ close, postid }) {
    const [reason, setReason] = useState("")

    const dispatch = useDispatch()
    const notifyReport = () => toast.success("Reported");
    const errNotifyReport = () => toast.success("Sorry Post not found ! ");
    const hasReportNotify = () => toast.success("Allready reported you ");
    // const getReport = (value) => {
    //     reason(value)
    // }

    const handleReport = () => {
        dispatch(addReport({ postid, reason })).then((res) => {
            console.log(res, "inside handle report");
            if(res.payload.has_report){
                hasReportNotify()
            }
            else if (!res.payload.report_post) {
                errNotifyReport()
            } else {
                console.log(res.payload, "after dispatch");
                notifyReport()
            }
        })
    }

    return (

        <div className='fixed inset-0 bg-black backdrop-blur-sm bg-opacity-30  flex justify-center items-center  z-50'>

            <Toaster toastOptions={{
                success: { style: { border: '2px solid black', padding: '16px' }, },
                error: { style: { background: 'red', }, },
            }} />
            <div className='bg-gray-900 rounded-md w-96 h-96 flex justify-center border-2  text-white'>

                <div className='px-6 py-5 rounded-md mt-5'>
                    <h1 className='font-bold text-3xl text-center text-gray-500'>Report</h1><hr />
                    <div className='mt-5 text-xl items-center font-sans'>
                        <div>
                            <input type="radio" value="spam" name="gender" onChange={(e) => {
                                setReason(e.target.value)
                            }} /> Spam
                        </div >
                        <div className='mt-3'>
                            <input type="radio" value="nudity" name="gender" onChange={(e) => {
                                setReason(e.target.value)
                            }} /> Nudity<br />
                        </div>
                        <div className='mt-3'>
                            <input type="radio" value="violence" name="gender" onChange={(e) => {
                                setReason(e.target.value)
                            }} /> Violece<br />
                        </div>
                        <div className='mt-3'>
                            <input type="radio" value="hatespeech" name="gender" onChange={(e) => {
                                setReason(e.target.value)
                            }} /> Hate speech<br />
                        </div>
                        <div className='mt-3'>
                            <input type="radio" value="dontlike" name="gender" onChange={(e) => {
                                setReason(e.target.value)
                            }} /> I just dont liked it<br />
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <button className=' bg-red-700 text-white px-6 py-1 rounded-md grow mt-5' onClick={() => {
                            close(false)
                        }}>
                            Close
                        </button>
                        <button className=' bg-green-700 text-white px-6 py-1 rounded-md grow  mt-5' onClick={() => {
                            // confirmReport(true)
                            handleReport()
                            close(false)
                        }}>
                            Report now
                        </button>
                    </div>
                </div>
            </div>


        </div >

    )
}

export default Report
