import React, { Component } from 'react'
import {
  ListView,
} from 'react-native'

import Catalog from '../components/Catalog'

class SceneTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      itemsForDS: [],
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
    }
    this._onRefresh = this._onRefresh.bind(this)
  }

  componentDidMount() {
    // this.listupFromStorage()
  }

  makeItemsForDS(catalog) {
    let items = []
    Object.keys(catalog).forEach(function(key) {
      items.push(catalog[key])
    })
    items = items.sort((a,b) => {
      if (a.sortId < b.sortId) return -1
      if (a.sortId > b.sortId) return 1
      return 0
    })
    return items
  }

  _onRefresh() {
    console.tron.log('SceneTab#_onRefresh')
    this.setState({ refreshing: true });
    this.props.actions.refreshSceneCatalogs()
  }

  render() {
    const { scene, shelf } = this.props
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
    const items = this.makeItemsForDS(catalog)
    return (
      <Catalog
        {...this.props}
        showSegment={ true }
        catalogState={{
          refreshing: this.state.refreshing,
          itemsForDS: items,
          dataSource: this.state.dataSource.cloneWithRows(items)
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
    login: state.login,
    items: state.items,
    shelf: state.shelf,
    scene: state.scene,
  }),
  (dispatch) => ({
    actions: bindActionCreators(allActions, dispatch)
  })
)(SceneTab)
