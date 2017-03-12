import React, { Component } from 'react'
import {
  View,
  Button,
  ProgressViewIOS,
  StatusBar,
} from 'react-native'
import WKWebView from 'react-native-wkwebview-reborn'

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { rate: 0 }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar hidden={true} />
        <WKWebView
          source={{uri: this.props.item.url}}
          onProgress={(progress) => this.setState({ rate: progress })}
        />
        <View>
          <ProgressViewIOS progress={this.state.rate} />
          <Button onPress={() => {this.props.navigator.pop()}} title="←" />
        </View>
      </View>
    )
  }
}
