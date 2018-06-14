export const initialState = { data: [], isActive: false }

export const actions = {
  CART_ADD: 'CART_ADD',
  CART_REMOVE: 'CART_REMOVE',
  TOGGLE_CART: 'TOGGLE_CART',
}

// reducers
export default (state = initialState, action) => {
  switch (action.type) {
    case actions.CART_ADD:
      return {
        ...state,
        data: [...state.data, action.product],
        isActive: true,
      };
    case actions.CART_REMOVE:
      return {
        ...state,
        data: state.data.filter(p => action.product !== p),
      };
    case actions.TOGGLE_CART:
      return {
        ...state,
        isActive: action.payload,
      };
    default:
      return state
  }
}

// action creators
export const add = product => ({
  type: actions.CART_ADD,
  product
})

export const remove = product => ({
  type: actions.CART_REMOVE,
  product
})

export const toggle = toggle => ({
  type: actions.TOGGLE_CART,
  payload: toggle
})