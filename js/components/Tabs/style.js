import { StyleSheet } from 'react-native';

import { sizes, colors } from '../themes';

const { f2 } = sizes;

export default StyleSheet.create({
  container: {
    position: 'relative',
    top: 0,
    right: 0,
    left: 0,
    height: 44,
    opacity: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconView: {
    flex: 1,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedWrapperStyle: {
    borderBottomWidth: 3,
    borderBottomColor: colors[1001],
  },
  selectedTextStyle: {
    color: colors[1001],
  },
  title: {
    fontSize: f2,
  },
});
