import React, { Component } from 'react'
import {
  View,
  Button,
  ProgressViewIOS,
  StatusBar,
} from 'react-native'
import WKWebView from 'react-native-wkwebview-reborn'

// this.props.navigator.toggleDrawer({
//   to: 'closed',
//   side: 'left',
//   animated: true
// })

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { rate: 0 }
  }

  render() {
    console.log('webview', this.props)
    const wv = this.props.item ? (
      <WKWebView
        source={{ uri: this.props.item ? this.props.item.url : '' }}
        onProgress={(progress) => this.setState({ rate: progress })}
      />
    ) : null
    const pv = this.state.rate < 1 ? (<ProgressViewIOS progress={this.state.rate} />) : null
    return (
      <View style={{flex: 1}}>
        {/*<StatusBar hidden={true} />*/}
        { pv }
        { wv }
        <View>
          {/*<Button onPress={() => {this.props.navigator.pop()}} title="←" />*/}
        </View>
      </View>
    )
  }
}
