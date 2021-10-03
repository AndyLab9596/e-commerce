import { Grid, Skeleton } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const ProductSkeletonList = ({ length = 6 }) => {

    return (
        <Box>
            <Grid container>
                {Array.from(new Array(length)).map((skes, idx) => (
                    <Grid item key={idx} xs={12} sm={6} md={3} lg={4}>
                        <Box sx={{ p: 1 }}>
                            <Skeleton animation="wave" variant="rect" width="100%" height={118} />
                            <Skeleton />
                            <Skeleton width="60%" />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ProductSkeletonList;