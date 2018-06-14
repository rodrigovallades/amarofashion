export const initialState = { data: [], isActive: false }

export const actions = {
  CART_ADD: 'CART_ADD',
  CART_REMOVE: 'CART_REMOVE',
  TOGGLE_CART: 'TOGGLE_CART',
  CART_UPDATE_ITEM: 'CART_UPDATE_ITEM'
}

// reducers
export default (state = initialState, action) => {
  switch (action.type) {
    case actions.CART_ADD:
      return {
        ...state,
        data: [action.product, ...state.data],
        isActive: true,
      };
    case actions.CART_REMOVE:
      return {
        ...state,
        data: state.data.filter(p => action.sku !== p.sku),
      };
    case actions.CART_UPDATE_ITEM:
      return {
        ...state,
        data: [
          ...state.data.slice(0, action.payload.idx),
          action.payload.updated,
          ...state.data.slice(action.payload.idx+1)
        ],
        isActive: true,
      };
    case actions.TOGGLE_CART :
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

export const remove = sku => ({
  type: actions.CART_REMOVE,
  sku
})

export const update = (updated, idx) => ({
  type: actions.CART_UPDATE_ITEM,
  payload: {
      idx,
      updated: {
        ...updated,
        quantity: updated.quantity + 1
      }
   }
})

export const toggle = toggle => ({
  type: actions.TOGGLE_CART,
  payload: toggle
})
