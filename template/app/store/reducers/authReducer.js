import { GET_VERIFY_CODE_TIMER } from '../actions/actionTypes';

const timer = 0;

export const verifyCodeTimer = (state = timer, action) => {
  switch (action.type) {
    case GET_VERIFY_CODE_TIMER:
      return action.timer;
    default:
      return state;
  }
};
