import { TOGGLE_COLLAPSED, USER_LIST_SUCCESS } from '../actions/types';

function admin(state = [], action) {
  switch (action.type) {
    case TOGGLE_COLLAPSED:
      return Object.assign({}, state, {
        collapsed: !(state && state.collapsed)
      });
    case USER_LIST_SUCCESS:
      return Object.assign({}, state, {
        userList: action.data
      });
    default:
      return state;
  }
}

export default admin;