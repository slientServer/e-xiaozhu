/*
* Created by Brian
*/
import React, { Component } from 'react';
import { Row, Col, Icon, Form, Input, Checkbox, Button, Spin } from 'antd';
import * as actions from '../actions/auth';
import Captcha from '../components/common/captcha';
import { connect } from 'react-redux';
const FormItem = Form.Item;

class Register extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if(!err){
        this.props.dispatchRegister(value, this.props.history);
      }
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不一致!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && form.getFieldValue('confirm') && value !== form.getFieldValue('confirm')) {
      callback('两次输入的密码不一致!');
    } else {
      callback();
    }
  }

  render () {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 24,
          offset: 0,
        },
      },
    };

    return <Row style={{height: "100%"}} type="flex" align="middle">
          <Col span={16} offset={4}>
          <Spin spinning = { this.props.fetching }>
            <Row justify="center" type="flex">
              <Col>
                <Icon type="user-add" style={{ fontSize: 36, color: "#08c" }} />
                <span className="title">用户注册</span>
              </Col>
            </Row>
            <Row align="middle" justify="space-around" type="flex">
              <Col style={{textAlign: "center"}}>
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <FormItem
                    {...formItemLayout}
                    label="用户名"
                  >
                    {getFieldDecorator('username', {
                      rules: [{
                        required: true, message: '请输入用户名!',
                      }],
                    })(
                      <Input />
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="邮箱"
                  >
                    {getFieldDecorator('email', {
                      rules: [{
                        type: 'email', message: '请输入有效的邮箱!',
                      }, {
                        required: true, message: '请输入有效的邮箱!',
                      }],
                    })(
                      <Input />
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="密码"
                  >
                    {getFieldDecorator('password', {
                      rules: [{
                        required: true, message: '请输入密码!',
                      }, {
                        validator: this.validateToNextPassword,
                      }],
                    })(
                      <Input type="password" />
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="确认密码"
                  >
                    {getFieldDecorator('confirm', {
                      rules: [{
                        required: true, message: '请确认您的密码!',
                      }, {
                        validator: this.compareToFirstPassword,
                      }],
                    })(
                      <Input type="password" />
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="手机号"
                  >
                    {getFieldDecorator('phone', {
                      rules: [{ required: true, message: '请输入您的手机号!' }],
                    })(
                      <Input style={{ width: '100%' }} />
                    )}
                  </FormItem>
                  <Captcha {...this.props} />
                  <FormItem {...tailFormItemLayout}>
                    {getFieldDecorator('agreement', {
                      valuePropName: 'checked',
                      rules: [{ required: true, message: '请先阅读协议!' }],
                    })(
                      <Checkbox><a href="">我已阅读并同意该协议</a></Checkbox>
                    )}
                  </FormItem>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    注册
                  </Button>
                  Or <a href="/auth">登录!</a>
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
    dispatchRegister: (value, history) => {
      dispatch(actions.registerAction(value, history));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Register));