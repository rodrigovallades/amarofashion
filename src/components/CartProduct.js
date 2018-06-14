import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { remove } from '../modules/cart'

import './CartProduct.css'

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
        <div className="cart__info">
          <div className="cart__item-name">{this.props.name}</div>
          <div className="cart__item-details">
            <span className="cart__item-size">Size: {this.props.size}</span>
            <span className="cart__item-quantity">Quantity: {this.props.quantity}</span>
          </div>
          <div className="cart__item-price">R$ {this.props.price.replace('.', ',')}</div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  remove
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(CartProduct)
