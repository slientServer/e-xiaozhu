/*
* Created by Brian
*/
import React from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';
const FormItem = Form.Item;

function Captcha (props) {
  const { getFieldDecorator } = props.form;

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

  return  <div>
            <FormItem {...formItemLayout} label="验证码">
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator('captcha', {
                    rules: [{ required: true, message: '请输入验证码!' }],
                  })(
                    <Input />
                  )}
                </Col>
                <Col span={12}>
                  <Button onClick = { props.captchaAction } loading = { props.fetching }>获取验证码</Button>
                </Col>
              </Row>
              <Row align="bottom" type="flex" style={{"display": (props["captcha"]? "block": "none")}}>
                <Col>
                  <div style={{"height": "50px", "marginTop": "10px"}} dangerouslySetInnerHTML={{__html: unescape(props.captcha && props.captcha.data)}}></div>
                </Col>
              </Row>
            </FormItem>
            <FormItem style={{"display": "none"}}>
              {getFieldDecorator('seed', {
                initialValue: props.captcha && props.captcha.seed
              })(
                <Input type="hidden"/>
              )}
            </FormItem>
          </div>;
}

const mapStateToProps = (state, ownProps) => {
  return {
    fetching: state.commonReducer.fetching || false,
    captcha: state.authReducer.captcha
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    captchaAction: () => {
      dispatch(actions.captchaAction());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Captcha);