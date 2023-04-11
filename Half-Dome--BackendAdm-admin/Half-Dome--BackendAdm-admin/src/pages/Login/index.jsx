import React, { useEffect, useState } from 'react'
import userIcon from "../../assets/Icons/userIcon.svg";
// import ellacorLogo from "../../assets/Images/ellacorLogo.svg"; 
import ellacorLogo from "../../assets/Images/Ellacor_logo_Color.svg";
import machine from "../../assets/Images/machine.svg";
import loginBG from "../../assets/Images/login-bg.svg";
import arrowRight from "../../assets/Icons/arrow-right.svg";
import lock from "../../assets/Icons/lock.svg";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../features/auth/authAPI';
import { setCredentials } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';
import { CircleLoader } from '../../components/Loader';

function isValidEmail(email) {
    return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email);
}

const Login = () => {

    const [screen, setscreen] = useState(window.innerWidth);
    const [login, { isLoading }] = useLoginMutation()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [errorPassword, setErrorPassword] = useState(null);




    useEffect(() => {
        const updateWindowDimensions = () => {
            const newWidth = window.innerWidth;

            setscreen(newWidth);
        };

        window.addEventListener("resize", updateWindowDimensions);

        return () => window.removeEventListener("resize", updateWindowDimensions);
    }, []);

    return (
        <div style={{ backgroundImage: `url('${loginBG}')` }} className={" h-screen bg-cover flex justify-center bg-[#f0f4fc]"}>
            <div className='hidden lg:block'>
                <img className='fixed right-0 lg:right-28  bottom-0 h-5/6' 
                // style={{ height: "610px" }} 
                src={machine} alt="" />
            </div>

            {/* {screen > 800 ? */}
            <div className="flex justify-center lg:block lg:justify-start w-full m-auto md:w-full lg:w-10/12">

                <div className='my-auto p-0 md:p-10 h-auto' style={{ maxWidth: "430px" }}>
                    <div className='flex justify-start w-full mb-5'>
                        <img src={ellacorLogo} className="mb-5 m-auto h-12" alt="ellacor-logo" />
                    </div>
                    <p className='font-medium font-argent text-4xl sm:text-3xl lg:text-4xl text-[#4F73AC] ml-0 md:ml-4'>Log in to your account</p>


                    <form className='w-full flex justify-center'
                        onSubmit={async (e) => {
                            e.preventDefault();
                            console.log(e.target.email.value)
                            setEmail(e.target.email.value);
                            if (e.target.password.value == "") {
                                setErrorPassword('Please enter password');
                            } if (!isValidEmail(e.target.email.value)) {
                                setError('Please enter a valid email-id');
                            } else {
                                const payload = {
                                    email: e.target.email.value,
                                    password: e.target.password.value,
                                    roleid: 16,
                                }
                                try {
                                    const user = await login(payload).unwrap()
                                    if (user.statusCode == 200) {
                                        dispatch(setCredentials({ user: user.user, token: user.token }))
                                        localStorage.setItem("USER", JSON.stringify(user.user));
                                        localStorage.setItem("ISAUTH", user.token)
                                        navigate('/')
                                        return
                                    }
                                    toast(user.message)

                                } catch (err) {
                                    console.log(err, "login error")
                                    toast(err.data.message)

                                }
                            }
                        }}>

                        <div className='w-80'>
                            <p className='text-sm mt-2 mb-6 font-[inter] text-black'>Login your account with e-mail and Password</p>
                            <div className='mb-4'>
                                {/* <label

                                className="block mb-1 text-xs font-normal  dark:text-white font-[inter]" style={{ color: "#666666" }}
                            >
                                Email Id
                            </label> */}
                                <div className="relative">
                                    {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">

                                    <img className="h-3 text-gray-500 dark:text-gray-400" src={userIcon} alt="user icon" />
                                </div> */}
                                    <input
                                        name="email"
                                        type="email"
                                        id="email-address-icon"
                                        value={email}
                                        className=" border border-[#E9E9E9] text-gray-900 text-md placeholder:font-argent font-[inter] font-extralight rounded-3xl block w-full pl-6 px-2.5 py-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none h-12"
                                        placeholder="Enter email id here"
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                    />
                                    <div className='h-2 pt-2 ml-7'>
                                        {error && <p className='text-xs' style={{ color: 'red' }}>{error}</p>}
                                    </div>
                                </div>

                            </div>
                            <div className='mb-4 mt-7'>
                                {/* <label

                                className="block mb-1 text-xs font-normal text-gray-900 dark:text-white font-[inter]" style={{ color: "#666666" }}
                            >
                                Password
                            </label> */}
                                <div className="relative">
                                    {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">

                                    <img className="h-4 text-gray-500 dark:text-gray-400" src={lock} alt="user icon" />
                                </div> */}
                                    <input
                                        name="password"
                                        type="password"
                                        id="email-address-icon"
                                        className=" border focus:bg-white border-[#E9E9E9] text-gray-900 text-md placeholder:font-argent font-[inter] rounded-3xl block w-full pl-6 px-2.5 py-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none h-12"
                                        placeholder="Enter password here"
                                        required
                                    />
                                    <div className='h-2 pt-2 ml-7'>
                                        {errorPassword && <p className='text-xs' style={{ color: 'red' }}>{errorPassword}</p>}
                                    </div>
                                </div>

                                {/* <div className="flex justify-end ">
                                <p className="text-coral text-[inter] text-xs font-medium mt-1 border-b-2 border-coral cursor-pointer">Forgot password?</p>

                            </div> */}


                            </div>

                            <div className='mt-7'>
                                <button className='px-7 bg-[#446AA7] w-full font-extralight font-argent text-md  text-white rounded-3xl p-2 py-2 mt-1'>
                                    {isLoading ?
                                        <div className='flex justify-center'>
                                            <CircleLoader />
                                            <p>Loading...</p>
                                        </div>
                                        :
                                        <div className='flex justify-between items-center'>
                                            <p className='font-extralight'>Continue</p>
                                            <img style={{ height: "17px" }} src={arrowRight} alt="right arrow" />
                                        </div>
                                    }

                                </button>
                            </div>
                        </div>
                    </form>

                </div>


            </div>

        </div>
    )
}

export default Login