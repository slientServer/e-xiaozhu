import { TOGGLE_COLLAPSED, START_REQUEST, FINISH_REQUEST, USER_LIST_SUCCESS } from './types';
import { getRes } from '../utils/request';
import token from '../utils/tokenHelper';

export const toggleCollapsedAction = () => {
  return function (dispatch) {
    dispatch({
      type: TOGGLE_COLLAPSED
    });
  }
}

export const requestListAction = (params) => {
  return function (dispatch) {
    dispatch({
      type: START_REQUEST
    });
    getRes({
      url: '/api/v1/users?' + params,
      msg: 'Request failed!',
      headers: {
        'Authorization': token.getToken()
      },
      handler: (resData) => {
        dispatch({
          type: FINISH_REQUEST
        });
        dispatch({
          type: USER_LIST_SUCCESS,
          data: resData
        });
      },
      dispatch: dispatch
    });
  }
}