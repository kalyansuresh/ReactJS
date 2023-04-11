import React, { useRef } from 'react';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import clinicArr from "./data.json";
import threedot from "../../assets/Icons/threedot.svg";
import EditClinic from './EditClinic';
import Modal from '../../components/Modal';
import outlinedcross from "../../assets/Icons/outlinedcross.svg";
import leftArrow from "../../assets/Icons/LeftArrow-outlined.svg";
import rightArrow from "../../assets/Icons/RightArrow-outlined.svg";
import add from "../../assets/Icons/add.svg";
import AddClinic from './AddClinic';
import '../../assets/custom.css';
import { useDeleteClinicMutation, useGetClinicsQuery } from '../../features/clinic/clinicAPI';
import { useAppDispatch } from '../../app/hooks';
import { ellacoreApi } from '../../app/services';
import { toast } from 'react-toastify';
import { CircleLoader, FullScreenLoader } from '../../components/Loader';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../App';

const EditProfileModal = ({ setClinicModal, clinic }) => {
  return <>
    <EditClinic setClinicModal={setClinicModal} clinic={clinic} />
  </>
}

const AddProfileModal = ({ setaddClinicModal }) => {
  return <>
    <AddClinic setaddClinicModal={setaddClinicModal} />
  </>
}

const DeleteProfileModal = ({ setdeleteClinicModal, clinic }) => {


  const [deleteClinic, { isLoading }] = useDeleteClinicMutation();

  const dispatch = useAppDispatch();

  console.log("ttt", clinic.email)

  const deleteProfile = async (e) => {

    try {
      const deleteClinicRes = await deleteClinic(clinic.email).unwrap();
      console.log("response", deleteClinicRes)
      if (deleteClinicRes.statusCode === 200) {
        toast.success(deleteClinicRes.message || "Clinic deleted successfully");
        setdeleteClinicModal(false)
        dispatch(ellacoreApi.util.invalidateTags(["ClinicProfile"]));
        return;
      }

    } catch (err) {

      console.log("www", err)
      toast.error(err?.data?.message || "Clinic not deleted");
    }
  }

  return <>
    <Modal onClose={() => setdeleteClinicModal(false)} isWindow modalClass={"w-[calc(100%-80px)] md:w-auto"} >

      <div className="flex-col pt-3 px-8">
        <div className='flex justify-center w-full mb-6 mt-3'>
          <img src={outlinedcross} alt="cross-sign" />
        </div>
        <div className='flex justify-center w-full text-2xl text-black mt-1 mb-6 font-argent font-medium'>
          <p>Are you sure?</p>
        </div>

        <div className='flex justify-center w-full mt-1 mb-7 font-[inter] text-center'>
          <p>Do you really want to delete these records?<br /> This process cannot be undone.</p>
        </div>

        <div>
          <div className='flex justify-center w-full gap-2 font-[inter]'>
            <button className='bg-[#666666] p-2 text-white rounded-sm' onClick={() => setdeleteClinicModal(false)}>Cancel</button>
            <button className='bg-coral p-2 text-white rounded-sm' onClick={deleteProfile} >Delete</button>
          </div>
        </div>
      </div>

    </Modal>
  </>
}


