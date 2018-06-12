export const initialState = { products: [], filter: '', loading: false }

export const actions = {
  PRODUCTS_FETCH_REQUEST: 'PRODUCTS_FETCH_REQUEST',
  PRODUCTS_FETCH_SUCCESS: 'PRODUCTS_FETCH_SUCCESS',
  PRODUCTS_FETCH_FAILURE: 'PRODUCTS_FETCH_FAILURE',
  PRODUCTS_UPDATE_FILTER: 'PRODUCTS_UPDATE_FILTER',
}

// reducers
export default (state = initialState, action) => {
  switch (action.type) {
    case actions.PRODUCTS_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        products: []
      };
    case actions.PRODUCTS_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.products
      };
    case actions.PRODUCTS_FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        products: []
      };
    case actions.PRODUCTS_UPDATE_FILTER:
      return {
        ...state,
        filter: action.filter
      };
    default:
      return state
  }
}

// action creators
export const getProducts = () => {
  return dispatch => {
    function request() { return { type: actions.PRODUCTS_FETCH_REQUEST } }
    function success(products) { return { type: actions.PRODUCTS_FETCH_SUCCESS, products } }
    function failure(error) { return { type: actions.PRODUCTS_FETCH_FAILURE, error } }

    dispatch(request());

    return fetch(`products.json`)
      .then(products => products.json())
      .then(products => {
        dispatch(success(products.products))
      })
      .catch(function(error) {
        console.error(error)
        dispatch(failure(error))
      });
  }
};

export const setFilter = filter => ({
  type: actions.PRODUCTS_UPDATE_FILTER,
  filter
})
