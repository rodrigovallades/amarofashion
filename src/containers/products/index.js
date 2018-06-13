import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Product from '../../components/Product'
import Cart from '../cart'
import { getProducts, setFilter } from '../../modules/products'

import './products.css'

export class Products extends Component {

  componentWillMount() {
    this.props.getProducts()
  }

  renderProducts() {
    return this.props.products.map((product, i) => {
      return (
        <Product
          key={i}
          image={product.image}
          name={product.name}
          regular_price={product.regular_price}
          actual_price={product.actual_price}
          discount_percentage={product.discount_percentage}
          installments={product.installments}
          onSale={product.on_sale}
          sizes={product.sizes}
        />
      )
    })
  }

  render() {
    return (
      <div>
        <h1 className="app__title">Products</h1>
        {this.props.cart.length > 0 && (
          <Cart />
        )}
        <div className="products">
          {this.renderProducts()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart.data,
  products: state.products.data,
  loading: state.products.loading,
  filter: state.products.filter
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getProducts,
  setFilter
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products)