const Row = ({ setModalVisible, clinic }) => {
  const dropdownRef = useRef(null)

  const [showClinicModal, setClinicModal] = React.useState(null);
  const [deleteClinicModal, setdeleteClinicModal] = React.useState(null);


  const [isProfileVisible, setProfileVisible] = React.useState(false);
  useOnClickOutside(dropdownRef, () => {
    setProfileVisible(false)
  })


  return <>
    <tr className="bg-white border-b border-blue-light">
      <td className="px-6 py-4 border-b border-blue-light">{clinic?.clinicname}</td>
      <td className="px-6 py-4 border-b border-blue-light">{clinic?.phone}</td>
      <td className="px-6 py-4 border-b border-blue-light">{clinic?.email}</td>
      {/* <td className="px-6 py-4 border-b border-blue-light">{clinic?.Address.length > 50 ? clinic?.Address.slice(0, 50) + "..." : clinic?.Address}</td> */}
      <td className="px-6 py-4 border-b border-blue-light">{clinic?.state}</td>
      <td className="px-6 py-4 border-b border-blue-light">{clinic?.city}</td>
      <td className="px-6 py-4 border-b border-blue-light">{clinic?.zipcode}</td>

      <td ref={dropdownRef} className="px-9 border-b border-blue-light relative">
        <img className="cursor-pointer" src={threedot} alt="details" onClick={() => setProfileVisible(!isProfileVisible)} />
        {isProfileVisible &&
          <div onClick={(e) => e.stopPropagation()} className="cursor-default rounded-md shadow-2xl absolute top-18 -left-20 w-36  text-sm font-medium text-gray-900 bg-white border border-gray-200  dark:bg-gray-700 dark:border-gray-600 dark:text-white z-10">

            <button
              type="button"
              className="w-full flex px-4 py-2 font-medium text-left border-b border-gray-200 cursor-pointer text-gray-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-blue-100 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white items-center"
              onClick={() => {
                setClinicModal((b) => !b)
                // setProfileVisible(false)
              }}
            >
              <span className='ml-2 text-xs'
              >Update</span>

            </button>
            <button
              // onClick={handleLogout}
              type="button"
              className="flex items-center w-full px-4 py-2 font-medium text-left  cursor-pointer  hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white text-gray-500"
              onClick={() => {
                setdeleteClinicModal((b) => !b)
                // setProfileVisible(false)
              }}
            >
              <span className='ml-2 text-xs'
              >Delete</span>
            </button>
          </div>}
      </td>
    </tr>

    {showClinicModal &&


      <EditProfileModal setClinicModal={setClinicModal} clinic={clinic} />


    }

    {deleteClinicModal &&


      <DeleteProfileModal setdeleteClinicModal={setdeleteClinicModal} clinic={clinic} />


    }

  </>
}

const RowMobile = ({ setModalVisible, clinic }) => {
  const dropdownRef = useRef(null)

  const [showClinicModal, setClinicModal] = React.useState(null);
  const [deleteClinicModal, setdeleteClinicModal] = React.useState(null);


  const [isProfileVisible, setProfileVisible] = React.useState(false);
  useOnClickOutside(dropdownRef, () => {
    setProfileVisible(false)
  })


  return <>
    <tr className="bg-white border-b border-blue-light">
      <td className="px-2 py-2 border-b border-blue-light">{clinic?.clinicname}</td>
      <td className="px-2 py-2 border-b border-blue-light">{clinic?.state}</td>
      <td className="px-2 py-2 border-b border-blue-light">{clinic?.city}</td>
      <td className="px-2 py-4 border-b border-blue-light">{clinic?.zipcode}</td>

      <td ref={dropdownRef} className="px-4 border-b border-blue-light relative">
        <img className="cursor-pointer w-24" src={threedot} alt="details" onClick={() => setProfileVisible(!isProfileVisible)} />
        {isProfileVisible &&
          <div onClick={(e) => e.stopPropagation()} className="cursor-default rounded-md shadow-2xl absolute top-18 -left-24 w-28  text-sm font-medium text-gray-900 bg-white border border-gray-200  dark:bg-gray-700 dark:border-gray-600 dark:text-white z-10">

            <button
              type="button"
              className="w-full flex px-4 py-2 font-medium text-left border-b border-gray-200 cursor-pointer text-gray-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-blue-100 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white items-center"
              onClick={() => {
                setClinicModal((b) => !b)
                // setProfileVisible(false)
              }}
            >
              <span className='ml-2 text-xs'
              >Update</span>

            </button>
            <button
              // onClick={handleLogout}
              type="button"
              className="flex items-center w-full px-4 py-2 font-medium text-left  cursor-pointer  hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white text-gray-500"
              onClick={() => {
                setdeleteClinicModal((b) => !b)
                // setProfileVisible(false)
              }}
            >
              <span className='ml-2 text-xs'
              >Delete</span>
            </button>
          </div>}
      </td>
    </tr>

    {showClinicModal &&


      <EditProfileModal setClinicModal={setClinicModal} clinic={clinic} />


    }

    {deleteClinicModal &&


      <DeleteProfileModal setdeleteClinicModal={setdeleteClinicModal} clinic={clinic} />


    }

  </>
}

