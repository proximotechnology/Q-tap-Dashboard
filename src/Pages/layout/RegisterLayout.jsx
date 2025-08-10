import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router'
import { reset } from '../../store/register/businessSlice';

const RegisterLayout = () => {
    const dispatch = useDispatch();


    useEffect(() => {

        return () => {
            console.log("reset RegisterLayout")
            dispatch(reset())
        }
    }, [])
    return (
        <Outlet />
    )
}

export default RegisterLayout