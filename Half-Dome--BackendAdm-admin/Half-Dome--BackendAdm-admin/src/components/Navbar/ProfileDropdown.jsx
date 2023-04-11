import React, { ChangeEvent, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ROUTES } from '../../App';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ArrowBottomIcon, CameraIcon, LogoutIcon, UserEditIcon } from '../../assets/icons';
import { User, useUpdateProfileMutation } from '../../features/auth/authAPI';
import { selectCurrentUser, setCredentials } from '../../features/auth/authSlice';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { CircleLoader } from '../Loader';
import Modal from '../Modal';
const EditProfileModal = ({ setModalVisible }) => {
    const user = useAppSelector(selectCurrentUser);
    const profileRef = useRef(null);
    const [updateProfile, { isLoading }] = useUpdateProfileMutation();

    const [phoneNumber, setPhoneNumber] = useState(user?.PhoneNumber || "")

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        // console.log(Object.fromEntries(formData), "form.handleSubmit")
        const payload = Object.fromEntries(formData)
        try {
            // @ts-ignore
            const profileRes = await updateProfile(payload).unwrap();
            if (profileRes.statusCode === 200) {
                toast.success(profileRes.message || "Profile updated successfully")
                return;
            }
            toast.error(profileRes.message || "Profile not updated");
        } catch (err) {
            toast.error(err?.data?.message || "Profile not updated");
        }
    }
    const handleProfileClick = () => {
        profileRef.current?.click()
    }

    return <Modal onClose={() => setModalVisible(false)} isWindow modalClass={"w-[calc(100%-80px)] md:w-auto"} >
        {/* <div className='h-full w-full'> */}
        <div >
            <form onSubmit={handleSubmit} className='flex  flex-col md:flex-row  m-auto' autoComplete="true" >
                <div className=' md:border-r-2  pb-0 md:p-11 flex flex-col justify-center items-center   '>
                    <div className='relative'>
                        <input name='profile' ref={profileRef} type="file" className='hidden' accept='image/*' />
                        <img src={"./assets/image/user.jpg"} className="w-20 h-20 m-auto mb-3" />
                        <button onClick={handleProfileClick} type='button' className='bg-coral w-8 h-8 rounded-full absolute -right-2 bottom-3 p-2'>
                            <CameraIcon />
                        </button>
                    </div>
                    <div className='font-semibold text-sm'>{user?.PhysicianName}</div>
                </div>
                <div className='md:p-9 p-4'>
                    <h1 className='mb-6 text-lg font-semibold'>Edit profile</h1>

                    <div className='flex md:space-x-3 flex-col md:flex-row'>
                        <div className='mb-5'>
                            <label
                                htmlFor="email-address-icon"
                                className="block mb-2 font-medium text-gray-900 dark:text-white text-xs"
                            >
                                Name
                            </label>
                            <input
                                name="PhysicianName"
                                type="text"
                                className="bg-gray-50 border border-blue-100  rounded focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none placeholder-[#cac8c8] text-xs"
                                placeholder="Enter Your name here"
                                defaultValue={user?.PhysicianName}
                                required
                            />
                        </div>
                        <div className='mb-5'>
                            <label
                                htmlFor="email-address-icon"
                                className="block mb-2 font-medium text-gray-900 dark:text-white text-xs"
                            >
                                Email Address
                            </label>
                            <input
                                name='email'
                                type="email"
                                className="bg-gray-50 border border-blue-100  rounded focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none placeholder-[#cac8c8] text-xs"
                                placeholder="Enter email id here"
                                defaultValue={user?.email}
                                required
                            />
                        </div>
                        <div className='mb-5'>
                            <label
                                htmlFor="email-address-icon"
                                className="block mb-2 font-medium text-gray-900 dark:text-white text-xs"
                            >
                                Phone Number
                            </label>
                            <input
                                name='PhoneNumber'
                                type="number"
                                className="bg-gray-50 border border-blue-100  rounded focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none placeholder-[#cac8c8] text-xs appearance-none hide-date-icon"
                                placeholder="Enter Phone no. here"
                                value={phoneNumber}
                                // defaultValue={user?.PhoneNumber}
                                required
                                onKeyDown={(e) => {
                                    ["e", "E", "-", "+"].includes(e.key) && e.preventDefault();
                                }}
                                onChange={(e) => {
                                    const newPhoneNumber = e.target.value;
                                    if (newPhoneNumber.length <= 10) {
                                        setPhoneNumber(newPhoneNumber);
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className='mb-5'>
                        <label
                            htmlFor="email-address-icon"
                            className="block mb-2 font-medium text-gray-900 dark:text-white text-xs"
                        >
                            Address
                        </label>
                        <textarea
                            name='Address'
                            className="bg-gray-50 border border-blue-100  rounded focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none placeholder-[#cac8c8] text-xs"
                            placeholder="Enter Your Address here"
                            defaultValue={user?.Address}
                        />
                    </div>
                    <button disabled={isLoading} className='flex items-center bg-blue-dark hover:bg-blue-dark/90 text-white py-2 px-4 rounded ml-auto  text-xs'>
                        {isLoading ? <><CircleLoader className='!w-4 !h-4 !mr-2' />Saving...</> : <>Save profile</>}
                    </button>
                </div>
            </form>
        </div>
        {/* </div> */}
    </Modal>
}

const ProfileDropdown = () => {
    const profileRef = useRef(null)
    const navigate = useNavigate();
    const [isProfileVisible, setProfileVisible] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false)
    const user = useAppSelector(selectCurrentUser);
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        localStorage.removeItem("isAuth");
        dispatch(setCredentials({ user: null }))
        navigate(ROUTES.LOGIN)
    }
    useOnClickOutside(profileRef, () => {
        setProfileVisible(false)
    })

    return <div className='relative' ref={profileRef}>
        <button className="flex cursor-pointer items-center sm:flex-col p-2 md:p-4 text-sm mt-1  md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-1 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900  text-gray-dark focus:outline-blue-medium" onClick={() => setProfileVisible((b) => !b)}>
            {user?.PhysicianName}
            <ArrowBottomIcon className={"w-3 ml-2 transition-transform" + (isProfileVisible ? " rotate-180" : "")} />
        </button>
        {isProfileVisible &&
            <div onClick={(e) => e.stopPropagation()} className="cursor-default shadow-lg  absolute top-13 md:top-14 right-0 w-max p-4 py-2  text-sm font-medium text-gray-900 bg-white border border-gray-200  dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <div
                    aria-current="true"
                    // type="button"
                    className="w-full flex px-4 py-3 font-medium text-left  border-b border-gray-200 focus:outline-none dark:bg-gray-800 dark:border-gray-600"
                >
                    <img src={user?.profile} className={"w-9"} />
                    <div className='ml-2'>
                        <div className='text-blue-dark text-sm'>{user?.PhysicianName}</div>
                        <div className='text-gray-dark text-xs'>Skin specialist</div>
                    </div>
                </div>
                <button
                    onClick={() => {
                        setModalVisible((b) => !b)
                        // setProfileVisible(false)
                    }}
                    type="button"
                    className="w-full flex px-4 py-3 font-medium text-left border-b border-gray-200 cursor-pointer text-gray-500 hover:text-blue-700 focus:outline-blue-medium focus:ring-2 focus:ring-blue-light focus:text-blue-700 dark:border-gray-600 dark:hover:bg-blue-100 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white items-center"
                >
                    <UserEditIcon /> <span className='ml-2'>My Profile</span>
                </button>

                <button
                    onClick={handleLogout}
                    type="button"
                    className="flex items-center w-full px-4 py-3 font-medium text-left  cursor-pointer  hover:text-blue-700 focus:outline-blue-medium focus:ring-2 focus:ring-blue-light focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white text-gray-500"
                >
                    <LogoutIcon /> <span className='ml-2'> Log Out</span>
                </button>
            </div>}
        {isModalVisible &&
            <EditProfileModal setModalVisible={setModalVisible} />
        }
    </div>
}
export default ProfileDropdown