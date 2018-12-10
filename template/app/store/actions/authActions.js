import { createAction } from 'redux-actions';
import * as types from './actionTypes';

/**
 * 登录注册相关action;
 */

// export const setVerifyCodeTimer = timer => ({
//     type: types.GET_VERIFY_CODE,
//     timer
// });

export const setVerifyCodeTimer = createAction(types.GET_VERIFY_CODE);
