import * as types from './actionTypes';

export function setScopeState(pageScope, payload) {
  return {
    type: types.SET_STATE,
    pageScope,
    payload,
  };
}