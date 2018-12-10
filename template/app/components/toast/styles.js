import { StyleSheet, Platform } from 'react-native';

import { px } from '../screen-utils';

export default StyleSheet.create({
	toastView: {
		...StyleSheet.absoluteFillObject,
		top: Platform.OS === 'ios' ? 64 : 54,
		zIndex: 1000,
		justifyContent: 'center',
		alignItems: 'center',
	},
	toastInfoView: {
		minWidth: px(150),
		alignItems: 'center',
		paddingVertical: px(20),
		paddingHorizontal: px(40),
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
		borderRadius: px(16),
	},
	toastText: {
		color: '#fff',
		fontSize: px(26),
		lineHeight: px(26),
		backgroundColor: 'transparent',
	},
	toastBody: {
		alignItems: 'center',
		justifyContent: 'center',
		minWidth: px(160),
		minHeight: px(160),
		padding: px(10),
		borderRadius: px(20),
		backgroundColor: '#000',
		opacity: 0.8,
	},
	messageText: {
		minWidth: px(100),
		color: '#fff',
		fontSize: px(26),
		lineHeight: px(26),
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop: px(20),
		marginHorizontal: px(20),
		backgroundColor: 'transparent',
	}
});