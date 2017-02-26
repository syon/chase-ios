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
    const { pocket, actions } = this.props;
    console.log('[ChaseApp.js] this.props', this.props)

    return (
      <Chase pocket={pocket} {...actions} />
    )
  }
}

export default connect(state => ({
    pocket: state.pocket,
  }),
  (dispatch) => ({
    actions: bindActionCreators(pocketActions, dispatch)
  })
)(ChaseApp);
