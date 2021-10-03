import { Skeleton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const ProductItem = ({ product }) => {
    return (
        <Box sx={{ p: 1 }}>
            <Skeleton animation="wave" variant="rect" width="100%" height={118} />
            <Typography variant="body2" >{product.name}</Typography>
            <Typography variant="body2" >{product.salePrice} - {product.promotionPercent}</Typography>
        </Box>
    );
};

export default ProductItem;