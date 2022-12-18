import React from 'react'
import Avatar from './Avatar'

function FriendsInfo() {
    return (
        <div className='flex gap-2'>
            <Avatar/>
            <div>
                <h3 className='font-bold'>Boyka Doe</h3>
                <div className='text-sm leading-3'>5 mutual friends</div>
            </div>
        </div>
    )
}

export default FriendsInfo
