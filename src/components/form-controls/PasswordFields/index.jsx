import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

const PasswordField = ({ label, name, form }) => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(prevState => !prevState)
    }
    const { formState } = form;
    const hasError = form.formState.touchedFields[name] && formState.errors[name]?.message

    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field }) => (
                <FormControl error={!!hasError} variant="outlined" fullWidth margin="normal" >
                    <InputLabel htmlFor={name}>{label}</InputLabel>
                    <OutlinedInput
                        {...field}
                        label={label}
                        id={name}
                        type={showPassword ? 'text' : 'password'}

                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={toggleShowPassword}
                                    onMouseDown={toggleShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={70}
                    />
                    <FormHelperText id={name}>{formState.errors[name]?.message}</FormHelperText>
                </FormControl>
            )}
        >

        </Controller>
    );
};

export default PasswordField;