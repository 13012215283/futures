import { StyleSheet } from 'react-native';

import colors from 'futures/components/themes/colors';
import sizes from 'futures/components/themes/sizes';

const { f2, f3 } = sizes;

const style = StyleSheet.create({
  textLine: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: f2,
    color: colors[1102],
  },
  deliveValue: {
    fontSize: f3,
    fontWeight: '500',
    marginLeft: 3,
  },
});

export default style;
