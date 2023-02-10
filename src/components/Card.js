import React from 'react'

export default function Card({ children,noPadding }) {
    let cardClass='bg-white shadow-md shadow-gray-300 md:rounded-md md:mb-5 '
    if(!noPadding){
        cardClass += 'md:p-4'
    }
    return (
        <div className={cardClass}>            
                { children }
        </div>
    )
}

 