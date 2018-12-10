import { combineReducers } from 'redux';

import { RootNavigator } from '../../AppNavigator';
import * as userReducer from './userReducer';
import * as authReducer from './authReducer';
import * as versReducer from './vers';
import { createNavigationReducer } from "react-navigation-redux-helpers";

// const navReducer = (state, action) => {
//     return RootNavigator.router.getStateForAction(action, state) || state;
// }

const navReducer = createNavigationReducer(RootNavigator);

export default combineReducers({
  nav: navReducer,
  ...versReducer,
  ...userReducer,
  ...authReducer,
});
