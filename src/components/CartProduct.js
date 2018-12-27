import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { remove, update } from '../modules/cart'

export class CartProduct extends Component {

  render() {
    return (
      <div className="cart__item">
        <span className="cart__item-remove" onClick={() => this.props.remove(this.props.sku)}></span>
        <div className={`cart__item-image ${!this.props.image ? 'cart__item-image--broken' : ''}`}>
          {this.props.image &&
            <img src={this.props.image} alt="Product in cart" />
          }
        </div>
        <div className="cart__item-info">
          <div className="cart__item-name">{this.props.name}</div>
          <div className="cart__item-details">
            <span className="cart__item-size">Size: {this.props.size}</span>
          </div>
          <div className="cart__item-quantity-actions">
            <div className="cart__item-quantity-control" onClick={() => this.props.update(this.props.sku, this.props.quantity, 'remove')}>-</div>
            <span className="cart__item-quantity">{this.props.quantity}</span>
            <div className="cart__item-quantity-control" onClick={() => this.props.update(this.props.sku, this.props.quantity, 'add')}>+</div>
          </div>
          <div className="cart__item-price">R$ {this.props.price.replace('.', ',')}</div>
        </div>
      </div>
    )
  }
}

CartProduct.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.string,
  quantity: PropTypes.number,
  price: PropTypes.string,
  remove: PropTypes.func,
  update: PropTypes.func,
}

const mapDispatchToProps = dispatch => bindActionCreators({
  remove,
  update
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(CartProduct)
