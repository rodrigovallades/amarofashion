import React, { Component, Fragment } from 'react'
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
	};

  render() {
		const { cart, toggle } = this.props;
		const output = {};

		output.content = cart.data.length ? (
			<div className="cart__container">
				{cart.data.map((product, i) => (
					<CartProduct key={product.sku} image={product.image} name={product.name} size={product.size} quantity={product.quantity} price={product.price} sku={product.sku} />
				))}
			</div>
		)
		 : (
			<div className="cart__container cart__container--empty">
				<p>Your cart is empty :(</p>
			</div>
		)

		output.cart = cart.isActive ? (
			<div className="cart">
				<div className="cart__wrapper">
					<div className="cart__header">
						<span className="cart__close" onClick={() => toggle(false)}></span>
						<h2 className="cart__title">Cart ({cart.data.reduce(( total, c ) => total + c.quantity, 0)})</h2>
					</div>
					{output.content}
				</div>
				<div className="cart__total">Total: R$ {parseFloat(cart.data.reduce(( total, c ) => parseFloat(total) + (parseFloat(c.price) * parseFloat(c.quantity)), 0)).toFixed(2).replace('.', ',')}</div>
			</div>
		) : (
			<div className="cart__toggler" onClick={() => toggle(true)}>
				<div><span className="cart__toggler-badge">{cart.data.reduce(( total, c ) => total + c.quantity, 0)}</span></div>
			</div>
		)

    return (
      <Fragment>
        {output.cart}
      </Fragment>
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
