import { Box } from '@mui/system';
import React from 'react';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';

const ProductFilters = ({ filters, onChange }) => {

    const handleCategoryChange = (newCateogryId) => {

        if (!onChange) return;

        const newFilters = {
            ...filters,
            "category.id": newCateogryId,
        };

        onChange(newFilters)
    }

    const handlePriceChange = (values) => {
        if (onChange) {
            onChange(values)
        }
    }

    return (
        <Box>
            <FilterByCategory onChange={handleCategoryChange} />
            <FilterByPrice onChange={handlePriceChange} />
        </Box>
    );
};

export default ProductFilters;