import React from 'react'
import PulseLoader from './PulseLoader'

const PageLoader = () => {
    return (
        <div className='bg-coral flex w-full h-full justify-center items-center'>
            <h1 className='text-white'><PulseLoader /></h1>
        </div>
    )
}

export default PageLoader