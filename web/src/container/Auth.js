/*
* Created by Brian
*/
import React, { Component } from 'react';
import { Row, Col, Icon, Form, Input, Checkbox, Button, Spin } from 'antd';
import * as actions from '../actions/auth';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Captcha from '../components/common/captcha';
const FormItem = Form.Item;

class Auth extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if(!err){
        this.props.dispatchLogin(value, this.props.history);
      }
    });
  };

  render () {
    const { getFieldDecorator } = this.props.form;
    return <Row style={{height: "100%"}} type="flex" align="middle">
        <Col span={16} offset={4}>
          <Spin spinning = { this.props.fetching }>
            <Row align="middle" type="flex">
              <Col offset={8} span={8} style={{textAlign: "center"}}>
                <Icon type="user" style={{ fontSize: 36, color: "#08c" }} />
                <span className="title">
                  <FormattedMessage
                    id='app.login'
                    defaultMessage='登录'
                  ></FormattedMessage>
                </span>
              </Col>
            </Row>
            <Row align="middle" justify="space-around" type="flex">
              <Col span={8} style={{textAlign: "center"}}>
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <FormItem>
                    {getFieldDecorator('username', {
                      rules: [{ required: true, message: '请输入用户名!' }],
                    })(
                      <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名或手机号" />
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('password', {
                      rules: [{ required: true, message: '请输入密码!' }],
                    })(
                      <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                    )}
                  </FormItem>
                  <Captcha {...this.props} />
                  <FormItem>
                    {getFieldDecorator('remember', {
                      valuePropName: 'checked',
                      initialValue: true,
                    })(
                      <Checkbox className="login-form-remember">记住我</Checkbox>
                    )}
                    <a className="login-form-forgot" href="">忘记密码</a>
                  </FormItem>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                  </Button>
                  Or <a href="/register">注册!</a>
                </Form>
              </Col>
            </Row>
          </Spin>
        </Col>
      </Row>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    fetching: state.commonReducer.fetching || false
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatchLogin: (value, history) => {
      dispatch(actions.loginAction(value, history));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Auth));