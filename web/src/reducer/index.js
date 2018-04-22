import { combineReducers } from 'redux';
import authReducer from './authReducer';
import commonReducer from './commonReducer';
import adminReducer from './adminReducer';

export default combineReducers({
  commonReducer,
  authReducer,
  adminReducer
});