/**
 * 登录相关工具类
 */

const LogoutHandleArray = [];

export const LogoutHandlePush = (handle, key) => {
  LogoutHandleArray.push(handle);
};

export const LogoutHandle = () => {
  if (LogoutHandleArray.length > 0) {
    for (let handle of LogoutHandleArray) {
      handle();
    }
  }
};