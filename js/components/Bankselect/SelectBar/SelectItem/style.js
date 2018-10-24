import { StyleSheet } from 'react-native';

import { px2dp } from 'futures/utils/px2dp';
import color from 'futures/components/themes/colors';
import sizes from 'futures/components/themes/sizes';

const styles = StyleSheet.create({
  selectBarItem: {
    width: px2dp(35),
    height: px2dp(35),
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: px2dp(30),
  },
  border: {
    borderColor: color.black,
    borderWidth: 1,
  },
  barItemText: {
    fontSize: sizes.f1,
  },
  whiteFont: {
    color: color.white,
  },
  redBac: {
    backgroundColor: color['1001'],
  },
});

export default styles;
