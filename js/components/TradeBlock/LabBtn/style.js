import { StyleSheet } from 'react-native';
import { px2dp } from 'futures/utils/px2dp';

import colors from 'futures/components/themes/colors';
import sizes from 'futures/components/themes/sizes';

const { f0 } = sizes;

const style = StyleSheet.create({
  btn: {
    paddingLeft: px2dp(5),
    paddingRight: px2dp(5),
    height: px2dp(36),
    borderColor: colors[1001],
    borderWidth: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: px2dp(18),
  },
  btnFont: {
    fontSize: f0,
    color: colors[1001],
  },
});

export default style;
