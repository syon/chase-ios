import React, { Component } from 'react'

import Catalog from './Catalog'

export default class extends Component {
  render() {
    return (
      <Catalog {...this.props} style={{flex: 1}} />
    )
  }
}
