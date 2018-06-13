import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { add, remove } from '../modules/cart'

import './Product.css'

export class Product extends Component {

  constructor(props) {
    super(props)
    this.state = {
      size: '',
      sku: '',
      quantity: 0
    }
    this.renderSizes = this.renderSizes.bind(this)
  }

  renderSizes() {
    return this.props.sizes && this.props.sizes.length ? (
      <div className="product__sizes">
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
    if(this.state.sku !== size.sku) {
      this.setState({ size: size.size, sku: size.sku })
    } else {
      this.setState({ size: '', sku: '' })
    }
  }

  addToCart() {
    if (this.state.sku && this.state.size) {
      const product = {
        sku: this.state.sku,
        size: this.state.size,
        name: this.props.name,
        image: this.props.image,
        price: this.props.actual_price.split(" ")[1].replace(',', '.'),
        quantity: 1
      }
      if (this.props.cart.find(p => { return p.sku === product.sku }) === undefined) {
        this.props.add(product)
      }
    }
  }

  render() {
    return (
      <div key={this.props.index} className={`product ${this.props.onSale ? 'product--sale' : ''}`} onClick={this.props.onClick}>
        <div className="product__image">
          {this.props.onSale && (
            <div className="product__onsale">
              { this.props.discount_percentage &&
                <span className="product__price--discount">{this.props.discount_percentage}</span>
              }
              SALE
            </div>
          )}
          <img src={this.props.image} alt="product" />
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
  remove
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product)
