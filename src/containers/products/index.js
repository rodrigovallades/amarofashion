import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Product from '../../components/Product'
import Cart from '../cart'
import Loader from '../../components/Loader'
import Filter from '../../components/Filter'
import { getProducts } from '../../modules/products'

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

  renderProducts = () => {
    if (this.props.products.data.length) {
      return this.filter(this.props.products).map((product, i) => {

        return (
          <Product
            key={`${product.name.replace(/\s/g, '')}-${product.color_slug}`}
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
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getProducts
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products)
