import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Product extends Component {

  static propTypes = {
    handleAddToCart: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {
      size: '',
      sku: '',
      canAdd: false,
      triedToAdd: false
    }
  }

  updateSizes = size => {
    this.setState({ size: size.size, sku: size.sku, canAdd: true })
  }

  addToCart = () => {
    this.setState({ triedToAdd: true })
    if (this.state.canAdd) {
      const { product, handleAddToCart } = this.props;

      const p = {
        sku: this.state.sku,
        size: this.state.size,
        name: product.name,
        image: product.image,
        price: product.actual_price.split(" ")[1].replace(',', '.'),
      }

      handleAddToCart(p);
    }
  }

  render() {
    const { product } = this.props;
    const output = {};

    if (product.sizes && product.sizes.length) {
      output.sizes = (
        <div className={`product__sizes ${this.state.triedToAdd && !this.state.canAdd ? 'product__sizes--invalid' : ''}`}>
          {
            product.sizes
            .filter(size => size.available)
            .map((size, i) => {
              return (
                <div className={`product__size ${this.state.sku === size.sku ? 'product__size--selected' : ''}`} key={i} onClick={() => this.updateSizes(size)}>{size.size}</div>
              )
            })
          }
        </div>
      )
    }

    output.prices = (
      <div className="product__prices">
        { product.actual_price && product.actual_price !== product.regular_price &&
          <span className="product__price--regular">{product.regular_price}</span>
        }
        <span className="product__price--actual">{product.actual_price}</span>
        <span className="product__installments">{product.installments}</span>
      </div>
    )

    if (product.onSale) {
      output.onsale = (
        <div className="product__onsale">
          { product.discount_percentage &&
            <span className="product__price--discount">{product.discount_percentage}</span>
          }
          SALE
        </div>
      )
    }

    if (product.image) {
      output.image = (<img src={product.image} alt="Product" />)
    }

    return (
      <div className={`product ${product.onSale ? 'product--sale' : ''}`} onClick={product.onClick}>
        <div className={`product__image ${!product.image ? 'product__image--broken' : ''}`}>
          {output.onsale}
          {output.image}
        </div>
        <h4 className="product__name">{product.name}</h4>
        {output.prices}
        {output.sizes}
        <button className="product__add" onClick={this.addToCart}>Add to cart</button>
      </div>
    )
  }
}
