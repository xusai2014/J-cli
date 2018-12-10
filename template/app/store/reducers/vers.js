import { SET_STATE } from '../actions/actionTypes';

export const setVers = (state = {}, action) => {
  if (action.key === SET_STATE) {
    return { ...state, [action.key]: action.value };
  }
  return state;
};
