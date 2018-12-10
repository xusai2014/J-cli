import { StyleSheet } from 'react-native';
import ScreenUtils from '../screen-utils';

const { px } = ScreenUtils;

export default StyleSheet.create({
	listBody: {
		backgroundColor: '#fff',
		borderColor: '#ddd',
		borderTopWidth: px(1),
		borderBottomWidth: px(1),
	},
	itemChildren: {
		flexDirection: 'row',
		minHeight: px(88),
		paddingHorizontal: px(30),
		paddingVertical: px(12),
		alignItems: 'center',
	},
	itemContent: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	itemLine: {
		height: px(1),
		backgroundColor: '#ddd',
	},
	itemArrow: {
		marginLeft: px(8),
		marginRight: -px(8),
	}
});