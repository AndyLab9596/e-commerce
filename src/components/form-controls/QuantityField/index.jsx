import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { FormControl, FormHelperText, IconButton, InputLabel, OutlinedInput, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Controller } from 'react-hook-form';

const QuantityField = ({ label, name, form }) => {

    const { formState } = form;
    console.log(form)
    const hasError = form.formState.touchedFields[name] && formState.errors[name]?.message

    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field }) => (
                <FormControl error={!!hasError} variant="outlined" fullWidth margin="normal" size="small">
                    <Typography>Quantity</Typography>
                    <Box>
                        <IconButton onClick={() => form.setValue(name, Number.parseInt(field.value) ? Number.parseInt(field.value) - 1 : 1)}>
                            <RemoveCircleOutline />
                        </IconButton>
                        <OutlinedInput
                            {...field}
                            id={name}
                            type="number"

                        />
                        <IconButton onClick={() => form.setValue(name, Number.parseInt(field.value) + 1)}>
                            <AddCircleOutline />
                        </IconButton>
                    </Box>
                    <FormHelperText id={name}>{formState.errors[name]?.message}</FormHelperText>
                </FormControl>
            )}
        >

        </Controller>
    );
};

export default QuantityField;