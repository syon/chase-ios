import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import Chase from '../components/Chase';
import * as pocketActions from '../actions/pocketActions';

class ChaseApp extends Component {
  constructor(props) {
    super(props);

    this.props.actions.loginFromStorage()
  }

  render() {
    const { login, pocket, items, actions } = this.props;

    return (
      <Chase login={login} pocket={pocket} items={items} {...actions} />
    )
  }
}

export default connect(state => ({
    login: state.login,
    pocket: state.pocket,
    items: state.items,
  }),
  (dispatch) => ({
    actions: bindActionCreators(pocketActions, dispatch)
  })
)(ChaseApp);
