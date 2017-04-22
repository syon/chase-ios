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
    this.setState({ tappedA: true })
    this.props.actions.applyScene(this.props.item.itemId, 'a')
  }

  onSelectSceneB() {
    this.setState({ tappedB: true })
    this.props.actions.applyScene(this.props.item.itemId, 'b')
  }

  onSelectSceneC() {
    this.setState({ tappedC: true })
    this.props.actions.applyScene(this.props.item.itemId, 'c')
  }

  render() {
    const { item, work } = this.props
    const wk = work || {}
    const d = wk[item.itemId] || {}
    return (
      <View style={styles.selectScene}>
        <Button onPress={this.onSelectSceneA} disabled={this.state.tappedA || d["a"]} style={styles.sceneBtn}>自宅</Button>
        <Button onPress={this.onSelectSceneB} disabled={this.state.tappedB || d["b"]} style={styles.sceneBtn}>職場</Button>
        <Button onPress={this.onSelectSceneC} disabled={this.state.tappedC || d["c"]} style={styles.sceneBtn}>暇つぶし</Button>
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
