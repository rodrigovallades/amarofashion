import React from 'react'

import './Filter.css'

export default props => (
 <input type="text" placeholder={props.placeholder} className="filter" onChange={props.updateSearch} value={props.searchText} />
)
