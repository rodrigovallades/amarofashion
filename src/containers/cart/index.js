import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { remove } from '../../modules/cart'

import './cart.css'

export class Cart extends Component {

  render() {
    return (
      <div className="cart">
        <div className="cart__wrapper">
          <h2 className="cart__title">Cart</h2>
          <div className="cart__container">
            {this.props.cart.map((product, i) =>
              <div key={i} className="cart__item">
                <div className="cart__item-image"><img src={product.image} alt='Product in cart' /></div>
                <div className="cart__info">
                  <div className="cart__item-name">{product.name}</div>
                  <div className="cart__item-details">
                    <span className="cart__item-size">Size: {product.size}</span>
                    <span className="cart__item-quantity">Quantity: {product.quantity}</span>
                  </div>
                  <div className="cart__item-price">{product.price.replace('.', ',')}</div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="cart__total">Total: {parseFloat(this.props.cart.reduce(( total, c ) => parseFloat(total) + parseFloat(c.price), 0)).toFixed(2).replace('.', ',')}</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart.data
})

const mapDispatchToProps = dispatch => bindActionCreators({
  remove
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart)
