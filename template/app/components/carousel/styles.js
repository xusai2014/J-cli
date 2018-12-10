import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  pagination: {
    position: 'absolute',
    alignItems: 'center',
  },
  paginationX: {
    bottom: 10,
    left: 0,
    right: 0,
  },
  paginationY: {
    right: 10,
    top: 0,
    bottom: 0,
  },
  pointStyle: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
  pointActiveStyle: {
    backgroundColor: '#888',
  },
  spaceStyle: {
    marginHorizontal: 5 / 2,
    marginVertical: 6 / 2,
  },
});