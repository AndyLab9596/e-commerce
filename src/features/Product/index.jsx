import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import ListPage from './pages/ListPage';

const ProductFeature = () => {
    const match = useRouteMatch();
    console.log(match)
    return (
        <div>
            <h3>Product Feature</h3>
            <Switch>
                <Route path={match.url} exact component={ListPage} />
            </Switch>
        </div>
    );
};

export default ProductFeature;