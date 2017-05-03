import React, { Component } from 'react'

import Catalog from '../components/Catalog'

class SceneTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
    }
    this._onRefresh = this._onRefresh.bind(this)
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.props.actions.refreshSceneCatalogs()
  }

  render() {
    const { navigator, actions, entries, scene, work, shelf } = this.props
    let catalog = null
    switch (scene.currentIdx) {
      case 0:
        catalog = shelf.catalogSceneA
        break
      case 1:
        catalog = shelf.catalogSceneB
        break
      case 2:
        catalog = shelf.catalogSceneC
        break
    }
    return (
      <Catalog
        navigator={navigator}
        actions={actions}
        reducers={{ entries, scene, work }}
        showSegment={ true }
        catalogState={{
          refreshing: this.state.refreshing,
          catalogHash: catalog,
        }}
        onRefresh={ this._onRefresh }
        sceneSelectorHidden={ true }
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
    login: state.login,
    items: state.items,
    shelf: state.shelf,
    scene: state.scene,
    work: state.work,
    entries: state.entries,
  }),
  (dispatch) => ({
    actions: bindActionCreators(allActions, dispatch)
  })
)(SceneTab)
