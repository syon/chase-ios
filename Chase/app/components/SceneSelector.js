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
    const { entry } = this.props.reducers
    this.setState({ tappedA: true })
    this.props.actions.applyScene(entry.eid, 'a')
  }

  onSelectSceneB() {
    const { entry } = this.props.reducers
    this.setState({ tappedB: true })
    this.props.actions.applyScene(entry.eid, 'b')
  }

  onSelectSceneC() {
    const { entry } = this.props.reducers
    this.setState({ tappedC: true })
    this.props.actions.applyScene(entry.eid, 'c')
  }

  render() {
    const { entry, work, scene } = this.props.reducers
    const { hidden } = this.props
    if (hidden) return null
    const wk = work || {}
    const d = wk[entry.eid] || {}
    const sceneA = scene.allScenes[0]
    const sceneB = scene.allScenes[1]
    const sceneC = scene.allScenes[2]
    return (
      <View style={styles.selectScene}>
        <View style={styles.sceneBtnBox}>
          <Button onPress={this.onSelectSceneA} disabled={this.state.tappedA || d["a"]} style={styles.sceneBtn}>{ sceneA }</Button>
        </View>
        <View style={styles.sceneBtnBox}>
          <Button onPress={this.onSelectSceneB} disabled={this.state.tappedB || d["b"]} style={styles.sceneBtn}>{ sceneB }</Button>
        </View>
        <View style={styles.sceneBtnBox}>
          <Button onPress={this.onSelectSceneC} disabled={this.state.tappedC || d["c"]} style={styles.sceneBtn}>{ sceneC }</Button>
        </View>
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
