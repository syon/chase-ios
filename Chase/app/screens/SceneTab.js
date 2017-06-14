import React, { Component } from 'react'

import Catalog from '../components/Catalog'

class ThisClass extends Component {

  state = {
    refreshing: false,
  }

  _onRefresh = async () => {
    this.setState({ refreshing: true })
    await this.props.actions.refreshSceneCatalogs()
    this.setState({ refreshing: false })
  }

  render() {
    const { scene, shelf } = this.props.reducers
    const { navigator } = this.props
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
      default:
    }
    return (
      <Catalog
        navigator={navigator}
        showSegment={true}
        catalogState={{
          refreshing: this.state.refreshing,
          catalogHash: catalog,
        }}
        onRefresh={this._onRefresh.bind(this)}
        sceneSelectorHidden={true}
        style={{ flex: 1 }}
      />
    )
  }
}

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as allActions from '../actions/allActions'

export default connect(
  (state) => ({
    reducers: {
      phase: state.phase,
      shelf: state.shelf,
      scene: state.scene,
      work: state.work,
      entries: state.entries,
    },
  }),
  (dispatch) => ({
    actions: bindActionCreators(allActions, dispatch),
  })
)(ThisClass)
