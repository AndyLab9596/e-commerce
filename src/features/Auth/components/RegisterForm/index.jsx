import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import InputField from 'components/form-controls/InputFields';
import { Avatar, Typography, Button, LinearProgress } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import PasswordField from 'components/form-controls/PasswordFields';
import { Box } from '@mui/system';


const useStyles = makeStyles(theme => ({
    root: {

    },
    avatar: {

    },
    title: {

    },
    submit: {

    },

}))

const RegisterForm = (props) => {

    const classes = useStyles()


    const handleSubmit = async (values) => {
        const { onSubmit } = props;
        if (onSubmit) {
            await onSubmit(values)

        }
        // Submit finish then reset the form
        form.reset()
    }

    const schema = yup.object().shape({
        fullName: yup
            .string()
            .test("Should have at least two words", "Please enter at least two words", (values) => {
                return values.split(' ').length >= 2
            })
            .required("Please enter your full name !"),
        email: yup
            .string()
            .email("Please enter valid email !")
            .required("Please enter your email !"),
        password: yup
            .string()
            .min(6)
            // minlength 6 due to the requirement of backend
            // .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 
            // 'Password must have Minimum eight characters, at least one letter, one number and one special character')
            .required("Please enter your password"),
        retypePassword: yup
            .string()
            .oneOf([yup.ref("password")], 'Password does not match !')
            .required("Please retype your password !")
    })

    const form = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            retypePassword: '',
        },
        resolver: yupResolver(schema)
    })

    const { isSubmitting } = form.formState;


    return (
        <div className={classes.root} sx={{ pt: 2, my: 2 }}>

            {isSubmitting && (<Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>)}


            <Avatar className={classes.avatar} sx={{ m: '0 auto', p: 1, }}>
                <LockOutlined />
            </Avatar>

            <Typography className={classes.title} sx={{ textAlign: "center", m: 2 }} component="h3" variant="h5" fontWeight="bold" color="primary">
                Create an account
            </Typography>

            <form onSubmit={form.handleSubmit(handleSubmit)}  >
                <InputField name="fullName" label="Full Name" form={form} />
                <InputField name="email" label="Email" form={form} />
                <PasswordField name="password" label="Password" form={form} />
                <PasswordField name="retypePassword" label="Retype Password" form={form} />
                <Button
                    disabled={isSubmitting}
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    size="large"
                    className={classes.submit}
                >
                    Create An Account
                </Button>
            </form>

        </div>

    );
};

export default RegisterForm;