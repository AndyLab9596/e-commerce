import { yupResolver } from '@hookform/resolvers/yup';
import { LockOutlined } from '@mui/icons-material';
import { Avatar, Button, LinearProgress, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import InputField from 'components/form-controls/InputFields';
import PasswordField from 'components/form-controls/PasswordFields';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";


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

const LoginForm = (props) => {

    const classes = useStyles()


    const handleSubmit = async (values) => {
        const { onSubmit } = props;
        if (onSubmit) {
            await onSubmit(values)

        }

    }

    const schema = yup.object().shape({
        identifier: yup
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

    })

    const form = useForm({
        defaultValues: {
            identifier: '',
            password: '',
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
                Sign In
            </Typography>

            <form onSubmit={form.handleSubmit(handleSubmit)}  >
                <InputField name="identifier" label="Email" form={form} />
                <PasswordField name="password" label="Password" form={form} />
                <Button
                    disabled={isSubmitting}
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    size="large"
                    className={classes.submit}
                >
                    Sign In
                </Button>
            </form>

        </div>

    );
};

export default LoginForm;