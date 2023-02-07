import Chat from './Chat/Chat'
import React, { useState } from 'react'
import Navigation from './Navigation'
import { useDispatch, useSelector } from 'react-redux'

function Layout({ children }) {
    const dispatch = useDispatch()
    const [isChats, setChats] = useState(false)
    const chatActn = useSelector(state => state.chatSlice.isChat)
    return (
        <div>
            {/* <div className='md:flex mt-4 max-w-4xl mx-auto gap-6 mb-24 md:mb-0'>
                <div className='fixed md:static w-full bottom-0 md:w-3/12 -mb-5 z-50'>
                    <Navigation />
                </div>
                <div className='mx-4 md:mx-16  md:w-9/12'>
                   
                    {children}
                </div>
            </div> */}
            <div className='w-full fixed bottom-5 -ml-5 '>            
                <div className='bg-black z-[999] ml-auto rounded-full h-14 w-14 text-green-400 flex justify-center items-center cursor-pointer hover:text-yellow-400' onClick={() => { isChats ? setChats(false) : setChats(true) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                    </svg>

                </div>
                {isChats  &&<div className='z-50'>
                    <Chat />
                </div>}
            </div>

            <div className='md:flex mt-4 max-w-4xl mx-auto gap-6 mb-24 md:mb-0'>
                <div className='fixed md:static w-full bottom-0 md:w-3/12 -mb-5'>
                    <Navigation />
                </div>
                <div className='mx-4 md:mx-16  md:w-9/12'>

                    {children}
                </div>


            </div>
        </div>

    )
}

export default Layout
