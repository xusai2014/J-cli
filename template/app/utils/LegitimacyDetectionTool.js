/**
 * Created by chengkai on 2017/11/30.
 * 数据校验工具类
 */

/* 校验是否为空 */
export const checkNull = data => !!data

/* 校验身份证号码 */
export const checkIDNumber = idNum => (/(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/.test(idNum));

/* 校验手机号码 */
export const checkPhoneNo = phoneNo => (/^1\d{10}$/.test(phoneNo) && ('' !== phoneNo));

/* 校验密码(6-16英文字母数字) */
export const checkPassword = password => (/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(password));

/* 校验图形验证码 */
export const checkPicVerifyCode = (password) => (/^[0-9a-zA-Z]{4}$/.test(password));

/* 校验是否为纯数字 */
export const checkIsNumber = num => (/^[0-9]*$/.test(num));

/* 校验中文名字 */
export const checkChineseName = name => (/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(name));

/* 校验支付密码复杂度 */
export const checkPayPass = (pass, loginName = '') => {

  if (!/^\d{6}$/.test(pass)) return false; // 不是6位数字
  if (/^(\d)\1+$/.test(pass)) return false; // 全一样

  let str = pass.replace(/\d/g, ($0, index) => parseInt($0) - index);
  if (/^(\d)\1+$/.test(str)) return false; // 递增

  str = pass.replace(/\d/g, ($0, index) => parseInt($0) + index);
  if (/^(\d)\1+$/.test(str)) return false; // 递减

  if (new RegExp(pass).test(loginName)) return false; // 不能是账号的一部分

  return true;
}

/* 校验正浮点数 */
export const floatNumber = num => (/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[0-9][0-9]*))$/.test(num));

/**
 * 校验银行行卡号
 * @param bankCardField
 * @returns {boolean}
 */
export const regBankCardIsCorrect = (value) => {
  var bankno = String(value);
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
  if (lastNum != luhm) {
    return false;
  }
  return true;
};