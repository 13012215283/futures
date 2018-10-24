import { StyleSheet } from 'react-native';

import { colors, sizes } from '../../themes';

const { f2 } = sizes;

const styles = StyleSheet.create({
  inputRectangle: {
    flexDirection: 'row',
    borderBottomColor: colors['1104'],
    borderBottomWidth: 1,
    paddingLeft: 5,
  },
  inputContent: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  inputTitle: {
    flex: 8,
  },
  inputRight: {
    flex: 1,
  },
  inputTileText: {
    color: colors['1103'],
    fontSize: f2,
  },
  inputValueText: {
    color: colors.black,
    fontSize: f2,
  },
  inputRightText: {
    color: colors['1104'],
    fontSize: 20,
  },
});

export default styles;
