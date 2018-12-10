import { StyleSheet } from 'react-native';

import { px } from '../screen-utils';

export default StyleSheet.create({
	buttonView: {
		height: px(80),
		position: 'relative',
		overflow: 'hidden',
	},
	buttonBody: {
		...StyleSheet.absoluteFillObject,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
		fontSize: px(32),
		marginHorizontal: px(10),
	},
	iconView: {
		marginHorizontal: px(10),
		justifyContent: 'center',
		alignItems: 'center',
	}
});