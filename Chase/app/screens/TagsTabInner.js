import React, { Component } from 'react'

import Catalog from '../components/Catalog'

class TagsTabInner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
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
    work: state.work,
    entries: state.entries,
  }),
  (dispatch) => ({
    actions: bindActionCreators(allActions, dispatch)
  })
)(TagsTabInner)
