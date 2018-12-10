import * as types from './actionTypes';

/**
 * 用户信息相关action;
 */

export const fetchUserInfo = mobile => ({
  type: types.FETCH_USER_INFO,
  mobile
});
