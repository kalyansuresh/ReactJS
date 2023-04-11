import React, { useRef } from 'react';
import close from "../../assets/Icons/close.svg";
import threedot from "../../assets/Icons/threedot.svg";
import outlinedcross from "../../assets/Icons/outlinedcross.svg";
import '../../assets/custom.css';
import add from "../../assets/Icons/add.svg";
import physiciansArr from "./data.json";
import useOnClickOutside from '../../hooks/useOnClickOutside';

import EditPhysician from './EditPhysician';
import Modal from '../../components/Modal';
import AddPhysician from './AddPhysician';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../App';
import { useAppDispatch } from '../../app/hooks';
import { useDeletePhysicianMutation, useGetPhysiciansQuery } from '../../features/physician/physicianAPI';
import { toast } from 'react-toastify';
import { ellacoreApi } from '../../app/services';

const EditProfileModal = ({ setPhysicianModal, physician }) => {
  return <>
    <EditPhysician setPhysicianModal={setPhysicianModal} physician={physician} />
  </>
}

const AddProfileModal = ({ setaddPhysicianModal }) => {
  return <>
    <AddPhysician setaddPhysicianModal={setaddPhysicianModal} />
  </>
}



const DeleteProfileModal = ({ setdeletePhysicianModal, physician }) => {

  const [deletePhysician, { isLoading }] = useDeletePhysicianMutation();

  const dispatch = useAppDispatch();

  console.log("ttt", physician.email)

  const deleteProfile = async (e) => {

    try {
      const deletePhysicianRes = await deletePhysician(physician.email).unwrap();
      console.log("response", deletePhysicianRes)
      if (deletePhysicianRes.statusCode === 200) {
        toast.success(deletePhysicianRes.message || "Physician's profile deleted successfully");
        setdeletePhysicianModal(false)
        dispatch(ellacoreApi.util.invalidateTags(["PhysicianProfile"]));
        return;
      }

    } catch (err) {

      console.log("www", err)
      toast.error(err?.data?.message || "Physician's profile not deleted");
    }
  }

  return <>
    <Modal onClose={() => setdeletePhysicianModal(false)} isWindow modalClass={"w-[calc(100%-80px)] md:w-auto"} >

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
            <button className='bg-[#666666] p-2 text-white rounded-sm' onClick={() => setdeletePhysicianModal(false)}>Cancel</button>
            <button className='bg-coral p-2 text-white rounded-sm' onClick={deleteProfile}>Delete</button>
          </div>
        </div>
      </div>

    </Modal>
  </>
}

const Row = ({ setModalVisible, physician }) => {
  const dropdownRef = useRef(null)

  const [showPhysicianModal, setPhysicianModal] = React.useState(null);

  const [deletePhysicianModal, setdeletePhysicianModal] = React.useState(null);


  const [isProfileVisible, setProfileVisible] = React.useState(false);
  useOnClickOutside(dropdownRef, () => {
    setProfileVisible(false)
  })

  return <>
    <tr className="bg-white border-b border-blue-light">
      <td
        scope="row"
        className="px-6 py-2 border-b border-blue-light text-[#1671FB]"
      >

        {physician.physicianname}
      </td>

      <td className="px-6 py-2 border-b border-blue-light">{physician?.email}</td>
      <td className="px-6 py-2 border-b border-blue-light">{physician.phone}</td>
      <td className="px-6 py-2 border-b border-blue-light">{physician.state}</td>
      <td className="px-6 py-2 border-b border-blue-light">{physician.city}</td>
      <td className="px-6 py-2 border-b border-blue-light">{physician.zipcode}</td>
      <td className="px-6 py-2 border-b border-blue-light">{physician.clinicname}</td>
      <td ref={dropdownRef} className="px-9 border-b border-blue-light relative">
        <img className="cursor-pointer" src={threedot} alt="details" onClick={() => setProfileVisible(!isProfileVisible)} />
        {isProfileVisible &&
          <div onClick={(e) => e.stopPropagation()} className="cursor-default rounded-md shadow-2xl absolute top-18 -left-20 w-36  text-sm font-medium text-gray-900 bg-white border border-gray-200  dark:bg-gray-700 dark:border-gray-600 dark:text-white z-10">

            <button
              type="button"
              className="w-full flex px-4 py-2 font-medium text-left border-b border-gray-200 cursor-pointer text-gray-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-blue-100 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white items-center"
              onClick={() => {
                setPhysicianModal((b) => !b)
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
                setdeletePhysicianModal((b) => !b)
                // setProfileVisible(false)
              }}
            >
              <span className='ml-2 text-xs'
              >Delete</span>
            </button>
          </div>}
      </td>
    </tr>

    {showPhysicianModal &&


      <EditProfileModal setPhysicianModal={setPhysicianModal} physician={physician} />


    }

    {deletePhysicianModal &&


      <DeleteProfileModal setdeletePhysicianModal={setdeletePhysicianModal} physician={physician} />


    }

  </>
}

