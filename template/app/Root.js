import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import AppWithNavigationState from './AppNavigator';
import { BASE_URL } from './config/app.conf';

import fetch from './sx-fetch';
// import {requestSignEncrypt, responseSignDecrypt} from "./encrypt/NetProtectTool";

/* 初始化fetch */
fetch.init({
  setOptions: (instance) => {
    instance.defaults.baseURL = BASE_URL;
    instance.defaults.timeout = 10000;  // 请求超时时间，默认为10000毫秒
    // 拦截请求数据
    instance.interceptors.request.use(cfg => {
      // requestSignEncrypt(cfg);
      return cfg;
    }, error => {
      return Promise.reject(error);
    });
    // 拦截请求返回数据
    instance.interceptors.response.use(response => {
      // let checkSign = responseSignDecrypt(response);
      // if (checkSign) {
      //     return response;
      // } else {
      //     return {
      //         "RETURNCODE": "1102",
      //         "RETURNCON": "网络延迟,请重新加载",
      //     }
      // }
      return response;
    }, error => {
      return Promise.reject(error);
    });
  },
  onShowErrorTip: (err, errorTip) => {
  },
  onShowSuccessTip: (response, successTip) => {
  },
  isMock: (url) => {
    return url.startsWith('/mock');
  }
});

export default class Root extends Component {

  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState/>
      </Provider>
    );
  }
}

// 取消警告
console.disableYellowBox = true;