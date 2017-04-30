import React, { Component } from 'react'
import {
  ListView,
} from 'react-native'

import Catalog from '../components/Catalog'

class MainTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      itemsForDS: [],
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
    }
    this._onRefresh = this._onRefresh.bind(this)
  }

  componentDidMount = async () => {
    await this.props.actions.ready()
  }

  _onRefresh() {
    console.tron.log('MainTab#_onRefresh')
    this.setState({ refreshing: true });
    this.props.actions.refreshCatalog('catalogMain')
  }

  render() {
    const catalog = this.props.shelf.catalogMain
    return (
      <Catalog
        {...this.props}
        catalogState={{
          refreshing: this.state.refreshing,
          catalogHash: catalog,
        }}
        onRefresh={ this._onRefresh }
        style={{flex: 1}}
      />
    )
  }
}

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as allActions from '../actions/allActions'

export default connect(
  (state, ownProps) => ({
    phase: state.phase,
    shelf: state.shelf,
    scene: state.scene,
    work: state.work,
  }),
  (dispatch) => ({
    actions: bindActionCreators(allActions, dispatch)
  })
)(MainTab)