const RowMobile = ({ setModalVisible, physician }) => {
  const dropdownRef = useRef(null)

  const [showPhysicianModal, setPhysicianModal] = React.useState(null);

  const [deletePhysicianModal, setdeletePhysicianModal] = React.useState(null);


  const [isProfileVisible, setProfileVisible] = React.useState(false);
  useOnClickOutside(dropdownRef, () => {
    setProfileVisible(false)
  })


  return <>
    <tr className="bg-white border-b border-blue-light">
      <td className="px-2 py-2 border-b border-blue-light">{physician?.physicianname}</td>
      <td className="px-2 py-2 border-b border-blue-light">{physician?.state}</td>
      <td className="px-2 py-2 border-b border-blue-light">{physician?.city}</td>
      <td className="px-3 py-4 border-b border-blue-light">{physician?.zipcode}</td>

      <td ref={dropdownRef} className="px-5 border-b border-blue-light relative">
        <img className="cursor-pointer w-24" src={threedot} alt="details" onClick={() => setProfileVisible(!isProfileVisible)} />
        {isProfileVisible &&
          <div onClick={(e) => e.stopPropagation()} className="cursor-default rounded-md shadow-2xl absolute top-18 -left-24 w-28  text-sm font-medium text-gray-900 bg-white border border-gray-200  dark:bg-gray-700 dark:border-gray-600 dark:text-white z-10">

            <button
              type="button"
              className="w-full flex px-4 py-2 font-medium text-left border-b border-gray-200 cursor-pointer text-gray-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-blue-100 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white items-center"
              onClick={() => {
                setPhysicianModal((b) => !b)
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
                setdeletePhysicianModal((b) => !b)
                // setProfileVisible(false)
              }}
            >
              <span className='ml-2 text-xs'
              >Delete</span>
            </button>
          </div>}
      </td>
    </tr>

    {showPhysicianModal &&


      <EditProfileModal setPhysicianModal={setPhysicianModal} physician={physician} />


    }

    {deletePhysicianModal &&


      <DeleteProfileModal setdeletePhysicianModal={setdeletePhysicianModal} physician={physician} />


    }

  </>
}


const Physicians = () => {

  const [addPhysicianModal, setaddPhysicianModal] = React.useState(null);

  const [selected, setSelected] = React.useState('');

  const { isLoading, data } = useGetPhysiciansQuery();

  console.log("dataxx", data)

  const handleChange = event => {
    setSelected(event.target.value);
  };

  return (
    <div className=" w-11/12 pb-5 md:pt-2" style={{ height: "520px" }}>
      <p className='px-5 text-xs md:text-sm text-[#797979] font-[inter]'><Link to={ROUTES.HOME}>Dashboard</Link> / <span className='text-[#F37358]'>Physician Management</span></p>
      <div className="flex justify-between px-5 pt-6">
        <p className='hidden md:block font-argent font-medium text-2xl text-[#4F73AC]'>Physician List</p>

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
              setaddPhysicianModal((b) => !b)
            }}
          >
            <img className='mr-2' src={add} alt="" />
            <span>Add New Physician</span>
          </buttton>
        </div>

        <div className='flex-col md:hidden gap-3 w-full'>

          <p className='block md:hidden font-argent font-medium text-2xl mb-5 text-[#4F73AC]'>Physician List</p>


          <div className=' '>
            <div className='w-full flex justify-center'>
              <buttton className="flex justify-center items-center bg-[#6771A4] text-white text-md py-2 px-5 w-4/5 rounded-3xl cursor-pointer font-argent"
                onClick={() => {
                  setaddPhysicianModal((b) => !b)
                }}
              >
                <img className='mr-2' src={add} alt="" />
                <span>Add New Physician</span>
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


      <div className="hidden md:block relative overflow-y-auto my-3 h-full overflow-auto scrollbar scrollbar-thumb-blue-dark scrollbar-track-blue-lightest px-3 " style={{ height: "410px" }}>
        <table className="w-full text-left text-gray-500 dark:text-gray-400 overflow-auto table-auto border-2 border-[#C6D2E4]">
          <thead
            className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-collapse border border-slate-500"
          >
            <tr>
              <th scope="col" className="px-6 py-3 border-b border-blue-light">
                <div className="flex text-base items-center font-argent">
                  Physician Name
                </div>
              </th>

              <th scope="col" className="px-6 py-3 border-b border-blue-light">
                <div className="flex text-base items-center font-argent">
                  Email
                </div>
              </th>
              <th scope="col" className="px-6 py-3 border-b border-blue-light">
                <div className="flex text-base items-center font-argent">
                  Mobile
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
                  Clinic Name

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
            {physiciansArr.map((physician, i) => {
              return <Row key={i} physician={physician} />
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
                  Physician
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

              <th scope="col" className="px-3 py-3 border-b border-blue-light">
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
            {physiciansArr.map((physician, i) => {
              return <RowMobile key={i} physician={physician} />
            })}
          </tbody>
        </table>
      </div>

      {addPhysicianModal &&

        <AddProfileModal setaddPhysicianModal={setaddPhysicianModal} />

      }

    </div>
  )
}

export default Physicians
