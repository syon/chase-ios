import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import Chase from '../components/Chase';
import * as pocketActions from '../actions/pocketActions';

class ChaseApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;

    return (
      <Chase {...actions} />
    )
  }
}

export default connect(state => ({
    state: state.pocket
  }),
  (dispatch) => ({
    actions: bindActionCreators(pocketActions, dispatch)
  })
)(ChaseApp);
