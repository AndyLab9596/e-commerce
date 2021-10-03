import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ data }) => {
    return (
        <Box>
            <Grid container>
                {data.map((product, idx) => (
                    <Grid item key={product.id} xs={12} sm={6} md={3} lg={4}>
                        <ProductItem product={product} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ProductList;