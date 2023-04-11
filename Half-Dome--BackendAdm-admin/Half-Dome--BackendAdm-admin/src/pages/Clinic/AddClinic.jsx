import React from 'react'
import Modal from '../../components/Modal';
import { useAddClinicMutation, useGetClinicsQuery } from '../../features/clinic/clinicAPI';
import { ellacoreApi } from '../../app/services';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../app/hooks';
import hospitalImg from "../../assets/Images/hospital-img.svg";
import rightArrowSign from "../../assets/Icons/right-arrowsign.svg";
import reset from "../../assets/Icons/reset.svg";
import { CircleLoader } from '../../components/Loader';



const AddClinic = ({ setaddClinicModal }) => {

    const [selectedData, setSelectedData] = React.useState({});
    const [addClinic, { isLoading }] = useAddClinicMutation();
    const { isLoadingdata, data } = useGetClinicsQuery();
    const dispatch = useAppDispatch();

    const lastClinic = data.data[data.data.length - 1]

    function dateconvert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join("/");
    }

    const onChange = (e) => {
        console.log("vvvv", e)

        setSelectedData({
            ...selectedData, [e.target.name]: e.target.value
        })


    }

    console.log("selcteddata", selectedData)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const clinicRes = await addClinic(selectedData).unwrap();
            if (clinicRes.statusCode === 200) {
                toast.success(clinicRes.message || "Clinic added successfully");
                setaddClinicModal(false)
                dispatch(ellacoreApi.util.invalidateTags(["ClinicProfile"]));
                return;
            }
            console.log("response", clinicRes)
        } catch (err) {
            toast.error(err?.data?.message || "Clinic not added");
        }
    };



    return (
        <div>

            <Modal
                onClose={() => setaddClinicModal(false)}
                isWindow modalClass={"w-[calc(100%-80px)] md:w-4/5 lg:w-3/5"} >
                {/* <div className='h-full w-full'> */}

                <form
                    onSubmit={handleSubmit}
                    className='w-full'
                    autoComplete="true"
                >
                    <h1 className='mb-1 text-2xl font-medium font-argent  text-[#6771A4]'>Add Clinic</h1>
                    <hr className='border-2' />

                    <div className='py-7 '>
                        <div className='flex justify-center md:justify-between'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 w-full sm:w-3/5'>
                                <div className='relative'>
                                    <label
                                        htmlFor="email-address-icon"
                                        className="absolute bg-white px-2 bottom-8 sm:bottom-14 left-3 block mb-2 font-medium text-[#446AA8] dark:text-white text-xs"
                                    >
                                        Clinic Name<span className='text-[#F37358]'>*</span>
                                    </label>
                                    <input
                                        name="clinicname"
                                        type="text"
                                        className=" border border-[#D9D9D9] placeholder:font-argent placeholder:text-sm placeholder:font-thin rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full h-12 p-2.5 pl-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none text-xs"
                                        placeholder="Enter name"
                                        // defaultValue={patient.PatientName}
                                        // value={}
                                        required
                                        onChange={onChange}
                                        maxLength={32}
                                        minLength={5}
                                    />
                                </div>

                                <div className='relative'>
                                    <label
                                        htmlFor="email-address-icon"
                                        className="absolute bg-white px-2 bottom-8 sm:bottom-14 left-3 block mb-2 font-medium text-[#446AA8] dark:text-white text-xs"
                                    >
                                        Email-ID<span className='text-[#F37358]'>*</span>
                                    </label>
                                    <input
                                        name='email'
                                        type="email"
                                        className=" border border-[#D9D9D9] placeholder:font-argent placeholder:text-sm placeholder:font-thin  rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full h-12 p-2.5 pl-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none placeholder-[#cac8c8] text-xs"
                                        placeholder="Enter email id"
                                        // defaultValue={patient?.Email}
                                        required
                                        onChange={onChange}
                                    />
                                </div>
                                <div className='relative'>
                                    <label
                                        htmlFor="email-address-icon"
                                        className="absolute bg-white px-2 bottom-8 sm:bottom-14 left-3 block mb-2 font-medium text-[#446AA8] dark:text-white text-xs"
                                    >
                                        Phone Number<span className='text-[#F37358]'>*</span>
                                    </label>
                                    <input
                                        name='phone'
                                        type="number"
                                        className="border border-[#D9D9D9] placeholder:font-argent placeholder:text-sm placeholder:font-thin  rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full h-12 p-2.5 pl-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none placeholder-[#cac8c8] text-xs appearance-none hide-date-icon"
                                        placeholder="Enter Phone number"
                                        // value={phoneNumber}
                                        // defaultValue={patient?.Phone}
                                        required
                                        // onKeyDown={(e) => {
                                        //     ["e", "E", "-", "+"].includes(e.key) && e.preventDefault();
                                        // }}
                                        onChange={(e) => {
                                            if (e.target.value.length > 10) {
                                                return;
                                            }
                                            setSelectedData({
                                                ...selectedData, [e.target.name]: e.target.value
                                            })
                                        }}
                                        maxLength={10}
                                        minLength={10}
                                    />
                                </div>


                                <div className='relative'>
                                    <label
                                        htmlFor="email-address-icon"
                                        className="absolute bg-white px-2 bottom-8 sm:bottom-14 left-3 block mb-2 font-medium text-[#446AA8] dark:text-white text-xs"
                                    >
                                        State<span className='text-[#F37358]'>*</span>
                                    </label>
                                    <input
                                        name='state'
                                        type="text"
                                        className="border border-[#D9D9D9] placeholder:font-argent placeholder:text-sm placeholder:font-thin  rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full h-12 p-2.5 pl-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none placeholder-[#cac8c8] text-xs"
                                        placeholder="Enter state"
                                        maxLength={10}
                                        minLength={2}
                                        required
                                        onChange={onChange}
                                    />
                                </div>
                                <div className='relative'>
                                    <label
                                        htmlFor="email-address-icon"
                                        className="absolute bg-white px-2 bottom-8 sm:bottom-14 left-3 block mb-2 font-medium text-[#446AA8] dark:text-white text-xs"
                                    >
                                        City<span className='text-[#F37358]'>*</span>
                                    </label>
                                    <input
                                        name='city'
                                        type="text"
                                        className=" border border-[#D9D9D9] placeholder:font-argent placeholder:text-sm placeholder:font-thin  rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full h-12 p-2.5 pl-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none placeholder-[#cac8c8] text-xs"
                                        placeholder="Enter city"
                                        // defaultValue={patient.ClinicName}
                                        required
                                        maxLength={10}
                                        minLength={2}
                                        onChange={onChange}
                                    />
                                </div>

                                <div className='relative'>
                                    <label
                                        htmlFor="email-address-icon"
                                        className="absolute bg-white px-2 bottom-8 sm:bottom-14 left-3 block mb-2 font-medium text-[#446AA8] dark:text-white text-xs"
                                    >
                                        Zip/Postal code<span className='text-[#F37358]'>*</span>
                                    </label>
                                    <input
                                        name='zipcode'
                                        type="text"
                                        className=" border border-[#D9D9D9] placeholder:font-argent placeholder:text-sm placeholder:font-thin  rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full h-12 p-2.5 pl-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none placeholder-[#cac8c8] text-xs"
                                        placeholder="Enter zipcode"
                                        // defaultValue="123456"
                                        required
                                        minLength={5}
                                        maxLength={5}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <img className='hidden md:block h-64' src={hospitalImg} alt="" />
                            </div>
                        </div>

                        <div className='flex justify-between mt-5'>
                            <div className='flex gap-5'>
                                <button
                                    type="submit"
                                    className='flex justify-around items-center bg-blue-dark hover:bg-blue-dark/90 text-white py-1 px-3 sm:px-6 rounded-3xl ml-auto font-argent text-base sm:text-lg h-9 w-44 sm:w-56'

                                >
                                    {isLoading ?
                                        <><span className=''>Adding</span>
                                            <CircleLoader />
                                        </> :
                                        <>
                                            <span>Add this clinic</span>
                                            <img className='hidden sm:block ml-5' src={rightArrowSign} alt="" />
                                        </>
                                    }
                                </button>
                                <button
                                    type='reset'
                                    className='flex justify-around items-center bg-[#F37358] hover:bg-[#f85d3e] text-white py-1 px-4 sm:px-7 rounded-3xl ml-auto font-argent h-9 text-base sm:text-lg'
                                // onClick={() => {
                                //     setSelectedData(initialSelectedData);
                                // }}
                                >
                                    <img className='hidden sm:block mr-3' src={reset} alt="" />
                                    <span>Reset</span>
                                </button>
                            </div>
                            <div className='hidden xl:block mr-3'>
                                <p className='text-black font-[inter] text-xs -mt-2'>Recently Added Clinic</p>
                                <hr className='my-2' />
                                <div className='flex justify-around gap-7 text-xs text-[#6771A4] items-center'>
                                    <p className="font-argent text-sm">{lastClinic.clinicname}</p>
                                    <p>{lastClinic.city}</p>
                                    <p>{dateconvert(lastClinic.modfieddate)}</p>
                                </div>
                                <hr className='my-2' />
                            </div>
                        </div>
                    </div>
                </form>

                {/* </div> */}
            </Modal>

        </div>
    )
}

export default AddClinic
