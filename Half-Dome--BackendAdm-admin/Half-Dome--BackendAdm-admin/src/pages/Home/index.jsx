import React from 'react';
import expand from "../../assets/Icons/expand.svg";
import agePlot from "../../assets/Images/agePlot.svg";
import age1 from "../../assets/Images/26-46.svg";
import age2 from "../../assets/Images/47-55.svg";
import age3 from "../../assets/Images/56-70.svg";
import statusPlot from "../../assets/Images/statusPlot.svg";
import statusNew from "../../assets/Images/status-new.svg";
import statusExisting from "../../assets/Images/status-existing.svg";
import genderPlot from "../../assets/Images/genderPlot.svg";
import genderFemale from "../../assets/Images/gender-female.svg";
import genderMale from "../../assets/Images/gender-male.svg";
import procedurePlot from "../../assets/Images/procedurePlot.svg";
import proce1 from "../../assets/Images/proce-1.svg";
import proce2 from "../../assets/Images/proce-2.svg";
import proce3 from "../../assets/Images/proce-3.svg";
import proce4 from "../../assets/Images/proce-4.svg";
import procedureTaken from "../../assets/Images/procedure-taken.svg";


function Home() {
  return (
    <div className="bg-white w-11/12 pb-10">

      <div className=" grid md:grid-cols-2 lg:grid-cols-5 gap-3.5 font-argent">

        <div className="bg-white border border-[#C6D2E4] flex-col p-4 py-2" style={{ height: "237px" }}>

          <p className='text-3xl font-argent font-medium text-[#4F73AC]'>Total Patients Registered</p>
          <p className='text-4xl font-[inter] font-bold mt-20'>1750</p>


        </div>

        <div className="bg-white border border-[#C6D2E4] flex-col p-4" style={{}}>

          <div className='flex justify-between'>
            <p className='text-[#587AB2] text-lg'>Age</p>
            <img className='cursor-pointer' src={expand} alt="" />
          </div>

          <div className='flex gap-3 mt-12 justify-around'>
            <img src={agePlot} alt="" />
            <div className=' gap-4'>
              <img className='mb-1' src={age1} alt="26-46" />
              <img className='mb-1' src={age2} alt="47-55" />
              <img className='mb-1' src={age3} alt="56-70" />
            </div>
          </div>


        </div>

        <div className="bg-white border border-[#C6D2E4] flex-col p-4" style={{}}>

          <div className='flex justify-between'>
            <p className='text-[#587AB2] text-lg'>Status</p>
            <img className='cursor-pointer' src={expand} alt="" />
          </div>

          <div className='flex gap-3 mt-12 justify-around'>
            <img src={statusPlot} alt="" />
            <div className=' gap-4'>
              <img className='mb-1' src={statusNew} alt="26-46" />
              <img className='mb-1' src={statusExisting} alt="47-55" />
            </div>
          </div>

        </div>

        <div className="bg-white border border-[#C6D2E4] flex-col p-4" style={{}}>

          <div className='flex justify-between'>
            <p className='text-[#587AB2] text-lg'>Gender</p>
            <img className='cursor-pointer' src={expand} alt="" />
          </div>

          <div className='flex gap-3 mt-12 justify-around'>
            <img src={genderPlot} alt="" />
            <div className=' gap-4'>
              <img className='mb-1' src={genderFemale} alt="26-46" />
              <img className='mb-1' src={genderMale} alt="47-55" />
            </div>
          </div>

        </div>

        <div className="bg-white border border-[#C6D2E4] flex-col p-4" style={{}}>

          <div className='flex justify-between'>
            <p className='text-[#587AB2] text-lg'>Procedure Counts</p>
            <img className='cursor-pointer' src={expand} alt="" />
          </div>

          <div className='flex gap-3 mt-12 justify-around'>
            <img src={procedurePlot} alt="" />
            <div className=' gap-4'>
              <img className='mb-1' src={proce1} alt="26-46" />
              <img className='mb-1' src={proce2} alt="47-55" />
              <img className='mb-1' src={proce3} alt="26-46" />
              <img className='mb-1' src={proce4} alt="47-55" />
            </div>
          </div>

        </div>


      </div>

      <div className=' mt-5 bg-white border border-[#C6D2E4] px-4 pt-3'>

        <p className='text-3xl font-argent font-medium text-[#4F73AC]'>Procedure taken</p>
        <img className='m-auto my-10' src={procedureTaken} alt="" />

      </div>

      <div className=' mt-5 bg-[#F4F8FF] border border-[#C6D2E4] px-4 pt-3'>

        <div className='flex justify-between'>
          <p className='text-3xl font-argent font-medium text-[#4F73AC]'>Total Procedure</p>
          <select className="bg-gray-50 border border-blue-100  rounded focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none placeholder-[#cac8c8] text-xs" id="myList" onchange="favTutorial()" >

            <option> Today </option>
            <option> Weekly </option>
            <option> Monthly </option>
          </select>
        </div>
        <hr className='mt-2' />

        <div className='flex justify-around mt-10'>

          <div className='flex-col items-center '>

            <p className='font-argent text-xl font-medium'>Ranking of skin <span className='font-[inter]'> %</span> used</p>
            <p className='font-[inter] text-3xl text-[#F37358] font-semibold flex justify-center  mt-4'><span className=''>30</span></p>

          </div>

          <div className='flex-col items-center '>

            <p className='font-argent text-xl font-medium'>Most common depth used</p>
            <p className='font-[inter] text-3xl text-[#F37358] font-semibold flex justify-center  mt-4'><span className=''>32</span></p>

          </div>

          <div className='flex-col items-center'>

            <p className='font-argent text-xl font-medium'>Most common error code <span className='font-[inter]'>(</span>s<span className='font-[inter]'>)</span></p>
            <p className='font-[inter] text-3xl text-[#F37358] font-semibold flex justify-center mt-4'><span className=''>34</span></p>

          </div>
        </div>

      </div>


    </div>
  )
}

export default Home
