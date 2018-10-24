import { StyleSheet } from 'react-native';
import { px2dp } from 'futures/utils/px2dp';

import colors from 'futures/components/themes/colors';
import sizes from 'futures/components/themes/sizes';

const { f2 } = sizes;

const style = StyleSheet.create({
  infoItem: {
    width: px2dp(234),
    flexDirection: 'row',
    marginRight: px2dp(24),
    marginTop: px2dp(17),
    marginBottom: px2dp(17),
    justifyContent: 'space-between',
  },
  infoItemTitle: {
    fontSize: f2,
    color: colors[1102],
  },
  infoItemText: {
    fontSize: f2,
    color: colors[1101],
  },
  infoCount: {
    width: px2dp(148),
  },
});

export default style;
