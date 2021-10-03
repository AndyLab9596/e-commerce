import React, { memo, useEffect, useState } from 'react';
import { Container, Grid, Pagination, Paper } from '@mui/material';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import productApi from 'api/productApi';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductList from '../components/ProductList';

const useStyles = makeStyles(theme => ({
    leftColumn: {
        width: '253px',

    },
    rightColumn: {
        flex: '1 1 0'
    }
}))

const ListPage = () => {
    const classes = useStyles();
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const response = await productApi.getAll({ _page: 1, _limit: 10 });
                console.log({ response })
                setProductList(response.data)

            } catch (error) {
                console.log('Failed to fetch ProductList', error)
            }
            setLoading(false)
        })()
    }, [])

    return (
        <Box>
            <Container>
                <Grid container spacing={1} >
                    <Grid item className={classes.leftColumn}>
                        <Paper elevation={4}>Left column</Paper>
                    </Grid>

                    <Grid item className={classes.rightColumn}>
                        <Paper elevation={4}>
                            {loading ? <ProductSkeletonList /> : <ProductList data={productList} />}
                        </Paper>
                        <Pagination count={10} color="primary" />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default memo(ListPage);