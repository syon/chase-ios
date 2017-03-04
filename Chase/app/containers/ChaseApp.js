import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import Chase from '../components/Chase';
import * as allActions from '../actions/allActions';

class ChaseApp extends Component {
  constructor(props) {
    super(props);

    this.props.actions.loginFromStorage()
  }

  render() {
    return (
      <Chase {...this.props} />
    )
  }
}

export default connect(state => ({
    login: state.login,
    pocket: state.pocket,
    items: state.items,
  }),
  (dispatch) => ({
    actions: bindActionCreators(allActions, dispatch)
  })
)(ChaseApp);
