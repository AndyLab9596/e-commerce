import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';

const FilterByPrice = ({ onChange }) => {

    const [values, setValues] = useState({
        salePrice_gte: 0,
        salePrice_lte: 0,
    })

    const handleChange = (e) => {
        setValues(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    const handleSubmit = () => {
        if (onChange) onChange(values)

        setValues({
            salePrice_gte: 0,
            salePrice_lte: 0,
        })
    }

    return (
        <Box>
            <Typography variant="subtitle2">GÍA</Typography>

            <Box>
                <TextField variant="standard" name="salePrice_gte" value={values.salePrice_gte} onChange={handleChange} />
                <span>-</span>
                <TextField variant="standard" name="salePrice_lte" value={values.salePrice_lte} onChange={handleChange} />
            </Box>

            <Button
                variant="outlined"
                color="primary"
                onClick={handleSubmit}>
                Áp dụng
            </Button>

        </Box>
    );
};

export default FilterByPrice;