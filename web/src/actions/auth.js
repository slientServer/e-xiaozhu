import { START_REQUEST, FINISH_REQUEST, LOGIN_SUCCESS, CAPTCHA_UPDATED } from './types';
import { getRes, postRes } from '../utils/request';
import token from '../utils/tokenHelper';
import jwtDecode from 'jwt-decode';
import { message } from 'antd';

export const loginAction = (data, history) => {
  return function (dispatch) {
    dispatch({
      type: START_REQUEST
    });
    postRes({
      url: '/api/v1/authentication',
      headers: {
        'Content-Type': 'application/json'
      },
      msg: '登录失败!',
      data: {
        "strategy": "local",
        "username": data.username,
        "password": data.password,
        "captcha": data.captcha,
        "seed": data.seed
      },
      handler: (resData) => {
        dispatch({
          type: FINISH_REQUEST
        });
        message.success('登录成功！');
        dispatch({
          type: LOGIN_SUCCESS,
          data: {
            username: jwtDecode(resData.accessToken).username,
            token: resData.accessToken
          }
        })
        if (data.remember) {
          token.setPersistToken(resData.accessToken);
        } else {
          token.setToken(resData.accessToken);
        }
        history.push('/admin');
      },
      dispatch: dispatch
    });
  }
}

export const registerAction = (data, history) => {
  return function (dispatch) {
    dispatch({
      type: START_REQUEST
    });
    postRes({
      url: '/api/v1/users',
      data: data, 
      handler: (resData) => {
        dispatch({
          type: FINISH_REQUEST
        });
        message.success('注册成功,马上登录...！');
        history.push('/login');
        dispatch(captchaAction()); 
      },
      dispatch: dispatch
    });
  }
}

export const checkAction = (history) => {
  return function (dispatch) {
    dispatch({
      type: START_REQUEST
    });
    getRes({
      url: '/api/v1/users/' + jwtDecode(token.getToken()).usersId,
      msg: 'Permission denied!',
      headers: {
        'Authorization': token.getToken()
      },
      errorHandler: () => {
        token.destoryToken();
        history.push('/login');
      },
      handler: (resData) => {
        dispatch({
          type: FINISH_REQUEST
        });
        dispatch({
          type: LOGIN_SUCCESS,
          data: resData
        });
      },
      dispatch: dispatch
    });
  }
}

export const captchaAction = (history) => {
  return function (dispatch) {
    dispatch({
      type: START_REQUEST
    });
    getRes({
      url: '/api/v1/captcha/6345',
      msg: 'Captcha fetch failed!',
      handler: (resData) => {
        dispatch({
          type: FINISH_REQUEST
        });
        dispatch({
          type: CAPTCHA_UPDATED,
          data: resData
        });
      },
      dispatch: dispatch
    });
  }
}