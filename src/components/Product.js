import React from 'react'

import './Product.css'

const renderSizes = (sizes) => {
  return sizes && sizes.length ? (
    <div className="product__sizes">
      {
        sizes.map((size, i) => {
          return (
            <div className="product__size" key={i}>{size.size}</div>
          )
        })
      }
    </div>
  ) : null
}

export default props => (
  <div key={props.index} className={`product ${props.onSale ? 'product--sale' : ''}`} onClick={props.onClick}>
    <div className="product__image">
      {props.onSale && (
        <div className="product__onsale">SALE</div>
      )}
      <img src={props.image} alt="product" />
    </div>
    <h4 className="product__name">{props.name}</h4>
    <div className="product__price--regular">{props.price_regular}</div>
    <div className="product__price--actual">{props.price_actual}</div>
    <div className="product__price--discount">{props.discount}</div>
    <div className="product__installments">{props.installments}</div>
    {renderSizes(props.sizes)}
  </div>
)
