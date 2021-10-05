import React, { memo, useEffect, useState, useMemo } from 'react';
import { Container, Grid, Pagination, Paper } from '@mui/material';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import productApi from 'api/productApi';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductList from '../components/ProductList';
import ProductSort from '../components/ProductSort';
import ProductFilters from '../components/ProductFilters';
import FilterViewer from '../components/FilterViewer';
import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string'

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
    const history = useHistory();
    const location = useLocation();
    // queryParams sẽ được tính toán lại khi và chỉ khi location search thay đổi
    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search);
        return {
            ...params,
            _page: Number.parseInt(params._page) || 1,
            _limit: Number.parseInt(params._limit) || 9,
            _sort: params._sort || 'salePrice:ASC',
            isPromotion: params.isPromotion === 'true',
            isFreeShip: params.isFreeShip === ' true',
        }
    }, [location.search]);

    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        limit: 9,
        page: 1,
        total: 10,
    });
    // const [filters, setFilters] = useState({
    //     _page: 1,
    //     _limit: 9,
    //     _sort: 'salePrice:ASC'
    // });
    // const [filters, setFilters] = useState(() => ({
    //     ...queryParams,
    //     _page: Number.parseInt(queryParams._page) || 1,
    //     _limit: Number.parseInt(queryParams._limit) || 9,
    //     _sort: queryParams._sort || 'salePrice:ASC'
    // }));

    // useEffect(() => {
    //     //  Sync filters to URL
    //     history.push({
    //         pathname: history.location.pathname,
    //         search: queryString.stringify(filters)
    //     })
    // }, [history, filters])
    // IIFE: intermediate invoke function expression
    useEffect(() => {
        (async () => {
            try {
                const { data, pagination } = await productApi.getAll(queryParams);
                // console.log({ data, pagination })
                setProductList(data)
                setPagination(pagination)

            } catch (error) {
                console.log('Failed to fetch ProductList', error)
            }
            setLoading(false)
        })()
    }, [queryParams])

    const handlePageChange = (e, page) => {
        // setFilters(prev => ({
        //     ...prev,
        //     _page: page,
        // }))
        const filters = {
            ...queryParams,
            _page: page,
        }

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters)
        })
    }

    const handleSortChange = (newSortValue) => {
        // setFilters(prev => ({
        //     ...prev,
        //     _sort: newSortValue
        // }))
        const filters = {
            ...queryParams,
            _sort: newSortValue
        }

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters)
        })

    }

    const handleFiltersChange = (newFilters) => {
        // setFilters(prev => ({
        //     ...prev,
        //     ...newFilters
        // }))
        const filters = {
            ...queryParams,
            ...newFilters
        }

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters)
        })
    }

    const setNewFilters = (newFilters) => {
        // setFilters(newFilters)
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(newFilters)
        })
    }

    return (
        <Box>
            <Container>
                <Grid container spacing={1} >
                    <Grid item className={classes.leftColumn}>
                        <Paper elevation={4}>
                            <ProductFilters
                                // filters={filters} 
                                filters={queryParams}
                                onChange={handleFiltersChange} />
                        </Paper>
                    </Grid>

                    <Grid item className={classes.rightColumn}>
                        <Paper elevation={4}>

                            <Box sx={{ p: 1 }}>
                                <ProductSort
                                    // currentSort={filters._sort} 
                                    currentSort={queryParams._sort}
                                    onChange={handleSortChange} />
                            </Box>
                            <FilterViewer
                                // filters={filters}
                                filters={queryParams}
                                onChange={setNewFilters} />
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