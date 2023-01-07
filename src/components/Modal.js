import React, { useState } from 'react';

function Modal({ closeModal, confirmModal }) {

    return (//bg-black/90 w-full  text-white h-sreen
        <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center  z-50'>
            {console.log("Inside modal")}
            <div className='bg-white rounded-md'>
                <div className='px-6 py-5 rounded-md '>
                    <h1 className='font-bold text-center'>Delete</h1>
                    <h1>Are you sure You want to continue?</h1>
                </div> 
                <div className='px-11 py-2'>
                    <button className=' bg-red-600 text-white px-6 py-1 rounded-md '
                        onClick={() => {
                            closeModal(false)
                        }} id='cancelBtn'>Cancel</button>

                    <button onClick={() => {

                        confirmModal(true)
                        closeModal(false)
                    }} id='confirmlBtn' className='ml-1 bg-socialBlue text-white px-6 py-1 rounded-md '>Continue</button>
                </div>
            </div>
        </div >
    )
}

export default Modal;