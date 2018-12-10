import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../store/actions/index';

// import store from './index';

// export default (mapState = () => {}, mapProps = () => {}) => {
// 	return target => {
// 		console.log(target.initState);
// 		connect(
// 			mapState,
// 			mapProps
// 		)(target);
// 		return target;
// 	};
// };

/**
 * 对connect方法的封装，将action注入到props中。
 * @param  {Function} mapState 返回state的函数。
 * @return {ReactComponent} 包装后的react组件
 */
export default mapState => target => {
  return connect(
    mapState,
    dispatch => Object.assign(
      ...Object.keys(actions).map(key => ({
        [key]: bindActionCreators(actions[key], dispatch)
      }))
    )
  )(target);
};