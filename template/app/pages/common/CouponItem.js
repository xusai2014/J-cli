/**
 * Created by yangzishu
 */
import React, { Component } from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { deviceWidth, px } from '../../utils/ScreenUtil';
import PropTypes from 'prop-types';
import * as theme from "../../config/theme.conf";
import { AVERAGE, INTO_NETWORK, MCC_NUM, NO_THRESHOLD, VOUCHER, } from "../../config/string.conf";
import { checkStr } from "../../utils/StringUtil";

export default class CouponItem extends Component {
  static propTypes = {
    couponData: PropTypes.object, /* 优惠券数据 */
    onClick: PropTypes.func, /* 优惠券按钮点击事件 */
    btnType: PropTypes.oneOf(['USE', 'CANCEL', 'NONE']), /* 点击按钮类型 ['USE', 'CANCEL', 'NONE'] */
    couponStatus: PropTypes.string, /* 优惠券类型 */
  };

  /**
   * 判断优惠券按钮状态
   * @returns {*}
   */
  changeCouponBtn = () => {
    let { btnType = 'NONE', couponData = { selected: false } } = this.props;
    let couponBtn;
    if (btnType === 'USE') {
      if (couponData.selected) {
        couponBtn = require('../../assets/images/coupon/not_use.png');
      } else {
        couponBtn = require('../../assets/images/coupon/use_right_now.png');
      }
    } else if (btnType === 'CANCEL') {
      couponBtn = require('../../assets/images/coupon/cancel.png');
    }
    return couponBtn;
  };

  /**
   * 显示优惠券名字
   * @param value
   * @returns {string}
   */
  checkIdenameLength = (value) => {
    let len = 0;
    let couponName = '';
    for (let i = 0; i < value.length; i++) {
      let str = value.charAt(i);
      if (checkStr(str) !== null) {
        len += 2;
      } else {
        len += 1;
      }
      if (len >= 17) {
        couponName += str + '...';
        break;
      } else {
        couponName += str;
      }
    }
    return couponName;
  };

  /**
   * 是否显示笔均
   * @returns {*}
   */
  isShowAverage = () => {
    let { couponStatus = '', couponData = { avgAmt: '' } } = this.props;
    let showAverage;
    if (couponStatus === 'HISTORY') {
      showAverage = '';
    } else {
      showAverage = couponData.avgAmt + AVERAGE;
    }
    return showAverage;
  };

  render() {
    let {
      couponData = { ideName: '', mcc: '', cupCode: '', selected: '', avgAmt: '', createTime: '' },
      onClick = () => {
      },
      btnType = '',
    } = this.props;
    let couponBtn = this.changeCouponBtn();
    let isShowAverage = this.isShowAverage();
    return (
      <View style={styles.containerStyle}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onClick}
          style={styles.couponView}>
          <ImageBackground
            source={require('../../assets/images/coupon/coupon_bg_white.png')}
            resizeMode="stretch"
            style={{ width: px(690), height: px(150), flexDirection: 'row' }}
          >
            <ImageBackground
              source={require('../../assets/images/coupon/coupon_bg.png')}
              style={styles.imageBgStyle}
              resizeMode="stretch">
              <View style={styles.moneyViewStyle}>
                <Text style={styles.moneyNumStyle}>{VOUCHER}</Text>
                <Text style={styles.moneyTextStyle}>{NO_THRESHOLD}</Text>
              </View>
            </ImageBackground>
            <View style={styles.rightViewStyle}>
              <View style={{ flexDirection: 'column' }}>
                <View style={{ marginTop: px(14) }}>
                  <Text numberOfLines={1} style={styles.nameStyle}>{this.checkIdenameLength(couponData.ideName)}</Text>
                </View>
                <View style={styles.viewContainer}>
                  <Text style={styles.averageStyle}>{isShowAverage}</Text>
                </View>
                <View>
                  <Image
                    style={styles.lineStyle}
                    source={require('../../assets/images/coupon/line.png')}
                    resizeMode="stretch"/>
                  <View style={{ flexDirection: 'row', marginTop: px(11) }}>
                    <Text style={styles.mccStyle}>{MCC_NUM}{couponData.mcc}</Text>
                    <Text style={styles.mccStyle}>{INTO_NETWORK}{couponData.createTime}</Text>
                  </View>
                </View>
              </View>
              {
                btnType !== 'NONE' ?
                  <Image
                    style={couponData.selected ? styles.userBtnStyle :
                      btnType === 'CANCEL' ? styles.cancelBtn : styles.btnStyle}
                    source={couponBtn}
                    resizeMode="stretch"/>
                  : <View/>
              }
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    height: px(181),
    width: deviceWidth,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.PAGE_BG_COLOR
  },
  couponView: {
    flexDirection: 'row',
    height: px(150),
    width: px(690),
    marginTop: px(18),
  },
  imageBgStyle: {
    height: px(150),
    width: px(125)
  },
  moneyViewStyle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewContainer: {
    marginTop: px(12),
    flexDirection: 'row',
  },
  moneyNumStyle: {
    color: '#C5D1FB',
    fontSize: px(64),
  },
  moneyTextStyle: {
    marginTop: px(5),
    color: '#C5D1FB',
    fontSize: px(18),
  },
  rightViewStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  lineStyle: {
    height: px(3),
    width: px(371),
    marginLeft: px(23),
    marginTop: px(18)
  },
  mccStyle: {
    fontSize: px(22),
    color: '#9d9d9d',
    marginLeft: px(23)
  },
  btnStyle: {
    position: 'absolute',
    height: px(70),
    width: px(130),
    right: px(25),
    top: px(57),
  },
  cancelBtn: {
    position: 'absolute',
    height: px(36),
    width: px(107),
    right: px(25),
    top: px(57),
  },
  userBtnStyle: {
    position: 'absolute',
    height: px(102),
    width: px(107),
    top: px(24),
    right: px(25),
  },
  nameStyle: {
    fontSize: px(30),
    color: '#666',
    marginLeft: px(22),
    marginRight: px(130)
  },
  averageStyle: {
    fontSize: px(18),
    color: '#c3c3c3',
    marginLeft: px(22),
  },
});