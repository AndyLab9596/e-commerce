import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { THUMBNAIL_PLACEHOLDER, STATIC_HOST } from 'constants/index';
import React from 'react';

const ProductItem = ({ product }) => {
    const thumbnailUrl = product.thumbnail ? `${STATIC_HOST}${product.thumbnail?.url}`
        : `${THUMBNAIL_PLACEHOLDER}`
    return (
        <Box sx={{ p: 1 }}>
            <Box sx={{ p: 1 }}>
                <img src={thumbnailUrl}
                    // onError={e => (e.target.src = "https://picsum.photos/264/370/")}
                    alt={product.name} width="100%" />
            </Box>
            <Typography variant="body2" >{product.name}</Typography>
            <Typography variant="body2" >{product.salePrice} - {product.promotionPercent}</Typography>
        </Box>
    );
};

export default ProductItem;