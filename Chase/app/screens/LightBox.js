import React, { Component } from 'react'
import { View, Button, StyleSheet, Text, Image } from 'react-native'

class LightBox extends Component {
  constructor(props) {
    super(props);
    this.dismissLightBox = this.dismissLightBox.bind(this)
  }

  dismissLightBox() {
    this.props.navigator.dismissLightBox();
  }

  render() {
    const { login, actions, item, imgUrl } = this.props
    return (
      <View style={styles.welcome}>
        <View style={styles.imgFrame}>
          <Image style={styles.thumbnail} source={{uri: imgUrl}} />
        </View>
        <Text>{item.title}</Text>
        <Button onPress={this.dismissLightBox} title="dismissLightBox" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  welcome: {
    flex: 1,
    borderWidth: 1,
    // height: 500,
  },
  imgFrame: {
    flex: 1,
    height: 200,
  },
  thumbnail: {
    flex: 1,
  },
})

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as allActions from '../actions/allActions'

export default connect(
  (state, ownProps) => ({
    login: state.login,
  }),
  (dispatch) => ({
    actions: bindActionCreators(allActions, dispatch)
  })
)(LightBox)
