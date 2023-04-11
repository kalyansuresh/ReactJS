import React from 'react';
import Modal from '../../components/Modal';
import userphoto from "../../assets/Images/userphoto.svg";

const AddPhysician = ({ setaddPhysicianModal }) => {
    return (
        <div>

            <Modal
                onClose={() => setaddPhysicianModal(false)}
                isWindow modalClass={"w-[calc(100%-80px)] md:w-auto"} >
                {/* <div className='h-full w-full'> */}
                <div >
                    <form className='flex  flex-col md:flex-row  m-auto' autoComplete="true" >

                        <div className=' md:border-r-2  pb-0 md:p-11 flex flex-col justify-center items-center   '>
                            <div className='relative'>
                                <input name='profile' type="file" className='hidden' accept='image/*' />
                                <img src={userphoto} className="w-20 h-20 m-auto mb-3" />

                            </div>
                            {/* <div className='font-semibold text-sm'>{physician.PatientName}</div> */}
                        </div>

                        <div className='md:p-9 p-4'>
                            <h1 className='mb-6 text-lg font-semibold font-argent text-black'>Add New Physician</h1>

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
                                        // defaultValue={patient.PatientName}
                                        required
                                    />
                                </div>
                                <div className='mb-5'>
                                    <label
                                        htmlFor="email-address-icon"
                                        className="block mb-2 font-medium text-gray-900 dark:text-white text-xs"
                                    >
                                        Specialist
                                    </label>
                                    <input
                                        name='specialist'
                                        type="text"
                                        className="bg-gray-50 border border-blue-100  rounded focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none placeholder-[#cac8c8] text-xs"
                                        placeholder="Enter email id here"
                                        // defaultValue={patient?.Specialist}
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
                                        // defaultValue={patient?.Email}
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
                                        // value={phoneNumber}
                                        // defaultValue={patient?.Phone}
                                        required
                                        onKeyDown={(e) => {
                                            ["e", "E", "-", "+"].includes(e.key) && e.preventDefault();
                                        }}
                                        onChange={(e) => {
                                            const newPhoneNumber = e.target.value;
                                            if (newPhoneNumber.length <= 10) {
                                                // setPhoneNumber(newPhoneNumber);
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            <div className='flex gap-x-3'>

                                <div className='mb-5'>
                                    <label
                                        htmlFor="email-address-icon"
                                        className="block mb-2 font-medium text-gray-900 dark:text-white text-xs"
                                    >
                                        Gender
                                    </label>
                                    <select className="bg-gray-50 border border-blue-100  rounded focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none placeholder-[#cac8c8] text-xs" id="myList" onchange="favTutorial()" >
                                        <option className=''> - Choose - </option>
                                        <option> Male </option>
                                        <option> Female </option>
                                        <option> Other </option>
                                    </select>
                                </div>

                                <div className='mb-5'>
                                    <label
                                        htmlFor="email-address-icon"
                                        className="block mb-2 font-medium text-gray-900 dark:text-white text-xs"
                                    >
                                        Clinic Name
                                    </label>
                                    <input
                                        name='clinic'
                                        type="text"
                                        className="bg-gray-50 border border-blue-100  rounded focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none placeholder-[#cac8c8] text-xs"
                                        placeholder="Enter Clinic Name here"
                                        // defaultValue={patient.ClinicName}
                                        required
                                    />
                                </div>

                                <div className='mb-5'>
                                    <label
                                        htmlFor="email-address-icon"
                                        className="block mb-2 font-medium text-gray-900 dark:text-white text-xs"
                                    >
                                        Zipcode
                                    </label>
                                    <input
                                        name='zipcode'
                                        type="text"
                                        className="bg-gray-50 border border-blue-100  rounded focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none placeholder-[#cac8c8] text-xs"
                                        placeholder="Enter Clinic Name here"
                                        // defaultValue="123456"
                                        required
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
                                // defaultValue={patient?.Address}
                                />
                            </div>
                            <button className='flex items-center bg-blue-dark hover:bg-blue-dark/90 text-white py-2 px-4 rounded ml-auto font-[inter] text-xs'>
                                Save Physician Details
                            </button>
                        </div>
                    </form>
                </div>
                {/* </div> */}
            </Modal>

        </div>
    )
}

export default AddPhysician
