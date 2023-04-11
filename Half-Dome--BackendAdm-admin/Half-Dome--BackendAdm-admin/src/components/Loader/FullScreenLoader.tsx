import React from 'react'
import PulseLoader from './PulseLoader'

const FullScreenLoader = () => {
    return (
        <div className=' flex h-screen justify-center items-center'>
            <h1 className='text-coral shadow-2xl'><PulseLoader /></h1>
        </div>
    )
}

export default FullScreenLoader