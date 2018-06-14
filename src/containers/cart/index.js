import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import CartProduct from '../../components/CartProduct'
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
                <span className="cart__close" onClick={() => this.props.toggle(false)}></span>
                <h2 className="cart__title">Cart ({this.props.cart.data.reduce(( total, c ) => total + c.quantity, 0)})</h2>
              </div>
              <div className="cart__container">
                {this.props.cart.data.map((product, i) =>
                  <CartProduct key={i} image={product.image} name={product.name} size={product.size} quantity={product.quantity} price={product.price} sku={product.sku} />
                )}
              </div>
            </div>
            <div className="cart__total">Total: R$ {parseFloat(this.props.cart.data.reduce(( total, c ) => parseFloat(total) + (parseFloat(c.price) * parseFloat(c.quantity)), 0)).toFixed(2).replace('.', ',')}</div>
          </div>
        )}
        {!this.props.cart.isActive && (
          <div className="cart__toggler" onClick={() => this.props.toggle(true)}>
            <div><span className="cart__toggler-badge">{this.props.cart.data.reduce(( total, c ) => total + c.quantity, 0)}</span></div>
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
