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
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
    }
    this.listupFromStorage = this.listupFromStorage.bind(this)
    this._onRefresh = this._onRefresh.bind(this)
  }

  componentDidMount() {
    // this.listupFromStorage()
  }

  listupFromStorage() {
    this.setState({ refreshing: true });
    this.props.actions.refreshCatalog('catalogSceneA')
      .then(catalog => {
        const itemsForDS = this.makeItemsForDS(catalog);
        this.setState({
          refreshing: false,
          dataSource: this.state.dataSource.cloneWithRows(itemsForDS)
        })
      }).catch(err => {
        console.warn('[Error Message from Storage]', err);
      })
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
    this.listupFromStorage()    
  }

  render() {
    const cs = {
      refreshing: this.state.refreshing,
      dataSource: this.state.dataSource
    }
    return (
      <Catalog
        {...this.props}
        catalogState={ cs }
        showSegment={ true }
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
    mode: state.mode,
    login: state.login,
    items: state.items,
    shelf: state.shelf,
  }),
  (dispatch) => ({
    actions: bindActionCreators(allActions, dispatch)
  })
)(SceneTab)
