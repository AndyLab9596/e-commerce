import React, { memo, useEffect, useState } from 'react';
import { Container, Grid, Pagination, Paper } from '@mui/material';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import productApi from 'api/productApi';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductList from '../components/ProductList';
import ProductSort from '../components/ProductSort';
import ProductFilters from '../components/ProductFilters';

// pagination is also a kind of filter, when it change, the product list will also change with it

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
    const [pagination, setPagination] = useState({
        limit: 9,
        page: 1,
        total: 10,
    });
    const [filters, setFilters] = useState({
        _page: 1,
        _limit: 9,
        _sort: 'salePrice:ASC'
    })

    useEffect(() => {
        (async () => {
            try {
                const { data, pagination } = await productApi.getAll(filters);
                // console.log({ data, pagination })
                setProductList(data)
                setPagination(pagination)

            } catch (error) {
                console.log('Failed to fetch ProductList', error)
            }
            setLoading(false)
        })()
    }, [filters])

    const handlePageChange = (e, page) => {
        setFilters(prev => ({
            ...prev,
            _page: page,
        }))
    }

    const handleSortChange = (newSortValue) => {
        setFilters(prev => ({
            ...prev,
            _sort: newSortValue
        }))
    }

    const handleFiltersChange = (newFilters) => {
        setFilters(prev => ({
            ...prev,
            ...newFilters
        }))
    }

    return (
        <Box>
            <Container>
                <Grid container spacing={1} >
                    <Grid item className={classes.leftColumn}>
                        <Paper elevation={4}>
                            <ProductFilters filters={filters} onChange={handleFiltersChange} />
                        </Paper>
                    </Grid>

                    <Grid item className={classes.rightColumn}>

                        <Paper elevation={4}>
                            <Box sx={{ p: 1 }}>
                                <ProductSort currentSort={filters._sort} onChange={handleSortChange} />
                            </Box>
                            {loading ? <ProductSkeletonList length={9} /> : <ProductList data={productList} />}
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 5 }}>
                                <Pagination
                                    count={Math.ceil(pagination.total / pagination.limit)}
                                    page={pagination.page}
                                    color="primary"
                                    onChange={handlePageChange} />
                            </Box>
                        </Paper>

                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default memo(ListPage);