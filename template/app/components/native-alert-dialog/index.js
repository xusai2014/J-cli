import React from 'react';
import { Alert } from 'react-native';

const overlayMap = {};

const confirm = ({
                   title = '系统提示',
                   message = '',
                   onOk = () => {
                   },
                   onCancel = () => {
                   },
                   negativeBtnText = '取消',
                   positiveBtnText = '确定',
                   cancelable = true,
                 }) => {
  Alert.alert(title, message, [
    { text: negativeBtnText, onPress: onCancel },
    { text: positiveBtnText, onPress: onOk },
  ], { cancelable: cancelable });
}

const alert = ({
                 title = '系统提示',
                 message = '',
                 onOk = () => {
                 },
                 overlayKey,
                 cancelable = true,
               }) => {

  if (overlayKey) {
    if (overlayMap[overlayKey]) return;
    overlayMap[overlayKey] = true;
  }

  const onCancel = () => {
    if (overlayKey) {
      delete overlayMap[overlayKey];
    }
    onOk();
  }

  Alert.alert(title, message, [
    { text: '确定', onPress: onCancel },
  ], { cancelable: cancelable });
}

export default {
  confirm, alert
}