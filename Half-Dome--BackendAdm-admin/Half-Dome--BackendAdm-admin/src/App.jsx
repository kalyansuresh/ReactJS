import React from 'react';
import { Routes, Route } from "react-router-dom"
import './App.css';
import Cartridges from './pages/Cartridges';
import DashboardLayout from './components/Layout/DashboardLayout';
import Patient from './pages/Patient';
import Physicians from './pages/Physicians';
import Procedures from './pages/Procedures';
import Home from './pages/Home';
import Login from './pages/Login';
import Notification from './pages/Notification';
import Clinic from './pages/Clinic';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthLayout from './features/auth/AuthLayout';
import EditClinic from './pages/Clinic/EditClinic';
import AddClinic from './pages/Clinic/AddClinic';

export const ROUTES = {
  LOGIN: "/login",
  HOME: "/",
  NOTIFICATION: "/notification",
  PATIENTS: "/patients",
  PHYSICIANS: "/physicians",
  PROCEDURES: "/procedures",
  CARTRIDGES: "/cartridges",
  CLINIC: "/clinic",
  ADDCLINIC: "/clinic/addclinic",
  EDITCLINIC: "/clinic/editclinic",
}
function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route element={<DashboardLayout />} >
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.NOTIFICATION} element={<Notification />} />
            <Route path={ROUTES.PATIENTS} element={<Patient />} />
            <Route path={ROUTES.PHYSICIANS} element={<Physicians />} />
            <Route path={ROUTES.PROCEDURES} element={<Procedures />} />
            <Route path={ROUTES.CARTRIDGES} element={<Cartridges />} />
            <Route path={ROUTES.CLINIC} element={<Clinic />} />
            <Route path={ROUTES.ADDCLINIC} element={<AddClinic />} />
            <Route path={ROUTES.EDITCLINIC} element={<EditClinic />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
