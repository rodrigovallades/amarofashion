import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Product from '../../components/Product'
import Cart from '../cart'
import Loader from '../../components/Loader'
import Filter from '../../components/Filter'
import { getProducts } from '../../modules/products'

import { add, update } from '../../modules/cart'

import './products.css'

export class Products extends Component {

	static propTypes = {
		getProducts: PropTypes.func.isRequired,
		products: PropTypes.object.isRequired,
	}

  constructor(props) {
    super(props)
    this.state = {
      filterText: '',
      filterSale: false
    }
  }

  componentDidMount() {
    if (!this.props.products.data.length) {
      this.props.getProducts()
    }
  }

  handleAddToCart = product => {
    const { cart, add, update } = this.props;
    const idx = cart.data.findIndex(p => { return p.sku === product.sku })

    //if product is not already added to the cart
    if (idx === -1) {
      product.quantity = 1
      add(product)
    } else {
      update(product.sku, null, 'add')
    }
  };

  renderProducts = () => {
    if (this.props.products.data.length) {
      return this.filter(this.props.products).map((product, i) => {

        return (
          <Product
            actual_price={product.actual_price}
            discount_percentage={product.discount_percentage}
            handleAddToCart={this.handleAddToCart}
            image={product.image}
            installments={product.installments}
            key={`${product.name.replace(/\s/g, '')}-${product.color_slug}`}
            name={product.name}
            onSale={product.on_sale}
            regular_price={product.regular_price}
            sizes={product.sizes}
          />
        )
      })
    } else {
      return (<p>No products available right now :(</p>)
    }
  }

  updateSearch = event => {
    this.setState({
      filterText: event.target.value
    })
  }

  filter = () => {
    const { products } = this.props;

    let filtered = this.state.filterSale ? products.data.filter(product => product.on_sale) : products.data;
    return filtered.filter(product => product.name.toLowerCase().indexOf(this.state.filterText.toLowerCase()) >= 0);
  }

  render() {
    const { products } = this.props;

    return (
      <Fragment>
        {products.loading && (
          <Loader />
        )}
        <div className="products__toolbar">
          <h1 className="products__title">Products ({this.filter(products.data).length})</h1>
          <div className={`products__filter-sale ${this.state.filterSale ? 'products__filter-sale--active' : ''}`} onClick={() => this.setState({ filterSale: !this.state.filterSale })}>Filter on sale</div>
        </div>
        <div className="products__filter">
          <Filter updateSearch={this.updateSearch} searchText={this.state.filterText} placeholder='Filter by product name' />
        </div>
				<Cart />
        <div className="products">
          {this.renderProducts()}
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products,
  cart: state.cart,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getProducts,
  add,
  update,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products)
