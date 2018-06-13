import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import products from './products';
import cart from './cart';

export default combineReducers({
  routing: routerReducer,
  products,
  cart
})
