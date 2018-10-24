import { StyleSheet } from 'react-native';

import { px2dp } from 'futures/utils/px2dp';
import color from 'futures/components/themes/colors';
import sizes from 'futures/components/themes/sizes';

const styles = StyleSheet.create({
  selectBar: {
    width: px2dp(44),
    flexDirection: 'column',
    position: 'absolute',
    right: px2dp(30),
    top: px2dp(132),
  },
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
});

export default styles;
