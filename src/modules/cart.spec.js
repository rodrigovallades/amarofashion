import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import reducer, { actions, add, remove, update, toggle, initialState } from './cart'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Cart action creators', () => {

  it('dispatches the correct actions on successful fetch request', () => {

    expect(add({ name: 'product1' })).toEqual({
      type: actions.CART_ADD,
      product: { name: 'product1' }
    })
    expect(toggle(true)).toEqual({
      type: actions.TOGGLE_CART,
      payload: true
    })
    expect(remove('sku1234')).toEqual({
      type: actions.CART_REMOVE,
      sku: 'sku1234'
    })
    expect(update('sku1234', 2, 'add')).toEqual({
      type: actions.CART_UPDATE_QUANTITY_ADD,
      sku: 'sku1234'
    })
    expect(update('sku1234', 1, 'remove')).toEqual({
      type: actions.CART_REMOVE,
      sku: 'sku1234'
    })
  })
})

describe('Cart reducer', () => {

  beforeEach(function() {
		const store = mockStore(initialState);
	});

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it(`should handle ${actions.CART_ADD}`, () => {
    expect(
      reducer(undefined, {
        type: actions.CART_ADD,
        product: { name: 'product1' },
      })
    ).toEqual(
      {
        data: [{ name: 'product1' }],
        isActive: true,
      }
    )
  })

  it(`should handle ${actions.TOGGLE_CART}`, () => {
    expect(
      reducer(undefined, {
        type: actions.CART_ADD,
        product: { name: 'product1' },
      })
    ).toEqual(
      {
        data: [{ name: 'product1' }],
        isActive: true,
      }
    )
  })

  it(`should handle ${actions.CART_REMOVE}`, () => {
    expect(
      reducer(undefined, {
        type: actions.CART_REMOVE,
        product: { name: 'product666' },
      })
    ).toEqual(
      {
        data: [],
        isActive: false,
      }
    )
  })

  it(`should handle ${actions.CART_UPDATE_QUANTITY_ADD}`, () => {
    expect(
      reducer(undefined, {
        type: actions.CART_UPDATE_QUANTITY_ADD,
        sku: 'sku1234'
      })
    ).toEqual(
      {
        data: [],
        isActive: true,
      }
    )
  })
})
