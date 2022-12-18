import React from 'react'
import Navigation from './Navigation'
function Layout({children}) {
    return (
        <div>
            <div className='flex mt-4 max-w-4xl mx-auto gap-6'>
                <div className='w-3/12'>
                    <Navigation />
                </div>
                <div className='w-9/12'>
                  {children}
                </div>
            </div>
        </div>
    )
}

export default Layout
