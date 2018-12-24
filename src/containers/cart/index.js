import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import CartProduct from '../../components/CartProduct'
import { remove, toggle } from '../../modules/cart'

import './cart.css'

export class Cart extends Component {

	static propTypes = {
		cart: PropTypes.object.isRequired,
		toggle: PropTypes.func.isRequired,
		fullscreen: PropTypes.bool,
	};

	constructor(props) {
		super(props);

		this.state = {
			fullscreen: false,
		}
	}

  render() {
		const { cart, toggle } = this.props;

    return (
      <div>
        {cart.isActive && (
          <div className="cart">
            <div className="cart__wrapper">
              <div className="cart__header">
                <span className="cart__close" onClick={() => toggle(false)}></span>
                <h2 className="cart__title">Cart ({cart.data.reduce(( total, c ) => total + c.quantity, 0)})</h2>
              </div>
              <div className="cart__container">
                {cart.data.map((product, i) =>
                  <CartProduct key={product.sku} image={product.image} name={product.name} size={product.size} quantity={product.quantity} price={product.price} sku={product.sku} />
                )}
              </div>
            </div>
            <div className="cart__total">Total: R$ {parseFloat(cart.data.reduce(( total, c ) => parseFloat(total) + (parseFloat(c.price) * parseFloat(c.quantity)), 0)).toFixed(2).replace('.', ',')}</div>
          </div>
        )}
        {!cart.isActive && (
          <div className="cart__toggler" onClick={() => toggle(true)}>
            <div><span className="cart__toggler-badge">{cart.data.reduce(( total, c ) => total + c.quantity, 0)}</span></div>
          </div>
        )}
      </div>
    )
  }
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
