/**
 * 公用校验方法。
 */

// 校验数字
export const validatorNumber = ({ rules, message }) => {
  return {
    validator: (_rules, value, callback) => {
      if (value === '' || value === undefined) {
        callback();
        return;
      }
      if (isNaN(value)) {
        callback([message]);
      } else {
        const _value = Number(value);
        for (const i in rules) {
          const v = rules[i];
          if (v.min && _value < v.min) {
            callback([v.message]);
            return;
          } else if (v.max && _value > v.max) {
            callback([v.message]);
            return;
          } else if (v.accuracy) {
            const jd = String(value).split('.');
            if (jd.length > 1 && jd[1].length > v.accuracy) {
              callback([v.message]);
              return;
            }
          }
        }
        ;
        callback();
      }
    }
  };
};

/**
 * 校验字符串长度
 * @param  {String}   value    字符串
 * @param  {Number}   min      最小值
 * @param  {Number}   max      最大长度
 * @param  {String}   message  提示信息
 * @param  {Function} callback 校验的回调函数
 * @return {void}
 */
export const validatorByteLen = (min, max, message) => {
  return {
    validator: (rules, value, callback) => {
      const length = getStringByteLength(value);
      if (length < min || length > max) {
        callback([message]);
      } else {
        callback();
      }
    }
  }
}

/**
 * 校验字符串长度
 * @param  {String}   value    字符串
 * @param  {Number}   min      最小值
 * @param  {Number}   max      最大长度
 * @param  {String}   message  提示信息
 * @param  {Function} callback 校验的回调函数
 * @return {void}
 */
export const validatorMaxByteLen = (max, message) => {
  return {
    validator: (rules, value, callback) => {
      if (value && getStringByteLength(value) > max) {
        callback([message]);
      } else {
        callback();
      }
    }
  }
}

/**
 * 获取字符串字节长度，中文占两个字节
 * @param value
 * @return {number}
 */
export function getStringByteLength(value) {
  if (!value) return 0;
  let length = value.length;

  for (let i = 0; i < value.length; i++) {
    if (value.charCodeAt(i) > 127) {
      length++;
    }
  }

  return length;
}

/**
 * 校验是否含有空格
 * @param  {[type]} message [description]
 * @return {[type]}         [description]
 */
export const validatorSpace = message => {
  return {
    pattern: /^[^ ]+$/,
    message
  };
};

/**
 * 银行卡号校验
 * @param  {String} bankno 银行卡号
 * @return {void}
 */
export const validatorBankCard = (bankno) => {
  var lastNum = bankno.substr(bankno.length - 1, 1);//取出最后一位（与luhm进行比较）

  var first15Num = bankno.substr(0, bankno.length - 1);//前15或18位
  var newArr = new Array();
  for (var i = first15Num.length - 1; i > -1; i--) {    //前15或18位倒序存进数组
    newArr.push(first15Num.substr(i, 1));
  }
  var arrJiShu = new Array();  //奇数位*2的积 <9
  var arrJiShu2 = new Array(); //奇数位*2的积 >9

  var arrOuShu = new Array();  //偶数位数组
  for (var j = 0; j < newArr.length; j++) {
    if ((j + 1) % 2 == 1) {//奇数位
      if (parseInt(newArr[j]) * 2 < 9)
        arrJiShu.push(parseInt(newArr[j]) * 2);
      else
        arrJiShu2.push(parseInt(newArr[j]) * 2);
    }
    else //偶数位
      arrOuShu.push(newArr[j]);
  }

  var jishu_child1 = new Array();//奇数位*2 >9 的分割之后的数组个位数
  var jishu_child2 = new Array();//奇数位*2 >9 的分割之后的数组十位数
  for (var h = 0; h < arrJiShu2.length; h++) {
    jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
    jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
  }

  var sumJiShu = 0; //奇数位*2 < 9 的数组之和
  var sumOuShu = 0; //偶数位数组之和
  var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
  var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
  var sumTotal = 0;
  for (var m = 0; m < arrJiShu.length; m++) {
    sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
  }

  for (var n = 0; n < arrOuShu.length; n++) {
    sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
  }

  for (var p = 0; p < jishu_child1.length; p++) {
    sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
    sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
  }
  //计算总和
  sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

  //计算Luhm值
  var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
  var luhm = 10 - k;

  if (lastNum == luhm) {
    return true;
  }
  return false;
}


