import React, { useState } from 'react'

function AdminHome() {
    const [open, setOpen] = useState(true)
    return (
        <div className='flex'>
            <div className={`${open ? "w-72" : "w-20"} text-lg  p-20 pt-28 duration-300  h-screen bg-gray-900 relative text-white`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                    className={`w-9 h-9 absolute cursor-pointer border-2 -right-3 top-9 bg-gray-900 rounded-full ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />

                </svg>

                <div className='flex gap-x-3 items-center p-3 hover:bg-gray-500 rounded-md cursor-pointer'>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer duration-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>

                    </div>
                    <div className={`duration-300 ${!open && "scale-0"} `} >
                        Home
                    </div>
                </div>
                <div className='flex gap-x-3 items-center p-3 hover:bg-gray-500 rounded-md cursor-pointer duration-300'>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer duration-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                        </svg>
                    </div>
                    <div className={`duration-300 ${!open && "scale-0"}`}>
                        Users
                    </div>
                </div>
                <div className='flex gap-x-3 items-center p-3 hover:bg-gray-500 rounded-md cursor-pointer'>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
                        </svg>

                    </div>
                    <div className={`duration-300 ${!open && "scale-0"}`}>
                        Report
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminHome
