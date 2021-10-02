import Header from 'components/Header';
import React from 'react';
import { BrowserRouter as Router, Switch } from "react-router-dom";

function App() {


  return (
    <div>
      <Router>
        <Header />
        <Switch>


        </Switch>
      </Router>
    </div>
  );
}

export default App;
