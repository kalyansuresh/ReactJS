import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../App';
import { useAppSelector } from '../../app/hooks'
import { FullScreenLoader } from '../../components/Loader';
import { selectAuthToken } from './authSlice';

const AuthLayout = () => {
    const token = useAppSelector(selectAuthToken);
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        if (!!token) {
            // navigate(ROUTES.HOME)
        } else {
            navigate(ROUTES.LOGIN)
        }
        setLoading(false)
    }, [token]);

    console.log("aaa",token)

    if (isLoading) {
        return <FullScreenLoader />
    }
    return <Outlet />
}

export default AuthLayout