import { register } from 'features/Auth/userSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit'
import RegisterForm from '../RegisterForm';

const Register = () => {
    const dispatch = useDispatch();

    const handleSubmit = async (values) => {
        try {
            console.log('Form submit', values)
            // Because the backend requires the username is also email
            values.username = values.email
            // register ở đây là 1 async action đc export trong userSLice
            const resultAction = await dispatch(register(values))
            const user = unwrapResult(resultAction)
            console.log('User', user)
        } catch (error) {
            console.log('Failed to register', error)
        }
    }

    return (
        <div>
            <RegisterForm onSubmit={handleSubmit} />

        </div>
    );
};

export default Register;
