import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Product from '../../components/Product'
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
          price_regular={product.price_regular}
          price_actual={product.price_actual}
          discount={product.discount}
          installments={product.installments}
          sizes={product.sizes} />
      )
    })
  }

  render() {
    return (
      <div>
        <h1>Products</h1>
        <div className='products'>
          {this.renderProducts()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products.products,
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
