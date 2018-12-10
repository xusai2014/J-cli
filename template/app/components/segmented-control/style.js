import { ViewStyle, TextStyle, StyleSheet } from 'react-native';
import Theme from '../theme';

export default {
  segment: {
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Theme.themeColor,
    borderRadius: 5,
  },
  item: {
    flex: 1,
    paddingVertical: 5,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemLeftRadius: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  itemRightRadius: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  itemText: {
    textAlign: 'center',
    fontSize: 12,
  },
};
