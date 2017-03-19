import React, { Component } from 'react';
import {
  StyleSheet,
  Button,
  View,
  Linking
} from 'react-native';

class Login extends Component {
  constructor(props) {
    super(props);
    this._handleOpenURL = this._handleOpenURL.bind(this)
  }

  componentDidMount() {
    Linking.addEventListener('url', this._handleOpenURL);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleOpenURL);
  }

  _handleOpenURL(event) {
    this.props.actions.doAfterRedirect(event.url)
  }

  render() {
    const { actions } = this.props;
    return (
      <View style={styles.container}>
        <Button onPress={actions.connectToPocket} title="Connect to Pocket" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
});

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as allActions from '../actions/allActions'

export default connect(
  (state, ownProps) => ({
  }),
  (dispatch) => ({
    actions: bindActionCreators(allActions, dispatch)
  })
)(Login)
