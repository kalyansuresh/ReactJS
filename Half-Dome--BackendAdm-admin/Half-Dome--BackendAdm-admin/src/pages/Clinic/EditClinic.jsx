import React from 'react'
import Modal from '../../components/Modal';
import { useGetClinicsQuery, useUpdateClinicMutation } from '../../features/clinic/clinicAPI';
import { toast } from 'react-toastify';
import { ellacoreApi } from '../../app/services';
import { useAppDispatch } from '../../app/hooks';
import hospitalImg from "../../assets/Images/hospital-img.svg";
import rightArrowSign from "../../assets/Icons/right-arrowsign.svg";
import reset from "../../assets/Icons/reset.svg";
import { CircleLoader } from '../../components/Loader';

const EditClinic = ({ setClinicModal, clinic }) => {


    const initialValue = {
        email: clinic.email,
        city: clinic.city,
        zipcode: clinic.zipcode,
        clinicname: clinic.clinicname,
        state: clinic.state,
        phone: clinic.phone,

    }

    const [selectedData, setSelectedData] = React.useState(initialValue);
    const [editClinic, { isLoading }] = useUpdateClinicMutation();
    const { isLoadingdata, data } = useGetClinicsQuery();
    const dispatch = useAppDispatch();

    const lastClinic = data.data[data.data.length - 1]

    function dateconvert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join("/");
    }

    console.log("last clinic", lastClinic)

    const onChange = (e) => {
        console.log("vvvv", e)
        setSelectedData({
            ...selectedData, [e.target.name]: e.target.value
        })


    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const params = {
                email: selectedData.email,
                city: selectedData.city,
                zipcode: selectedData.zipcode,
                clinicname: selectedData.clinicname,
                state: selectedData.state,
                phone: selectedData.phone
            }


            const editclinicRes = await editClinic(params).unwrap();
            if (editclinicRes.statusCode === 200) {
                toast.success(editclinicRes.message || "Clinic updated successfully");
                setClinicModal(false)
                dispatch(ellacoreApi.util.invalidateTags(["ClinicProfile"]));
                return;
            }
            console.log("response", editclinicRes)
        } catch (err) {
            toast.error(err?.data?.message || "Clinic not updated");
        }
    };

    return (
        <div>

            <Modal onClose={() => setClinicModal(false)} isWindow modalClass={"w-[calc(100%-80px)] md:w-3/5"} >
                {/* <div className='h-full w-full'> */}
                <div >
                    <form
                        className='w-full'
                        autoComplete="true"
                        onSubmit={handleSubmit}
                    >

                        <h1 className='mb-1 text-2xl font-medium font-argent  text-[#6771A4]'>Edit Clinic</h1>
                        <hr className='border-2' />

                        <div className='py-7 '>
                            <div className='flex justify-between'>
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
                                            className=" border border-[#D9D9D9] placeholder:font-argent placeholder:text-sm placeholder:font-thin rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full h-12 p-2.5 pl-5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none text-xs"
                                            placeholder="Enter name"
                                            defaultValue={clinic.clinicname}
                                            required
                                            onChange={onChange}
                                            maxLength={50}
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
                                            className=" border border-[#D9D9D9] placeholder:font-argent placeholder:text-sm placeholder:font-thin  rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full h-12 p-2.5 pl-5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none placeholder-[#cac8c8] text-xs"
                                            placeholder="Enter email id"
                                            defaultValue={clinic.email}
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
                                            className="border border-[#D9D9D9] placeholder:font-argent placeholder:text-sm placeholder:font-thin  rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full h-12 p-2.5 pl-5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none placeholder-[#cac8c8] text-xs appearance-none hide-date-icon"
                                            placeholder="Enter Phone number"
                                            defaultValue={clinic.phone}
                                            required
                                            value={selectedData.phone}
                                            // onKeyDown={(e) => {
                                            //     ["e", "E", "-", "+"].includes(e.key) && e.preventDefault();
                                            // }}
                                            onChange={(e)=>{
                                                if(e.target.value.length>10){
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
                                            defaultValue={clinic.state}
                                            required
                                            onChange={onChange}
                                            maxLength={10}
                                            minLength={2}
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
                                            defaultValue={clinic.city}
                                            required
                                            onChange={onChange}
                                            maxLength={10}
                                            minLength={2}
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
                                            defaultValue={clinic.zipcode}
                                            required
                                            onChange={onChange}
                                            minLength={5}
                                            maxLength={5}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <img className='hidden sm:block h-64' src={hospitalImg} alt="" />
                                </div>
                            </div>

                            <div className='flex justify-between mt-5'>
                                <div className='flex gap-5'>
                                    <button
                                        type="submit"
                                        className='flex justify-around items-center bg-blue-dark hover:bg-blue-dark/90 text-white py-1 px-3 sm:px-8 rounded-3xl ml-auto font-argent text-base sm:text-lg h-9 w-44 sm:w-56'>
                                        {isLoading ?
                                            <><span className=''>Updating</span>
                                                <CircleLoader />
                                            </> :
                                            <>
                                                <span>Update</span>
                                                <img className='hidden sm:block ml-5' src={rightArrowSign} alt="" />
                                            </>
                                        }
                                    </button>
                                    <button
                                        type="reset"
                                        onClick={() => {
                                            setSelectedData(initialValue);
                                        }}
                                        className='flex justify-around items-center bg-[#F37358] hover:bg-[#f85d3e] text-white py-1 px-4 sm:px-7 rounded-3xl ml-auto font-argent h-9 text-lg'>
                                        <img className='hidden sm:block mr-3' src={reset} alt="" />
                                        <span>Reset</span>
                                    </button>
                                </div>

                                <div className='hidden sm:block mr-3'>
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
                </div>
                {/* </div> */}
            </Modal>

        </div>
    )
}

export default EditClinic
