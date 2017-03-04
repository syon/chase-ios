import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import Login from '../components/Login';
import Chase from '../components/Chase';
import * as allActions from '../actions/allActions';

class ChaseApp extends Component {
  constructor(props) {
    super(props);

    this.props.actions.loginFromStorage()
  }

  render() {
    const { login } = this.props
    if (login.accessToken) {
      return (
        <Chase {...this.props} />
      )
    } else {
      return (
        <Login {...this.props} />
      )
    }
  }
}

export default connect(state => ({
    login: state.login,
    items: state.items,
  }),
  (dispatch) => ({
    actions: bindActionCreators(allActions, dispatch)
  })
)(ChaseApp);
