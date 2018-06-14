import React, { Component } from 'react'

import './Filter.css'

export class Filter extends Component {

  handleChange (event) {
    this.props.updateSearch(event.target.value);
  }

  render () {
    return (
      <input type="text" placeholder={this.props.placeholder} className="filter" onChange={this.handleChange.bind(this)} value={this.props.searchText} />
    )
  }
}

export default Filter
