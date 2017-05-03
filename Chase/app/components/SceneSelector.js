import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Button from 'react-native-button'
import { responsiveFontSize } from 'react-native-responsive-dimensions';

export default class extends Component {
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
  }

  onSelectSceneA() {
    const { actions, entry } = this.props
    this.setState({ tappedA: true })
    this.props.sceneSelected()
    actions.applyScene(entry.eid, 'a')
  }

  onSelectSceneB() {
    const { actions, entry } = this.props
    this.setState({ tappedB: true })
    this.props.sceneSelected()
    actions.applyScene(entry.eid, 'b')
  }

  onSelectSceneC() {
    const { actions, entry } = this.props
    this.setState({ tappedC: true })
    this.props.sceneSelected()
    actions.applyScene(entry.eid, 'c')
  }

  render() {
    const { entry, work, scene } = this.props.outlet
    const { hidden } = this.props
    if (hidden) return null
    const wk = work || {}
    const d = wk[entry.eid] || {}
    const sceneA = scene.allScenes[0]
    const sceneB = scene.allScenes[1]
    const sceneC = scene.allScenes[2]
    return (
      <View style={styles.selectScene}>
        <Button onPress={this.onSelectSceneA} disabled={this.state.tappedA || d["a"]} style={styles.sceneBtn}>{ sceneA }</Button>
        <Button onPress={this.onSelectSceneB} disabled={this.state.tappedB || d["b"]} style={styles.sceneBtn}>{ sceneB }</Button>
        <Button onPress={this.onSelectSceneC} disabled={this.state.tappedC || d["c"]} style={styles.sceneBtn}>{ sceneC }</Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  selectScene: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 5,
  },
  sceneBtn: {
    fontSize: responsiveFontSize(2),
    padding: 10,
    overflow: 'hidden',
  },
})
