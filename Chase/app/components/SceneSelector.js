import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import Button from 'react-native-button'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import LSO from 'react-native-smart-loading-spinner-overlay'

class SceneSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tappedA: false,
      tappedB: false,
      tappedC: false,
    }
    this.onSelectSceneA = this.onSelectSceneA.bind(this)
    this.onSelectSceneB = this.onSelectSceneB.bind(this)
    this.onSelectSceneC = this.onSelectSceneC.bind(this)
    this._hasTag = this._hasTag.bind(this)
  }

  onSelectSceneA(entry) {
    this._lsoCompo.show()
    this.setState({ tappedA: true })
    this.props.actions.applyScene(entry.eid, 'a').then(() => {
      this._lsoCompo.hide()
      entry.tags['chase:a'] = { tag: 'chase:a' }
    })
  }

  onSelectSceneB(entry) {
    this._lsoCompo.show()
    this.setState({ tappedB: true })
    this.props.actions.applyScene(entry.eid, 'b').then(() => {
      this._lsoCompo.hide()
      entry.tags['chase:b'] = { tag: 'chase:b' }
    })
  }

  onSelectSceneC(entry) {
    this._lsoCompo.show()
    this.setState({ tappedC: true })
    this.props.actions.applyScene(entry.eid, 'c').then(() => {
      this._lsoCompo.hide()
      entry.tags['chase:c'] = { tag: 'chase:c' }
    })
  }

  _hasTag(entry, tagName) {
    if (entry && entry.tags && entry.tags[tagName]) {
      return true
    }
    return false
  }

  render() {
    const { entries, work, scene } = this.props.reducers
    const { eid, hidden } = this.props
    const entry = entries ? entries[eid] : {}
    if (hidden) return null
    const wk = work || {}
    const d = wk[eid] || {}
    const sceneA = scene.allScenes[0]
    const sceneB = scene.allScenes[1]
    const sceneC = scene.allScenes[2]
    return (
      <View style={styles.selectScene}>
        <View style={styles.sceneBtnBox}>
          <Button onPress={() => this.onSelectSceneA(entry)} disabled={this._hasTag(entry, 'chase:a')} style={styles.sceneBtn}>{ sceneA }</Button>
        </View>
        <View style={styles.sceneBtnBox}>
          <Button onPress={() => this.onSelectSceneB(entry)} disabled={this._hasTag(entry, 'chase:b')} style={styles.sceneBtn}>{ sceneB }</Button>
        </View>
        <View style={styles.sceneBtnBox}>
          <Button onPress={() => this.onSelectSceneC(entry)} disabled={this._hasTag(entry, 'chase:c')} style={styles.sceneBtn}>{ sceneC }</Button>
        </View>
        <LSO ref={ component => this._lsoCompo = component } />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  selectScene: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    paddingBottom: 5,
  },
  sceneBtnBox: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
  },
  sceneBtn: {
    fontSize: responsiveFontSize(2.5),
    padding: 10,
    overflow: 'hidden',
  },
})

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
)(SceneSelector)
