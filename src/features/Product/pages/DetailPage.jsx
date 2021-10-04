import { CircularProgress, Container, Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React from 'react';
import { useParams } from 'react-router';
import ProductInfo from '../components/ProductInfo';
import ProductThumbnail from '../components/ProductThumbnail';
import useProductDetail from '../hooks/useProductDetail';
import AddToCartForm from '../components/AddToCartForm';

const useStyles = makeStyles(theme => ({
    leftColumn: {
        width: '400px',
        margin: 'auto',
        padding: 8,
        borderRight: '1px solid #e0e0e0'
    },
    rightColumn: {
        flex: '1 1 0',
        padding: 8
    }
}))

const DetailPage = () => {
    const classes = useStyles();
    const { productId } = useParams();

    const { product, loading } = useProductDetail(productId);

    console.log(product)

    if (loading) {
        return <Box>
            <CircularProgress />
        </Box>
    }

    const handleAddToCartSubmit = (formValues) => {
        console.log('Form Submit', formValues)
    }

    return (
        <Box>
            <Container >
                <Paper elevation={4}>
                    <Grid container spacing={1} >
                        <Grid item className={classes.leftColumn}>
                            <ProductThumbnail product={{}} />
                        </Grid>

                        <Grid item className={classes.rightColumn}>
                            <ProductInfo product={product} />
                            <AddToCartForm onSubmit={handleAddToCartSubmit} />
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
};

export default DetailPage;