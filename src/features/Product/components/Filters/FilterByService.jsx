import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React from 'react';

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

    list: {
        padding: 0,
        margin: 0,
        listStyleType: 'none',

        '& > li': {
            marginTop: 16,
        }
    }
})

const FilterByService = ({ filters, onChange }) => {
    const classes = useStyles()

    // const [values, setValues] = useState({
    //     isPromotion: Boolean(filters.isPromotion),
    //     isFreeShip: Boolean(filters.isFreeShip),
    // })

    const handleChange = (e) => {
        // setValues(prev => ({
        //     ...prev,
        //     [e.target.checked]: e.target.value,
        // }));
        if (onChange) onChange({ [e.target.name]: e.target.checked })
        console.log({ [e.target.name]: e.target.checked })
    }

    // const handleSubmit = () => {
    //     if (onChange) onChange(values)

    // }

    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2">DỊCH VỤ</Typography>

            <ul className={classes.list}>
                {['isPromotion', 'isFreeShip'].map(service => {
                    // console.log(filters)
                    return (
                        <li key={service}>
                            {/* <Checkbox color="secondary" checked={values[service]} onChange={handleChange} name={service} /> */}
                            <FormControlLabel
                                label={service.slice(2)}
                                control={
                                    <Checkbox
                                        color="secondary" checked={Boolean(filters[service])} onChange={handleChange} name={service}
                                    />
                                }
                            />
                        </li>
                    )
                })}
            </ul>

        </Box>
    );
};

export default FilterByService;