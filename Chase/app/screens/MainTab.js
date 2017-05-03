import React, { Component } from 'react'

import Catalog from '../components/Catalog'

class MainTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
    }
    this._onRefresh = this._onRefresh.bind(this)
  }

  componentDidMount = async () => {
    await this.props.actions.ready()
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.props.actions.refreshCatalog('catalogMain')
  }

  render() {
    const { actions, entries, scene, work, shelf } = this.props
    const catalog = shelf.catalogMain
    return (
      <Catalog
        actions={actions}
        reducers={{ entries, scene, work }}
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
    entries: state.entries,
  }),
  (dispatch) => ({
    actions: bindActionCreators(allActions, dispatch)
  })
)(MainTab)
