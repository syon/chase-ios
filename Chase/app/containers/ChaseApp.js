import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import Loading from '../components/Loading';
import Login from '../components/Login';
import Chase from '../components/Chase';
import * as allActions from '../actions/allActions';

class ChaseApp extends Component {
  constructor(props) {
    super(props);

    this.props.actions.loginFromStorage()
  }

  render() {
    const { mode } = this.props
    switch (mode) {
      case 'MODE_READY':
        return <Chase {...this.props} />
      case 'MODE_NEEDS_AUTH':
        return <Login {...this.props} />
      default:
        return <Loading {...this.props} />
    }
  }
}

export default connect(state => ({
    mode: state.mode,
    login: state.login,
    items: state.items,
  }),
  (dispatch) => ({
    actions: bindActionCreators(allActions, dispatch)
  })
)(ChaseApp);
