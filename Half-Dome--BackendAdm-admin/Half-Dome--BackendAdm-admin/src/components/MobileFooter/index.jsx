import React from 'react'
import { Link } from 'react-router-dom';
import { ROUTES } from '../../App';
import Home from "../../assets/Icons/Home.svg";
import Patient from "../../assets/Icons/Patient.svg";
import Physician from "../../assets/Icons/physician.svg";
import Procedures from "../../assets/Icons/Procedure.svg";
import Cartridges from "../../assets/Icons/Cartridge.svg";


function MobileFooter() {
  return (
    <div className="border-t-2 border-gray-200 pb-2 shadow-inner" style={{overflowX:"auto"}}>
      <nav className=" h-12 px-2 py-2.5 z-1 sticky top-0 pb-2">
                {/* <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl "> */}
                    
                   
                        <ul className='flex justify-around px-2 gap-4 md:gap-7 items-center pb-1'>
                            <Link className="text-white" to={ROUTES.HOME} ><img src={Home} alt="dashboard" /></Link>
                            <Link className="text-white" to={ROUTES.PATIENTS}><img src={Patient} alt="patient_logo" /></Link>
                            <Link className="text-white" to={ROUTES.PHYSICIANS}><img src={Physician} alt="physician_logo" /></Link>
                            <Link className="text-white" to={ROUTES.PROCEDURES}><img src={Procedures} alt="procedures_logo" /></Link>
                            <Link className="text-white" to={ROUTES.CARTRIDGES}><img src={Cartridges} alt="cartridges_logo" /></Link>
                            
                        </ul>
                  
                {/* </div> */}
            </nav>
    </div>
  )
}

export default MobileFooter
