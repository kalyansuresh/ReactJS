import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer'
import MobileFooter from '../MobileFooter'
import Navbar from '../Navbar/Navbar'

function DashboardLayout() {
    return (

        <div className='flex flex-col h-screen'>
            <div>
                <Navbar />
            </div>
            <div className='bg-[#F2F6FF] flex flex-1 justify-center pt-5 overflow-auto h-[calc(100%-160px)]'>
                <Outlet />
            </div>
            <div className="block sm:hidden">
                <MobileFooter />
            </div>
            <div className="hidden sm:block">
                <Footer />
            </div>
        </div>

    )
}

export default DashboardLayout
