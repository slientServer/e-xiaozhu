import { TOGGLE_COLLAPSED } from './types';

export const toggleCollapsedAction = () => {
  return function (dispatch) {
    dispatch({
      type: TOGGLE_COLLAPSED
    });
  }
}