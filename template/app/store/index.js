import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducer from './reducers';
import { navReduxMiddleware } from "../AppNavigator";

export default createStore(
  reducer,
  applyMiddleware(
    navReduxMiddleware,
    thunkMiddleware,
  )
);
