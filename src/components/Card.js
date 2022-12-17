import React from 'react'

export default function Card({ children }) {
    return (
        <div className='bg-white shadow-md shadow-gray-300 rounded-md p-4 mb-5'>            
                { children }            
        </div>
    )
}

 