import React from 'react'

function Report({ close,report }) {
    const getReport=(value)=>{
        // report=value
        console.log(value);
    }
    return (

        <div className='fixed inset-0 bg-black backdrop-blur-sm bg-opacity-30  flex justify-center items-center  z-50'>
            <div className='bg-gray-600 rounded-md w-96 h-96 flex justify-center border-2 border-white '>
                <div className='px-6 py-5 rounded-md mt-5'>
                    <h1 className='font-bold text-3xl text-center'>Report</h1><hr />
                    <div className='mt-5 text-xl items-center'>
                        <div>
                            <input type="radio" value="spam" name="gender" onChange={(e)=>{
                                getReport(e.target.value)
                            }} /> Spam
                        </div >
                        <div className='mt-3'>
                            <input type="radio" value="nudity" name="gender" onChange={(e)=>{
                                getReport(e.target.value) }}/> Nudity<br />
                        </div>
                        <div className='mt-3'>
                            <input type="radio" value="violence" name="gender" onChange={(e)=>{
                                getReport(e.target.value) }}/> Violece<br />
                        </div>
                        <div className='mt-3'>
                            <input type="radio" value="hatespeech" name="gender" onChange={(e)=>{
                                getReport(e.target.value) }}/> Hate speech<br />
                        </div>
                        <div className='mt-3'>
                            <input type="radio" value="dontlike" name="gender" onChange={(e)=>{
                                getReport(e.target.value) }}/> I just dont liked it<br />
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <button className=' bg-red-600 text-white px-6 py-1 rounded-md grow mt-5' onClick={() => {
                            close(false)
                        }}>
                            Close
                        </button>
                        <button className=' bg-socialBlue text-white px-6 py-1 rounded-md grow  mt-5' onClick={() => {

                        }}>
                            submit
                        </button>
                    </div>
                </div>
            </div>


        </div >

    )
}

export default Report
