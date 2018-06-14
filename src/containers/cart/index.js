import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { remove, toggle } from '../../modules/cart'

import './cart.css'

export class Cart extends Component {

  render() {
    return (
      <div>
        {this.props.cart.isActive && (
          <div className="cart">
            <div className="cart__wrapper">
              <div className="cart__header">
                <span className="cart__close" onClick={() => this.props.toggle(false)}>x</span>
                <h2 className="cart__title">Cart ({this.props.cart.data.reduce(( total, c ) => total + c.quantity, 0)})</h2>
              </div>
              <div className="cart__container">
                {this.props.cart.data.map((product, i) =>
                  <div key={i} className="cart__item">
                    <span className="cart__item-remove" onClick={() => this.props.remove(product)}>x</span>
                    <div className="cart__item-image"><img src={product.image} alt='Product in cart' /></div>
                    <div className="cart__info">
                      <div className="cart__item-name">{product.name}</div>
                      <div className="cart__item-details">
                        <span className="cart__item-size">Size: {product.size}</span>
                        <span className="cart__item-quantity">Quantity: {product.quantity}</span>
                      </div>
                      <div className="cart__item-price">R$ {product.price.replace('.', ',')}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="cart__total">Total: R$ {parseFloat(this.props.cart.data.reduce(( total, c ) => parseFloat(total) + (parseFloat(c.price) * parseFloat(c.quantity)), 0)).toFixed(2).replace('.', ',')}</div>
          </div>
        )}
        {!this.props.cart.isActive && (
          <div className="cart__toggler" onClick={() => this.props.toggle(true)}>
            <div>Cart <span className="cart__toggler-badge">{this.props.cart.data.length}</span></div>
          </div>
        )}
      </div>
    )
  }
}

Cart.defaultProps = {
  toggle: () => {},
  cart: { data: [] }
}

const mapStateToProps = state => ({
  cart: state.cart
})

const mapDispatchToProps = dispatch => bindActionCreators({
  remove,
  toggle
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart)
