import React from 'react'

const Footer = () => {
    return (
        <div
            className='shadow-[0_0_6px_rgba(0,0,0,.1)] z-10'
        >
            <div className='container text-xs flex justify-center sm:justify-between mx-auto py-3  '>
                <div className="hidden sm:block">© 2023 Cytrellis, Inc. All rights reserved.Cytrellis, Ellacor, Micro-Coring, and associated logos are trademarks or registeredtrademarks of Cytrellis, Inc. and may not be used without permission.</div>
                <div className="block sm:hidden">© 2023 Cytrellis, Inc. All rights reserved.Cytrellis, Ellacor ...</div>
                <div className="hidden sm:block">Privacy Policy   |   Terms of Use</div>
            </div>
        </div>
    )
}

export default Footer