import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import reducer, { actions, getProducts, initialState } from './products'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Products action creators', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('dispatches the correct actions on successful fetch request', () => {
    fetch.mockResponse(JSON.stringify([ { name: 'product1'} ]))

    const expectedActions = [
      { type: actions.PRODUCTS_FETCH_REQUEST },
      { type: actions.PRODUCTS_FETCH_SUCCESS, data: [ { name: 'product1' } ]}
    ]
    const store = mockStore(initialState)
    return (
      store
        .dispatch(getProducts())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    )
  })
})

describe('Products reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it(`should handle ${actions.PRODUCTS_FETCH_REQUEST}`, () => {
    expect(
      reducer({}, {
        type: actions.PRODUCTS_FETCH_REQUEST,
      })
    ).toEqual(
      {
        loading: true,
      }
    )
  })

  it(`should handle ${actions.PRODUCTS_FETCH_SUCCESS}`, () => {

    expect(
      reducer({}, {
        type: actions.PRODUCTS_FETCH_SUCCESS,
        data: { products: [ { name: 'product1' } ] },
      })
    ).toEqual(
      {
        data: [{ name: 'product1'}],
        loading: false,
      }
    )
  })

  it(`should handle ${actions.PRODUCTS_FETCH_FAILURE}`, () => {
    expect(
      reducer({}, {
        type: actions.PRODUCTS_FETCH_FAILURE
      })
    ).toEqual(
      {
        data: [],
        loading: false,
      }
    )
  })
})
