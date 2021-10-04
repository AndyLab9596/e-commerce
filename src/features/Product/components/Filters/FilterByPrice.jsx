import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';

const useStyles = makeStyles({
    root: {
        padding: 16,
        borderTop: '1px solid rgba(0,0,0,0.5)',

    },

    range: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 8,

        "& > span": {
            marginLeft: '8px',
            marginRight: '8px',
        }

    },
})

const FilterByPrice = ({ onChange }) => {
    const classes = useStyles()

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
        <Box className={classes.root}>
            <Typography variant="subtitle2">GÍA</Typography>

            <Box className={classes.range}>
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