const ClinicManagement = () => {

  const [addClinicModal, setaddClinicModal] = React.useState(null);
  const [selected, setSelected] = React.useState('');
  const { isLoading, data } = useGetClinicsQuery();

  console.log("dataxx", data)

  const handleChange = event => {
    setSelected(event.target.value);
  };

  return (
    <>
      {isLoading ?
        <div className='flex justify-center m-auto'>
          <FullScreenLoader />
        </div>
        :
        <div className="  w-11/12 pb-5 md:pt-2" style={{ height: "520px" }}>
          <p className='px-5 text-xs md:text-sm text-[#797979] font-[inter]'><Link to={ROUTES.HOME}>Dashboard</Link> / <span className='text-[#F37358]'>Clinic Management</span></p>
          <div className="flex justify-between px-5 pt-6">
            <p className='hidden md:block font-argent font-medium text-2xl text-[#4F73AC]'>Clinics List</p>

            <div className='hidden md:flex gap-3'>
              <div className='select_box'>
                <select className="text-[#6771A4] font-medium bg-gray-50 border border-blue-100  rounded-3xl focus:ring-blue-500 focus:border-blue-500 block   p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none placeholder-[#cac8c8] text-sm" value={selected} onChange={handleChange} >
                  <option disabled={true} value=""> State </option>
                  <option> California </option>
                  <option> Texas </option>
                  <option> Florida </option>
                </select>
              </div>

              <div className='select_box'>
                <select className="text-[#6771A4] font-medium bg-gray-50 border border-blue-100  rounded-3xl focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none placeholder-[#cac8c8] text-sm" value={selected} onChange={handleChange}>
                  <option disabled={true} value=""> City </option>
                  <option> Los Angeles </option>
                  <option> 	San Diego </option>
                  <option> San Jose </option>
                </select>
              </div>
              <input
                name="zipcode"
                type="text"
                className="w-28 border focus:bg-white border-[#E9E9E9] text-[#6771A4] text-sm placeholder:font-medium placeholder:text-sm placeholder:font-[inter] font-[inter] rounded-3xl block pl-6 dark:bg-gray-700 dark:border-[#6771A4] dark:placeholder-[#6771A4] placeholder:text-[#6771A4] dark:text-white outline-none h-10"
                placeholder="Zipcode"
                maxLength={5}
              />
              <buttton className="flex items-center bg-[#6771A4] text-white text-lg py-1 px-10 rounded-3xl cursor-pointer font-argent"
                onClick={() => {
                  setaddClinicModal((b) => !b)
                }}
              >
                <img className='mr-2' src={add} alt="" />
                <span>Add New Clinic</span>
              </buttton>
            </div>

            <div className='flex-col md:hidden gap-3 w-full'>

              <p className='block md:hidden font-argent font-medium text-2xl mb-5 text-[#4F73AC]'>Clinics List</p>


              <div className=' '>
                <div className='w-full flex justify-center'>
                  <buttton className="flex items-center bg-[#6771A4] text-white text-md py-2 px-5 w-3/5 rounded-3xl cursor-pointer font-argent"
                    onClick={() => {
                      setaddClinicModal((b) => !b)
                    }}
                  >
                    <img className='mr-2' src={add} alt="" />
                    <span>Add New Clinic</span>
                  </buttton>
                </div>

                <div className='flex mt-2 gap-2 w-full justify-center'>
                  <div className='select_box w-1/3'>
                    <select className="text-[#6771A4] font-medium bg-gray-50 border border-blue-100  rounded-3xl focus:ring-blue-500 focus:border-blue-500 block   p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none placeholder-[#cac8c8] text-sm" value={selected} onChange={handleChange} >
                      <option disabled={true} value=""> State </option>
                      <option> California </option>
                      <option> Texas </option>
                      <option> Florida </option>
                    </select>
                  </div>

                  <div className='select_box w-1/3'>
                    <select className="text-[#6771A4] font-medium bg-gray-50 border border-blue-100  rounded-3xl focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none placeholder-[#cac8c8] text-sm" value={selected} onChange={handleChange}>
                      <option disabled={true} value=""> City </option>
                      <option> Los Angeles </option>
                      <option> 	San Diego </option>
                      <option> San Jose </option>
                    </select>
                  </div>

                  <input
                    name="zipcode"
                    type="number"
                    className="w-1/3 border focus:bg-white border-[#E9E9E9] text-gray-900 text-md placeholder:font-argent font-[inter] rounded-3xl block pl-6 py-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none h-12"
                    placeholder="Zipcode"
                  />

                </div>
              </div>

            </div>

          </div>


          <div className="hidden md:block relative overflow-y-auto my-3 h-full overflow-auto scrollbar scrollbar-thumb-blue-dark scrollbar-track-blue-lightest px-3 " style={{ height: "380px" }}>

            <table className=" w-full text-left text-gray-500 dark:text-gray-400 overflow-auto table-auto border-2 border-[#C6D2E4]">
              <thead
                className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-collapse border border-slate-500"
              >
                <tr>
                  <th scope="col" className="px-6 py-3 border-b border-blue-light">
                    <div className="flex text-base items-center font-argent">
                      Clinic Name
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 border-b border-blue-light">
                    <div className="flex text-base items-center font-argent">
                      Contact Number
                    </div>
                  </th>

                  <th scope="col" className="px-6 py-3 border-b border-blue-light">
                    <div className="flex text-base items-center font-argent">
                      Email
                    </div>
                  </th>

                  <th scope="col" className="px-6 py-3 border-b border-blue-light">
                    <div className="flex text-base items-center font-argent">
                      State
                    </div>
                  </th>

                  <th scope="col" className="px-6 py-3 border-b border-blue-light">
                    <div className="flex text-base items-center font-argent">
                      City
                    </div>
                  </th>

                  <th scope="col" className="px-6 py-3 border-b border-blue-light">
                    <div className="flex text-base items-center font-argent">
                      Zipcode
                    </div>
                  </th>

                  <th scope="col" className="px-6 py-3 border-b border-blue-light">
                    <div className="flex text-base items-center font-argent">
                      Action
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className=' font-[inter] text-xs'>

                {isLoading ? <>Loading</> : data?.data?.map((clinic, i) => {
                  return <Row key={i} clinic={clinic} />
                })}
              </tbody>
            </table>
          </div>

          <div className="block md:hidden relative overflow-y-auto my-3 h-full overflow-auto scrollbar scrollbar-thumb-blue-dark scrollbar-track-blue-lightest  " style={{ height: "380px" }}>

            <table className=" w-auto text-left text-gray-500 dark:text-gray-400 overflow-auto table-auto border-2 border-[#C6D2E4]">
              <thead
                className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-collapse border border-slate-500"
              >
                <tr>
                  <th scope="col" className="px-2 py-1 border-b border-blue-light">
                    <div className="flex text-base items-center font-argent">
                      Clinic
                    </div>
                  </th>

                  <th scope="col" className="px-2 py-1 border-b border-blue-light">
                    <div className="flex text-base items-center font-argent">
                      State
                    </div>
                  </th>

                  <th scope="col" className="px-2 py-3 border-b border-blue-light">
                    <div className="flex text-base items-center font-argent">
                      City
                    </div>
                  </th>

                  <th scope="col" className="px-2 py-3 border-b border-blue-light">
                    <div className="flex text-base items-center font-argent">
                      Zipcode
                    </div>
                  </th>

                  <th scope="col" className="px-2 py-1 border-b border-blue-light">
                    <div className="flex text-base items-center font-argent">

                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className=' font-[inter] text-xs'>
                {isLoading ? <>Loading</> : data?.data?.map((clinic, i) => {
                  return <RowMobile key={i} clinic={clinic} />
                })}
              </tbody>
            </table>
          </div>

          <div className=' px-5 font-[inter] text-sm'>

            <div className='flex justify-between'>
              <div className='flex font-[inter] text-xs md:text-sm items-center gap-2'>
                <p>Showing Result </p>
                <select className="bg-gray-50 border border-blue-100  rounded-md focus:ring-blue-500 focus:border-blue-500 block  px-2.5 py-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none placeholder-[#cac8c8] text-xs" id="myList" onchange="favTutorial()" >
                  <option disabled={true} value=""> 1 </option>
                  <option> 2 </option>
                  <option> 3 </option>
                  <option> 4 </option>
                </select>
              </div>

              <div className='flex items-center gap-3'>
                <img src={leftArrow} alt="" />
                <p className='w-16 md:w-20 text-xs md:text-sm'>Page 1 of 3</p>
                <img src={rightArrow} alt="" />
              </div>
            </div>

          </div>

          {addClinicModal &&

            <AddProfileModal setaddClinicModal={setaddClinicModal} />

          }

        </div>

      }
    </>
  )
}

export default ClinicManagement
