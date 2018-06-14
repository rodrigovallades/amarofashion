export const initialState = { data: [], isActive: false }

export const actions = {
  CART_ADD: 'CART_ADD',
  CART_REMOVE: 'CART_REMOVE',
  TOGGLE_CART: 'TOGGLE_CART',
  CART_UPDATE_QUANTITY_ADD: 'CART_UPDATE_QUANTITY_ADD',
  CART_UPDATE_QUANTITY_REMOVE: 'CART_UPDATE_QUANTITY_REMOVE'
}

// reducers
export default (state = initialState, action) => {
  switch (action.type) {
    case actions.CART_ADD:
      return {
        ...state,
        data: [action.product, ...state.data],
        isActive: true,
      }
    case actions.CART_REMOVE:
      return {
        ...state,
        data: state.data.filter(p => action.sku !== p.sku),
      }
    case actions.CART_UPDATE_QUANTITY_ADD:
      return {
        ...state,
        data: state.data.map(item => {
          return (action.sku === item.sku) ? { ...item, quantity: item.quantity + 1 } : item
        }),
      }
    case actions.CART_UPDATE_QUANTITY_REMOVE:
      return {
        ...state,
        data: state.data.map(item => {
          return (action.sku === item.sku) ? { ...item, quantity: item.quantity - 1 } : item
        }),
      }
    case actions.TOGGLE_CART :
      return {
        ...state,
        isActive: action.payload,
      }
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

export const update = (sku, quantity, operation) => {
  switch (operation) {
    case 'add':
      return {
        type: actions.CART_UPDATE_QUANTITY_ADD,
        sku
      }
    case 'remove':
      if (quantity <= 1) {
        return remove(sku)
      }
      return {
        type: actions.CART_UPDATE_QUANTITY_REMOVE,
        sku
      }
    default:
      return {
        type: null
      }
  }
}

export const toggle = toggle => ({
  type: actions.TOGGLE_CART,
  payload: toggle
})
