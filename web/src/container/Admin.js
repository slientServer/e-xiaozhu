/*
* Created by Brian
*/
import React, { Component } from 'react';
import adminRoutes from '../routes/adminRoutes';
import * as actions from '../actions/auth';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import token from '../utils/tokenHelper';
import AdminLayout from '../components/admin/layout';

class Admin extends Component {
  componentWillMount () {
    if (!this.props.auth && token.getToken()) {
      this.props.checkAction(this.props.history);
    } else if (!this.props.auth && !token.getToken()) {
      this.props.history.push('/login');
    }
  }

  render () {
    return <Spin spinning = { this.props.fetching }>
      <AdminLayout history={this.props.history}>
        {adminRoutes()}
      </AdminLayout>
    </Spin>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.authReducer && state.authReducer.auth,
    fetching: state.commonReducer && state.commonReducer.fetching
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    checkAction: (history) => {
      dispatch(actions.checkAction(history))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);