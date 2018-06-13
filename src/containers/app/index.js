import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Products from '../products';

import './app.css';

const App = () => (
  <Router>
    <div className="app__container">
      <Switch>
        <Route path="/products" exact component={Products} />
        <Redirect from="/" to="/products" />
      </Switch>
    </div>
  </Router>
)

export default App;
