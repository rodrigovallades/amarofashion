import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Products from '../products';
import Cart from '../cart'

import './app.css';

const App = () => (
  <Router>
    <div className="app__container">
      <Switch>
        <Route path="/products" exact component={Products} />
        <Route path="/cart" exact component={Cart} />
        <Redirect from="/" to="/products" fullscreen={true} />
      </Switch>
    </div>
  </Router>
)

export default App;
