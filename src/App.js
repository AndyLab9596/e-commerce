import Header from 'components/Header';
import ProductFeature from 'features/Product';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {

  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route path="/products" component={ProductFeature} />


        </Switch>
      </Router>
    </div>
  );
}

export default App;
