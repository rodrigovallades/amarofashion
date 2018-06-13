import React, { Component } from 'react'

import './Product.css'

export class Product extends Component {

  constructor(props) {
    super(props)
    this.state = {
      size: '',
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
              <div className={`product__size ${this.state.size === size.size ? 'product__size--selected' : ''}`} key={i} onClick={() => this.updateSizes(size.size)}>{size.size}</div>
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
    if(this.state.size !== size) {
      this.setState({ size })
    } else {
      this.setState({ size: '' })
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
      </div>
    )
  }
}

export default Product
