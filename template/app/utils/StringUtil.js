/**
 * Created by chengkai on 2017/12/10.
 * 字符串操作工具类
 */

/* 隐藏手机号中间部分 */
export const hidePhoneNum = (phone) => {
  if (!phone || (!!phone && phone.length < 5)) return phone;
  let partOne = phone.substr(0, 3);
  let partTwo = phone.substr(phone.length - 4, phone.length - 1);
  return `${partOne}****${partTwo}`;
};

/* 格式化日期时间 */
export const formatTime = (now) => {
  const year = now.getFullYear();
  const month = (now.getMonth() + 1) < 10 ? `0${now.getMonth() + 1}` : (now.getMonth() + 1);
  const date = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();
  const hour = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
  const minute = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
  const second = now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds();
  return year + '-' + month + '-' + date + '   ' + hour + ':' + minute + ':' + second;
};

/**
 ** 生成 n 位的随机数
 **/
export const randomNum = (n) => {
  var rnd = "";
  for (var i = 0; i < n; i++)
    rnd += Math.floor(Math.random() * 10);
  return rnd;
};

/**
 ** 时间戳转日期
 **/
export const generateOrderNo = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1) < 10 ? `0${now.getMonth() + 1}` : (now.getMonth() + 1);
  const date = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();
  const hour = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
  const minute = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
  const second = now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds();
  return `${year}${month}${date}${hour}${minute}${second}` + randomNum(18);
};

/**
 * 处理字符串, 避免UI出现 undefined | null 字样
 * @param str
 * @returns {string}
 */
export const handleStr = (str) => {
  return !!str ? str : '';
};

/**
 * UrlEncode
 * @param str
 * @returns {string}
 */
export const urlEncode = (str) => {
  str = (str + '').toString();
  return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
};

/**
 * 检验字符串是否为中文
 * @param str
 * @returns {Promise<any> | Promise<Response> | RegExpMatchArray | *}
 */
export const checkStr = (str) => {
  return str.match(/[^\x00-\xff]/ig);
};
