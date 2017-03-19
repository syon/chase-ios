import React, { Component } from 'react'
import {
  ListView,
} from 'react-native'

import Catalog from './Catalog'

class MainTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      itemsForDS: [],
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
    }
    this.listupFromStorage = this.listupFromStorage.bind(this)
    this._onRefresh = this._onRefresh.bind(this)
  }

  componentDidMount() {
    const promise = this.props.actions.loginFromStorage()
    promise.then(() => {
      return this.props.actions.loadCatalogFromStorage('catalogMain')
    }).then(() => {
      return this.listupFromStorage()
    }).catch(err => console.error(err))
  }

  listupFromStorage() {
    this.setState({ refreshing: true });
    const catalog = this.props.shelf.catalogMain
    console.log('MainTab this.props.shelf is',this.props.shelf);
    const filteredCatalog = this.makeFilteredCatalog(catalog)
    const itemsForDS = this.makeItemsForDS(catalog)
    this.setState({
      refreshing: false,
      itemsForDS: itemsForDS,
      dataSource: this.state.dataSource.cloneWithRows(itemsForDS)
    })
  }

  makeFilteredCatalog(catalog) {
    if (catalog) {
      Object.keys(catalog).forEach(function(key) {
        const c = catalog[key];
        if (c.tags) {
          let needsDelete = false;
          Object.keys(c.tags).forEach(function(key) {
            if (key.match(/^loc:/)) { needsDelete = true; }
          })
          if (needsDelete) {
            delete catalog[key]
          }
        }
      });
    }
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
    const promise = this.props.actions.refreshCatalog('catalogMain')
    promise.then(() => {
      this.listupFromStorage()
    })
  }

  render() {
    const cs = {
      refreshing: this.state.refreshing,
      itemsForDS: this.state.itemsForDS,
      dataSource: this.state.dataSource
    }
    return (
      <Catalog
        {...this.props}
        catalogState={ cs }
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
)(MainTab)
