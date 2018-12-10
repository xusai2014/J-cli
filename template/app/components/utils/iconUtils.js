import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../icon';

/**
 * 公用 icon props 的propTypes
 * @type {object}
 */
export const IconPropTypes = PropTypes.oneOfType([
	PropTypes.string,
	PropTypes.element,
	PropTypes.shape(Icon.propTypes),
]);

/**
 * 根据icon props 类型获取Icon元素
 * @param  {string | object | element} iconProps icon props
 * @return {element} Icon 元素
 */
export const getIconElement = (iconProps, color) => {
	if (typeof iconProps === 'string') {
		return <Icon name={iconProps} color={color}/>;
	} else if(React.isValidElement(iconProps)) {
		return iconProps;
	} else if(typeof iconProps === 'object') {
		return <Icon color={color} {...iconProps}/>;
	} else if(!iconProps) {
		return null;
	} else {
		console.error('icon type error!');
	}
}