import { TOGGLE_COLLAPSED } from '../actions/types';

function admin(state = [], action) {
  switch (action.type) {
    case TOGGLE_COLLAPSED:
      return Object.assign({}, state, {
        collapsed: !(state && state.collapsed)
      });
    default:
      return state;
  }
}

export default admin;