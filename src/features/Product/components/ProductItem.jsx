import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import FORM_MONEY from 'constants/formMoney';
import { THUMBNAIL_PLACEHOLDER, STATIC_HOST } from 'constants/index';
import { useHistory } from 'react-router';
import React from 'react';

const ProductItem = ({ product }) => {

    const history = useHistory()
    const thumbnailUrl = product.thumbnail ?
        `${STATIC_HOST}${product.thumbnail?.url}`
        : `${THUMBNAIL_PLACEHOLDER}`
    const handleClick = () => {
        history.push(`/products/${product.id}`)
    }
    return (
        <Box sx={{ p: 1 }} onClick={handleClick}>
            {/* Set minHeight for the box outside img tag for better UI, we can set minHeight for difference displays */}
            <Box sx={{ p: 1, minHeight: "215px" }}>
                <img src={thumbnailUrl}
                    // onError={e => (e.target.src = "https://picsum.photos/264/370/")}
                    alt={product.name} width="100%"

                />
            </Box>
            <Typography variant="body2" >{product.name}</Typography>
            <Typography variant="body2" >
                <Box component="span" fontSize="16px" fontWeight="bold" mr={1}  >
                    {FORM_MONEY(product.salePrice)}
                </Box>
                {product.promotionPercent > 0 ? `${-product.promotionPercent}%` : ''}
            </Typography>
        </Box>
    );
};

export default ProductItem;