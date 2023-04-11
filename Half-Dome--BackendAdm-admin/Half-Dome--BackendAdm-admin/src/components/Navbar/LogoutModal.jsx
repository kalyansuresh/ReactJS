import React from 'react';
import Modal from '../Modal';
import outlinedcross from "../../assets/Icons/outlinedcross.svg";
import { useLogoutMutation } from '../../features/auth/authAPI';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectAuthToken, selectCurrentUser, setCredentials } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../App';
import { CircleLoader } from '../Loader';

const LogoutModal = ({ setLogoutModal }) => {

    const navigate = useNavigate()
    const user = useAppSelector(selectCurrentUser);
    const dispatch = useAppDispatch();
    const token = useAppSelector(selectAuthToken);
    const [logout, { isLoading }] = useLogoutMutation()

    const handleLogout = async () => {

        if (!user) {
            toast.error("Email is required please login again");
            return;
        }
        try {
            const logoutRes = await logout({ email: user, token }).unwrap();
            if (logoutRes?.statusCode === 200) {
                // localStorage.removeItem(LOCALAUTH.USER);
                // localStorage.removeItem(LOCALAUTH.ISAUTH);
                dispatch(setCredentials({ user: null, token: null }))
                toast.success(logoutRes?.message);
                navigate(ROUTES.LOGIN)
                return;
            }
            toast.error(logoutRes?.message);
        } catch (err) {
            toast.error(err?.data?.message || "Logout failed please try again");
        }
    }

    return (
        <div>
            <Modal onClose={() => setLogoutModal(false)} isWindow modalClass={"w-[calc(100%-80px)] md:w-auto"} >

                <div className="flex-col pt-3 px-8">
                    <div className='flex justify-center w-full mb-6 mt-3'>
                        <img src={outlinedcross} alt="cross-sign" />
                    </div>
                    <div className='flex justify-center w-full text-2xl text-black mt-1 mb-6 font-argent font-medium'>
                        <p>Are you sure?</p>
                    </div>

                    <div className='flex justify-center w-full mt-1 mb-7 font-[inter] text-center'>
                        <p>Would you like to log out of the system?<br /> This process cannot be undone.</p>
                    </div>

                    <div>
                        <div className='flex justify-center w-full gap-2 font-[inter]'>
                            <button className='bg-[#666666] p-2 text-white rounded-sm' onClick={() => setLogoutModal(false)}>Cancel</button>
                            <button className='bg-coral py-2 px-5 text-white rounded-sm' onClick={handleLogout}>
                                {isLoading ? <><CircleLoader /> </> : <> Yes </>
                                }
                            </button>
                        </div>
                    </div>
                </div>

            </Modal>

        </div>
    )
}

export default LogoutModal
