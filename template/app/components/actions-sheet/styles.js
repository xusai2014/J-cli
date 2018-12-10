import { StyleSheet } from 'react-native';

import { px } from '../screen-utils';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
		justifyContent: 'flex-end',
	},
	modalBody: {
		backgroundColor: '#fff',
	},
	actionItem: {
		height: px(88),
		alignItems: 'center',
		justifyContent: 'center',
		borderTopWidth: px(1),
		borderColor: '#ddd',
	},
	actionText: {
		textAlign: 'center',
		fontSize: px(26),
	},
	cancenMargin: {
		height: px(12),
		backgroundColor: '#eee',
		borderTopWidth: px(1),
		borderColor: '#ddd',
	},
	removeButtonText: {
		color: 'red',
		fontSize: px(28),
	},
	titleView: {
		padding: px(16),
		alignItems: 'center',
		borderBottomWidth: px(1),
		borderColor: '#ddd',
	},
	titleText: {
		fontSize: px(26),
		fontWeight: 'bold',
		marginVertical: px(20),
	},
	messageText: {
		fontSize: px(26),
		marginVertical: px(20),
		color: '#555'
	}
});