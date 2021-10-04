import { Box } from '@mui/system';
import { STATIC_HOST } from 'constants/common';
import { THUMBNAIL_PLACEHOLDER } from 'constants/common';
import React from 'react';

const ProductThumbnail = ({ product }) => {
    const thumbnailUrl = product.thumbnail ?
        `${STATIC_HOST}${product.thumbnail?.url}`
        : `${THUMBNAIL_PLACEHOLDER}`
    return (
        <Box>
            <img src={thumbnailUrl} alt={product.name} width="100%" />
        </Box>
    );
};

export default ProductThumbnail;