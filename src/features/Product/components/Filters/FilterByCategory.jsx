import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import categoryApi from 'api/categoryApi';
import React, { useEffect, useState } from 'react';


const FilterByCategory = ({ onChange }) => {

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
        <Box>
            <Typography>DANH MỤC SẢN PHẨM</Typography>

            <ul>
                {cateogryList.map((category, idx) => (
                    <li onClick={() => handleCategoryClick(category)} key={category.id}>
                        {category.name}
                    </li>
                ))}
            </ul>
        </Box>
    );
};

export default FilterByCategory;