import { Box } from '@mui/system';
import React from 'react';
import FilterByCategory from './Filters/FilterByCategory';

const ProductFilters = ({ filters, onChange }) => {

    const handleCategoryChange = (newCateogryId) => {

        if (!onChange) return;

        const newFilters = {
            ...filters,
            "category.id": newCateogryId,
        };

        onChange(newFilters)
    }

    return (
        <Box>
            <FilterByCategory onChange={handleCategoryChange} />



        </Box>
    );
};

export default ProductFilters;