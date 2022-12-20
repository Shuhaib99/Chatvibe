import React from 'react'

function Avatar({size,url}) {
    let width = 'w-12'
    if (size === 'lg') {
        width = 'w-36'
    }
    return (

        <div className={`${width} rounded-full overflow-hidden`}>
            <img src="https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg" alt='img' />
        </div>

    )
}

export default Avatar
