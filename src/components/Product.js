import React, { Component } from 'react'

import './Product.css'

export class Product extends Component {

  constructor(props) {
    super(props)
    this.state = {
      size: [],
      quantity: 0
    }
    this.renderSizes = this.renderSizes.bind(this)
  }

  renderSizes(sizes) {
    return sizes && sizes.length ? (
      <div className="product__sizes">
        {
          sizes
          .filter(size => size.available)
          .map((size, i) => {
            return (
              <div className={`product__size ${this.state.size.indexOf(size.size) !== -1 ? 'product__size--selected' : ''}`} key={i} onClick={() => this.updateSizes(size.size)}>{size.size}</div>
            )
          })
        }
      </div>
    ) : null
  }

  updateSizes(size) {
    const found = this.state.size.indexOf(size)

    if(found === -1) {
      this.setState({ size: [...this.state.size, size] })
    } else {
      this.setState({ size: [...this.state.size.slice(0, found), ...this.state.size.slice(found+1)] })
    }
  }

  render() {
    return (
      <div key={this.props.index} className={`product ${this.props.onSale ? 'product--sale' : ''}`} onClick={this.props.onClick}>
        <div className="product__image">
          {this.props.onSale && (
            <div className="product__onsale">SALE</div>
          )}
          <img src={this.props.image} alt="product" />
        </div>
        <h4 className="product__name">{this.props.name}</h4>
        <div className="product__price--regular">{this.props.price_regular}</div>
        <div className="product__price--actual">{this.props.price_actual}</div>
        <div className="product__price--discount">{this.props.discount}</div>
        <div className="product__installments">{this.props.installments}</div>
        {this.renderSizes(this.props.sizes)}
      </div>
    )
  }
}

export default Product
