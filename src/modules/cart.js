export const initialState = { data: [] }

export const actions = {
  CART_ADD: 'CART_ADD',
  CART_REMOVE: 'CART_REMOVE',
}

// reducers
export default (state = initialState, action) => {
  switch (action.type) {
    case actions.CART_ADD:
      return {
        ...state,
        data: [...state.data, action.product]
      };
    case actions.CART_REMOVE:
      return {
        ...state,
        data: [],
      };
    default:
      return state
  }
}

// action creators
export const add = product => {  
  return dispatch => {
    dispatch({
      type: actions.CART_ADD,
      product
    })
  }
}


export const remove = product => ({
  type: actions.CART_REMOVE,
  product
})
