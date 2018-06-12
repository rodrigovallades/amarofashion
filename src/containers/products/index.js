import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getProducts, setFilter } from '../../modules/products'

export class Products extends Component {

  componentWillMount() {
    this.props.getProducts()
  }

  renderProducts() {
    return this.props.products.map((product, index) => {
      return (
        <div key={index}>{product.name}</div>
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
