/**
 * Created by chengkai on 2017/11/30.
 * 响应数据处理工具类
 */

/**
 * 处理 请求异常错误
 * @param err
 */
export const handleError = (err) => {
  // todo test replace hint msg on next version.
  // let msg;
  // try {
  //     if (err.response.data.code === 401) {
  //         msg = '登录失效，请重新登录！';
  //     } else {
  //         msg = err.response.data.message ? err.response.data.message : '网络连接异常,请检查网络设置。';
  //     }
  // } catch (err) {
  //     msg = '网络连接异常,请检查网络设置。';
  // }
  // return msg;
  return (!!err && !!err.response && !!err.response.data.message) ? err.response.data.message : "网络连接异常,请检查网络设置。";
}

/**
 * 简单处理 响应数据
 * @param data 响应数据(全部)
 * @param handleSuccess 成功时处理
 * @param handleErr 错误是处理
 */
export const handleSimpleData = (data, handleSuccess = () => {}, handleErr = () => {
}) => {
  if (!!data && data.success) {
    let successData = !!data.data ? data.data : {};
    handleSuccess(
      (successData),
      (JSON.stringify(successData) === '{}' || successData === null || successData === undefined)
    );
  } else {
    handleErr(
      (!!data && !!data.message) ? data.message : '网络不稳定,请重新尝试..',
      (!!data && data.code) ? data.code : (-1),
    ); // 数据异常
  }
}