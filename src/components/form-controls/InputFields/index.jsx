import { FormControl, FormHelperText, InputLabel, OutlinedInput, TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

const InputField = ({ label, name, form }) => {
    const { formState } = form;
    const hasError = form.formState.touchedFields[name] && formState.errors[name]?.message

    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field }) => (
                // <TextField
                //     {...field}
                //     fullWidth
                //     label={label}
                //     variant="outlined"
                //     margin="normal"
                //     error={!!hasError}
                //     helperText={formState.errors[name]?.message}
                // />

                <FormControl error={!!hasError} variant="outlined" fullWidth margin="normal" >
                    <InputLabel htmlFor={name}>{label}</InputLabel>
                    <OutlinedInput
                        {...field}
                        label={label}
                        id={name}
                    />
                    <FormHelperText id={name}>{formState.errors[name]?.message}</FormHelperText>
                </FormControl>

            )}
        >

        </Controller>
    );
};

export default InputField;