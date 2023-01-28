import React from 'react'
import Navigation from './Navigation'
function Layout({ children }) {
    return (
        <div>
            <div className='md:flex mt-4 max-w-4xl mx-auto gap-6 mb-24 md:mb-0'>
                <div className='fixed md:static w-full bottom-0 md:w-3/12 -mb-5 z-50'>
                    <Navigation />
                </div>
                <div className='mx-4 md:mx-16  md:w-9/12'>
                    <div className='md:hidden'>
                        <h2 className='text-orange-700 text-3xl font-bold  text-center mb-0'>
                            Chatvibe </h2>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout
