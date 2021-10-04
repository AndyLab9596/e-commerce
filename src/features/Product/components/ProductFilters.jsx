import { Box } from '@mui/system';
import React from 'react';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByService from './Filters/FilterByService';

const ProductFilters = ({ filters, onChange }) => {

    const handleCategoryChange = (newCateogryId) => {

        if (!onChange) return;

        const newFilters = {
            ...filters,
            "category.id": newCateogryId,
        };

        onChange(newFilters)
    }

    const handleChange = (values) => {
        if (onChange) {
            onChange(values)
        }
    }

    return (
        <Box>
            <FilterByCategory onChange={handleCategoryChange} />
            <FilterByPrice onChange={handleChange} />
            <FilterByService filters={filters} onChange={handleChange} />
        </Box>
    );
};

export default ProductFilters;