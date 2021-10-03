import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import categoryApi from 'api/categoryApi';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles(theme => ({
    root: {
        padding: 16,
    },

    menu: {
        padding: 0,
        margin: 0,
        listStyleType: 'none',

        '& > li': {
            marginTop: 8,
            transition: 'all .3s linear',
            '&:hover': {
                cursor: 'pointer',
                color: "#14a37f",
            }
        }
    }

}))


const FilterByCategory = ({ onChange }) => {
    const classes = useStyles();
    const [cateogryList, setCategoryList] = useState([]);
    useEffect(() => {
        try {
            (async () => {
                const response = await categoryApi.getAll();
                setCategoryList(response.map((res) => (
                    {
                        id: res.id,
                        name: res.name
                    }
                )))
            })()

        } catch (error) {
            console.log('Failed to fetch category list', error)
        }

    }, [])

    const handleCategoryClick = (category) => {
        if (onChange) {
            onChange(category.id)
        }
    }

    return (
        <Box className={classes.root}>

            <Typography
                variant="subtitle2"

            >DANH MỤC SẢN PHẨM</Typography>

            <ul className={classes.menu}>
                {cateogryList.map((category, idx) => (
                    <li onClick={() => handleCategoryClick(category)} key={category.id}>
                        <Typography
                            variant="body2"
                        >{category.name}</Typography>
                    </li>
                ))}
            </ul>

        </Box>
    );
};

export default FilterByCategory;