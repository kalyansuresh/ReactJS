import React, { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../App'
import ellacorLogo from "../../assets/Images/ellacorLogo.svg";
import profile from '../../assets/Images/profile.png'
import useOnClickOutside from '../../hooks/useOnClickOutside';
import Icon from '../../assets/Icons/user-edit.svg';
import logouticon from '../../assets/Icons/logout.svg';
import bell_Icon from '../../assets/Icons/bell_Icon.svg';
import divider from "../../assets/Icons/divider.svg";
import { selectAuthToken, selectCurrentUser, setCredentials } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useLogoutMutation } from '../../features/auth/authAPI';
import notificationJson from "./data.json";
import LogoutModal from './LogoutModal';

const OpenLogoutModal = ({ setLogoutModal }) => {
    return <>
        <LogoutModal setLogoutModal={setLogoutModal} />
    </>
}



const Navbar = () => {

    const profileRef = useRef(null)
    const navigate = useNavigate();
    const [isProfileVisible, setProfileVisible] = useState(false)
    const [showLogoutModal, setLogoutModal] = React.useState(null);


    useOnClickOutside(profileRef, () => {
        setProfileVisible(false)
    })

    const notificationRef = useRef(null)
    const [isNotificaionVisible, setNotificaionVisible] = useState(false);
    const handleNotificationVisible = () => {
        setNotificaionVisible((b) => !b)
    }
    useOnClickOutside(notificationRef, () => {
        setNotificaionVisible(false)
    })

    return (
        <>
            <header className=''>
                <nav className="bg-white border-gray-200 shadow-md h-16 px-4 lg:px-3 py-2.5 z-10 sticky top-0">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl -mt-1">
                        <Link to={ROUTES.HOME} className="flex items-center">
                            <img className="h-12 w-18" src={ellacorLogo} alt />
                        </Link>
                        <div className="flex gap-4 md:gap-7 items-center">
                            <div className="hidden sm:block">
                                <ul className=' flex gap-4 md:gap-10 items-center text-sm'>
                                    <NavLink className={({ isActive }) => { return `block text-gray-400 font-medium font-argent rounded hover:bg-gray-100 md:hover:bg-transparent d:border-0 md:hover:text-blue-700 dark:text-gray-400  hover:font-argent md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent focus:outline-blue-medium ${isActive ? "!text-blue-dark ring-blue-dark font-argent" : ""}`; }} to={ROUTES.HOME} >Dashboard</NavLink>
                                    <NavLink className={({ isActive }) => { return `block text-gray-400 font-medium font-argent rounded hover:bg-gray-100 md:hover:bg-transparent d:border-0 md:hover:text-blue-700 dark:text-gray-400  hover:font-argent md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent focus:outline-blue-medium ${isActive ? "!text-blue-dark ring-blue-dark font-argent" : ""}`; }} to={ROUTES.PHYSICIANS}>Physician</NavLink>
                                    <NavLink className={({ isActive }) => { return `block text-gray-400 font-medium font-argent rounded hover:bg-gray-100 md:hover:bg-transparent d:border-0 md:hover:text-blue-700 dark:text-gray-400  hover:font-argent md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent focus:outline-blue-medium ${isActive ? "!text-blue-dark ring-blue-dark font-argent" : ""}`; }} to={ROUTES.CLINIC}>Clinic</NavLink>
                                    <NavLink className={({ isActive }) => { return `block text-gray-400 font-medium font-argent rounded hover:bg-gray-100 md:hover:bg-transparent d:border-0 md:hover:text-blue-700 dark:text-gray-400  hover:font-argent md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent focus:outline-blue-medium ${isActive ? "!text-blue-dark ring-blue-dark font-argent" : ""}`; }} to={ROUTES.CLINIC}>Survey</NavLink>


                                </ul>

                            </div>

                            {/* <div className="relative" ref={notificationRef}>
                                <img className="cursor-pointer" onClick={handleNotificationVisible} src={bell_Icon} alt="notification" />

                                {isNotificaionVisible && <div className="cursor-default shadow-lg  absolute top-12 right-0  w-full  z-10 sm:min-w-[469px]  py-2  text-sm font-medium text-gray-900 bg-white border border-gray-200  dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                    <div className='flex p-4 pb-3 items-center '>
                                        <div className='mr-auto text-lg font-semibold'>
                                            Notifications
                                        </div>
                                        <button className='text-blue-dark p-2 rounded-md text-xs'>Mark all as read</button>
                                        <Link to={ROUTES.NOTIFICATION} onClick={handleNotificationVisible} className='bg-blue-dark text-white p-2 rounded-md text-xs '>View all notifications</Link>
                                    </div>
                                    <ul className='overflow-auto h-[calc(100vh-200px)] px-4'>
                                        {notificationJson.map((notif, i) => {
                                            const isRead = notif?.read;
                                            return <li key={i} className={`border border-blue-light p-3 mb-2 flex ${isRead ? "bg-blue-lightest" : ""}`}>
                                                <div>
                                                    <div className={`${!isRead ? "bg-coral" : ""} w-2 h-2 mx-4 rounded-full m-[7px] mr-2`} />
                                                </div>
                                                <div>
                                                    <h3 className='font-semibold'>{notif.title} </h3>
                                                    <p className='mb-3 text-xs text-gray-dark'>{notif.desc}</p>
                                                    <div className='text-blue-dark text-xs'>{notif.time}</div>
                                                </div>
                                            </li>
                                        })}

                                    </ul>
                                </div>}
                            </div> */}
                            <div className=" relative cursor-pointer" onClick={() => setProfileVisible(!isProfileVisible)} ref={profileRef}>
                                {/* <img className=" rounded-full" src={profile} alt="profile" /> */}
                                <NavLink className={({ isActive }) => { return `block text-sm text-gray-400 font-medium font-argent rounded hover:bg-gray-100 md:hover:bg-transparent d:border-0 md:hover:text-blue-700 dark:text-gray-400  hover:font-argent md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent focus:outline-blue-medium ${isActive ? "!text-blue-dark ring-blue-dark font-argent" : ""}`}}>Admin</NavLink>

                                {isProfileVisible &&
                                    <div onClick={(e) => e.stopPropagation()} className="cursor-default shadow-lg  absolute top-14 right-0 w-56 p-4 py-2  text-sm font-medium text-gray-900 bg-white border border-gray-200  dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                        <div
                                            aria-current="true"
                                            // type="button"
                                            className="w-full flex px-4 py-3 font-medium text-left  border-b border-gray-200 focus:outline-none dark:bg-gray-800 dark:border-gray-600"
                                        >
                                            <img src={profile} className={"w-9 rounded-full"} />
                                            <div className='ml-2'>
                                                <div className='text-blue-dark text-sm'>Welcome</div>
                                                <div className='text-gray-dark text-xs'>Admin</div>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className="w-full flex px-4 py-3 font-medium text-left border-b border-gray-200 cursor-pointer text-gray-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-blue-100 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white items-center"
                                        >
                                            <img src={Icon} name='user-edit.svg' /> <span className='ml-2'>My Profile</span>
                                        </button>
                                        <button
                                            
                                            onClick={() => {
                                                setLogoutModal((b) => !b)
                                                // setProfileVisible(false)
                                              }}
                                            type="button"
                                            className="flex items-center w-full px-4 py-3 font-medium text-left  cursor-pointer  hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white text-gray-500"
                                        >
                                            <img src={logouticon} name='logoutIcon.svg' /> <span className='ml-2'> Log Out</span>
                                        </button>
                                    </div>}

                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            {showLogoutModal &&

                <OpenLogoutModal setLogoutModal={setLogoutModal} />

            }
        </>
    )
}

export default Navbar
