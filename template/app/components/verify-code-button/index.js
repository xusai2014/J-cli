/**
 * Created by chengkai on 2017/11/29.
 */

import React, { Component } from 'react';
import { AppState, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import * as theme from '../../config/theme.conf';
import fetch from '../../sx-fetch';
import { hideToast, showLoading, showToast } from '../../utils/ToastUtil';
import { checkNull, checkPhoneNo } from '../../utils/LegitimacyDetectionTool';
import { SEND_SMS_CODE } from '../../config/url.conf';
import { PHONE_INCORRECT_PLEASE_RE_ENTER, PLEASE_INPUT_PHONE_NUMBER, } from "../../config/string.conf";


/* 验证码倒计时秒数（秒） */
const VERIFY_TIME = 60;

@fetch.inject()
export default class VerifyCodeButton extends Component {

  static propTypes = {
    phoneNo: PropTypes.string.isRequired, /* 获取验证码的手机号码 */
    smsType: PropTypes.string.isRequired, /* 获取验证码 功能类型 */
    verifyCodeUrl: PropTypes.string, /* 获取验证码的接口地址(传入此字段需要自己拼接参数) */
    isSendOnRender: PropTypes.bool, /* 是否在渲染之后立即获取验证码 */
    onButtonClick: PropTypes.func, /* 点击按钮之后的回调 */
    onVerifySendSuccess: PropTypes.func, /* 验证码发送成功之后的回调 */
    isAutoHandleSendSMS: PropTypes.bool, /* 是否自动处理发送短信事件 */
  }
  static defaultProps = {
    isAutoHandleSendSMS: true,
    isSendOnRender: false,
  }
  state = {
    verifyTimer: 0, /* 获取验证码倒计时 */
    verifyBtnDisabled: false, /* 获取验证码按钮是否禁用 */
    verifyMsg: '获取验证码', /* 验证码按钮文字 */
  }
  currentTime = 0;
  offsetTime = 0;

  _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'background' || nextAppState === 'inactive') {
      this.currentTime = new Date().getTime()
    }
    if (nextAppState === 'active') {
      let offSetTime = Math.round((new Date().getTime() - this.currentTime) / 1000);
      // 理论上灰出现的数字 > 1000000000，保守判断为36000(10小时)
      if (offSetTime > 36000) {
        this.offsetTime = 0;
      } else {
        this.offsetTime = offSetTime;
      }
    }
  }
  /**
   * 获取验证码
   * @return {void}
   */
  handleGetVerifyCodeClick = () => {
    const {
      isAutoHandleSendSMS, onButtonClick = () => {
      }
    } = this.props;
    onButtonClick();
    if (isAutoHandleSendSMS) {
      this._sendSMSVerifyCode();
    }
  }
  /**
   * 发送验证码事件
   */
  _sendSMSVerifyCode = () => {
    let { phoneNo } = this.props;
    if (!checkNull(phoneNo)) {
      showToast(PLEASE_INPUT_PHONE_NUMBER);
      return;
    }
    if (!checkPhoneNo(phoneNo)) {
      showToast(PHONE_INCORRECT_PLEASE_RE_ENTER);
      return;
    }
    this.sendVerifyCode();
  }
  /**
   * 发送验证码
   */
  sendVerifyCode = () => {

    const { verifyBtnDisabled } = this.state;

    if (verifyBtnDisabled) return;

    this.currentTime = 0;
    this.offsetTime = 0;

    this.setState({ verifyBtnDisabled: true });

    let {
      phoneNo, smsType,
      verifyCodeUrl = SEND_SMS_CODE
    } = this.props;

    showLoading();
    this.props.$fetch.post(verifyCodeUrl, {smsType, phoneNo})
        .then((data) => {
            hideToast();
            this.processVerifyData(data);
        }).catch(() => {
        hideToast();
        showToast('验证码发送失败，请重新获取！', 1);
        this.setState({
            verifyBtnDisabled: false,
            verifyMsg: '重新获取',
        });
    });
  }
  /**
   * 解析发送验证码成功数据
   * @param data
   */
  processVerifyData = (data) => {
    if (data.success) {
      let {
        onVerifySendSuccess = () => {}
      } = this.props;
      onVerifySendSuccess();
      showToast('验证码发送成功！', 1);
      this.verifyTimeout(VERIFY_TIME);
    } else {
      if (data.message) {
        showToast(data.message, 1);
      } else {
        showToast('验证码发送失败！', 1);
      }
      this.setState({
        verifyBtnDisabled: false,
        verifyMsg: '重新获取',
      });
    }
  }
  /**
   * 验证码倒计时
   * @param  {Number} time 时间
   * @return {void}
   */
  verifyTimeout = (time) => {

    time = time - this.offsetTime; // 时间修正值
    this.offsetTime = 0; // 恢复时间修正值初始状态

    this.setState({ verifyTimer: time });

    if (time <= 0) {
      this.setState({
        verifyBtnDisabled: false,
        verifyMsg: '重新获取',
      });
      return;
    }

    setTimeout(() => {
      this.verifyTimeout(time - 1);
    }, 1000);
  }

  componentDidMount() {
    if (this.props.isSendOnRender) {
      this.handleGetVerifyCodeClick();
    }
    const {
      _ref = () => {}
    } = this.props;
    _ref({
      sendSMSVerifyCode: this._sendSMSVerifyCode
    });
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    //重写组件的setState方法，直接返回空
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    let {
      verifyBtnDisabled,
      verifyTimer,
      verifyMsg,
    } = this.state;
    return (
      <View style={styles.verifyExtra}>
        <TouchableOpacity
          onPress={this.handleGetVerifyCodeClick}
          disabled={verifyBtnDisabled}>
          <Text style={{ color: theme.BASE_COLOR }}>
            {verifyTimer > 0 ? `重新获取(${verifyTimer})` : verifyMsg}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  verifyExtra: {
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 8,
    paddingRight: 8,
    borderWidth: 1.2,
    borderColor: theme.BASE_COLOR,
    borderRadius: 4,
    backgroundColor: 'white',
  },
})