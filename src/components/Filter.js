import React from 'react'
import PropTypes from 'prop-types'

import './Filter.css'

const Filter = props => (
 <input type="text" placeholder={props.placeholder} className="filter" onChange={props.updateSearch} value={props.searchText} />
)

Filter.propTypes = {
  placeholder:PropTypes.string,
  updateSearch:PropTypes.func,
  searchText:PropTypes.string,
}

export default Filter
