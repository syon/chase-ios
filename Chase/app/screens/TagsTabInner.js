import React, { Component } from 'react'
import {
  ListView,
} from 'react-native'

import Catalog from '../components/Catalog'

class TagsTabInner extends Component {
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
    this._onRefresh()
  }

  _onRefresh() {
    console.tron.log('TagsTabInner#_onRefresh')
    this.setState({ refreshing: true })
    this.props.actions.refreshTagCatalog(this.props.tag.name)
  }

  render() {
    const { scene, shelf } = this.props
    let catalog = shelf.catalogTag
    return (
      <Catalog
        {...this.props}
        showSegment={ false }
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
    login: state.login,
    items: state.items,
    shelf: state.shelf,
    scene: state.scene,
  }),
  (dispatch) => ({
    actions: bindActionCreators(allActions, dispatch)
  })
)(TagsTabInner)
