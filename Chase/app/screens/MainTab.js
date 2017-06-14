import React, { Component } from 'react'

import Catalog from '../components/Catalog'

class ThisClass extends Component {

  state = {
    refreshing: false,
  }

  componentDidMount = async () => {
    await this.props.actions.ready()
  }

  _onRefresh = async () => {
    this.setState({ refreshing: true })
    await this.props.actions.refreshCatalog('catalogMain')
    this.setState({ refreshing: false })
  }

  render() {
    const { entries, scene, work, shelf } = this.props.reducers
    const { navigator, actions } = this.props
    const catalog = shelf.catalogMain
    return (
      <Catalog
        navigator={navigator}
        catalogState={{
          refreshing: this.state.refreshing,
          catalogHash: catalog,
        }}
        onRefresh={ this._onRefresh.bind(this) }
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
    reducers: {
      phase: state.phase,
      shelf: state.shelf,
      scene: state.scene,
      work: state.work,
      entries: state.entries,
    }
  }),
  (dispatch) => ({
    actions: bindActionCreators(allActions, dispatch)
  })
)(ThisClass)
