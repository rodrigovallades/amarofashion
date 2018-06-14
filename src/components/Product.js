import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { add, remove, update } from '../modules/cart'

import './Product.css'

export class Product extends Component {

  constructor(props) {
    super(props)
    this.state = {
      size: '',
      sku: '',
      quantity: 1,
      canAdd: false,
      triedToAdd: false
    }
    this.renderSizes = this.renderSizes.bind(this)
  }

  renderSizes() {
    return this.props.sizes && this.props.sizes.length ? (
      <div className={`product__sizes ${this.state.triedToAdd && !this.state.canAdd ? 'product__sizes--invalid' : ''}`}>
        {
          this.props.sizes
          .filter(size => size.available)
          .map((size, i) => {
            return (
              <div className={`product__size ${this.state.sku === size.sku ? 'product__size--selected' : ''}`} key={i} onClick={() => this.updateSizes(size)}>{size.size}</div>
            )
          })
        }
      </div>
    ) : null
  }

  renderPrices() {
    return (
      <div className="product__prices">
        { this.props.actual_price && this.props.actual_price !== this.props.regular_price &&
          <span className="product__price--regular">{this.props.regular_price}</span>
        }
        <span className="product__price--actual">{this.props.actual_price}</span>
        <span className="product__installments">{this.props.installments}</span>
      </div>
    )
  }

  updateSizes(size) {
    this.setState({ size: size.size, sku: size.sku, canAdd: true })
  }

  addToCart() {
    this.setState({ triedToAdd: true })
    if (this.state.canAdd) {

      const product = {
        sku: this.state.sku,
        size: this.state.size,
        name: this.props.name,
        image: this.props.image,
        price: this.props.actual_price.split(" ")[1].replace(',', '.'),
        quantity: this.state.quantity
      }

      const idx = this.props.cart.findIndex(p => { return p.sku === product.sku })

      // if product is not already added to the cart
      if (idx === -1) {
        this.setState({ quantity: 1 })
        product.quantity = 1
        this.props.add(product)
      } else {
        this.setState({ quantity: this.state.quantity + 1 })        
        this.props.update(product, idx)
      }
    }
  }

  render() {
    return (
      <div className={`product ${this.props.onSale ? 'product--sale' : ''}`} onClick={this.props.onClick}>
        <div className={`product__image ${!this.props.image ? 'product__image--broken' : ''}`}>
          {this.props.onSale && (
            <div className="product__onsale">
              { this.props.discount_percentage &&
                <span className="product__price--discount">{this.props.discount_percentage}</span>
              }
              SALE
            </div>
          )}
          {this.props.image &&
            <img src={this.props.image} alt="Product" />
          }
        </div>
        <h4 className="product__name">{this.props.name}</h4>
        {this.renderPrices()}
        {this.renderSizes()}
        <button className="product__add" onClick={() => this.addToCart()}>Add to cart</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart.data
})

const mapDispatchToProps = dispatch => bindActionCreators({
  add,
  remove,
  update
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product)
