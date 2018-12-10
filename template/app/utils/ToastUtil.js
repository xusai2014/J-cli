/**
 * Created by chengkai on 2017/11/30.
 * toast 提示统一管理类
 */
// import { Toast } from 'antd-mobile-rn';
import { Toast } from "../components";
import { LOADING } from "../config/string.conf";

/* 展示loading框 */
export const showLoading = (info = LOADING, duration = 10) => {
  Toast.loading(info, duration);
};

/* 隐藏toast */
export const hideToast = () => {
  Toast.hide();
}

/**
 * 展示toast(默认展示的时候可操作)
 * @param info          提示信息
 * @param duration      展示时间
 * @param onClose       消失时回调
 * @param mask          false: 展示时可操作 true: 展示时不可操作
 */
export const showToast = (info = '', duration = 2, onClose = () => {
}, mask = false) => {
  Toast.info(info, duration, onClose, mask);
}