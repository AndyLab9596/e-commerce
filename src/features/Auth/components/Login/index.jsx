import { unwrapResult } from '@reduxjs/toolkit';
import { login } from 'features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from '../LoginForm';

const Login = ({ handleCloseDialog }) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (values) => {
        try {
            const resultAction = await dispatch(login(values))
            const user = unwrapResult(resultAction)

            if (handleCloseDialog) {
                handleCloseDialog()
            }
            enqueueSnackbar('Register Successfully !! 🚀', { variant: 'success' })
        } catch (error) {
            console.log('Failed to register', error)
            enqueueSnackbar(error.message, { variant: 'error' })
        }
    }

    return (
        <div>
            <LoginForm onSubmit={handleSubmit} />

        </div>
    );
};

export default Login;
