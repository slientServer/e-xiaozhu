/*
* Created by Brian.Hao211@gmail.com
*/
import axios from 'axios';
import { message } from 'antd';
import { FINISH_REQUEST } from '../actions/types';


/**
 * @Query
 * @param url       接口地址
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
export const getRes = ({url, msg = 'Bad request!', handler, dispatch, headers, errorHandler}) =>
    axios.get(url, {'headers': headers}).then(res => {
      dispatch({
        type: FINISH_REQUEST
      });
      if(res.status === 200){
        handler(res.data)
      } else {
        message.warn(res.statusText);
      }
    }).catch(err => {
      dispatch({
        type: FINISH_REQUEST
      });
      errorHandler && errorHandler();
      message.error(err.response.data.message || msg);
    });

/**
 * @Create
 * @param url       接口地址
 * @param data      接口参数
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
export const postRes = ({url, data, msg = 'Bad request!', handler, dispatch, headers, errorHandler}) =>
    axios.post(url, data, {'headers': headers}).then(res => {
      dispatch({
        type: FINISH_REQUEST
      });
      if(res.status === 201){
        handler(res.data)
      } else {
        message.warn(res.statusText);
      }
    }).catch(err => {
      dispatch({
        type: FINISH_REQUEST
      });
      errorHandler && errorHandler();
      message.error(err.response.data.message || msg);
    });

/**
 * @Update
 * @param url       接口地址
 * @param data      接口参数
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
export const putRes = ({url, data, msg = 'Bad request!', handler, dispatch, headers, errorHandler}) =>
    axios.put(url, data, {'headers': headers}).then(res => {
      dispatch({
        type: FINISH_REQUEST
      });      
      if(res.status === 201){
        handler(res.data)
      } else {
        message.warn(res.statusText);
      }
    }).catch(err => {
      dispatch({
        type: FINISH_REQUEST
      });
      errorHandler && errorHandler();
      message.error(err.response.data.message || msg);
    });

/**
 * @Create
 * @param url       接口地址
 * @param data      接口参数
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
export const deleteRes = ({url, msg = 'Bad request!', handler, dispatch, headers, errorHandler}) =>
    axios.delete(url, {'headers': headers}).then(res => {
      dispatch({
        type: FINISH_REQUEST
      });      
      if(res.status === 200){
        handler(res.data)
      } else {
        message.warn(res.statusText);
      }
    }).catch(err => {
      dispatch({
        type: FINISH_REQUEST
      });
      errorHandler && errorHandler();
      message.error(err.response.data.message || msg);
    });