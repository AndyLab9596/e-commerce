import { Tab, Tabs } from '@mui/material';
import React from 'react';

const ProductSort = ({ currentSort, onChange }) => {

    const handleSortChange = (event, newValue) => {
        if (onChange) {
            onChange(newValue)
        }
    }
    return (
        <Tabs
            value={currentSort}
            textColor="secondary"
            indicatorColor="secondary"
            onChange={handleSortChange}
        >
            <Tab label="Giá thấp đến cao" value="salePrice:ASC"></Tab>
            <Tab label="Giá cao đến thấp" value="salePrice:DESC"></Tab>
        </Tabs>
    );
};

export default ProductSort;