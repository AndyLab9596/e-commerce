import { Box } from '@mui/system';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import ListPage from './pages/ListPage';

const ProductFeature = () => {
    const match = useRouteMatch();
    return (
        <Box sx={{ pt: 4 }}>
            <Switch>
                <Route path={match.url} exact component={ListPage} />
            </Switch>
        </Box>
    );
};

export default ProductFeature;