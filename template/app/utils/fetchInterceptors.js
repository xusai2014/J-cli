// import fetch from 'sx-fetch';

/**
 * 请求拦截处理
 * @param  {Object} navigation 组件navigation 对象
 * @return {void}
 */
export default dispatch => {
  // fetch.axiosInstance.interceptors.response.use(res => {
  //     return res;
  // }, error => {
  //     try {
  //         const { status, data } = error.response;
  //
  //         if(data.code === 401 || status === 401 || data.code === 12002 || data.code === 12009) {
  //             if (!data.message) {
  //                 data.message = '登录失效，请重新登录！';
  //             }
  //             Toast.fail(data.message);
  //             clearTokenRecord();
  //             dispatch(resetAction('LoginPage'));
  //         }
  //
  //         if(status === 400 && data.code === 12006) {
  //             AlertModal.alert({
  //                 title: '发现新版本请更新',
  //                 message: data.message,
  //                 onOk: () => {
  //                     Linking.openURL(DOWN_LOAD_APP);
  //                     clearTokenRecord();
  //                     dispatch(resetAction('LoginPage'));
  //                 },
  //                 overlayKey: 'version_update',
  //                 cancelable: false,
  //             });
  //         }
  //     } catch (e) {
  //         // console.log('fetchInterceptors异常了：', e)
  //     }
  //
  //     try {
  //         return Promise.reject(error);
  //     } catch (e) {
  //         // console.log('Promise异常了：', e)
  //     }
  // });
}

export const clearTokenRecord = () => {
  // 清空tokenId值
  // fetch.axiosInstance.defaults.headers['auth-token'] = '';
  // Storage.save({
  //     key: 'loginData',
  //     data: {
  //         'auth-token': '',
  //     },
  // });
}