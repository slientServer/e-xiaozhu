import { LOGIN_SUCCESS, CAPTCHA_UPDATED } from '../actions/types';

function login(state = [], action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        auth: action.data
      });
    case CAPTCHA_UPDATED: 
      return Object.assign({}, state, {
        captcha: action.data
      });
    default:
      return state;
  }
}

export default login;