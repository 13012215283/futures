import { StyleSheet } from 'react-native';
import { colors, sizes } from 'futures/components/themes';
import { px2dp } from 'futures/utils/px2dp';

const style = StyleSheet.create({
  balanceContainer: {
    height: px2dp(88),
    marginTop: px2dp(16),
    backgroundColor: colors.white,
    paddingLeft: px2dp(32),
    paddingRight: px2dp(32),
  },
  nameText: {
    fontSize: sizes.f2,
    color: colors[1102],
  },
  valueText: {
    fontSize: sizes.f2,
    color: colors.black,
    fontWeight: 'bold',
  },
  actionText: {
    fontSize: sizes.f1,
    color: colors['1004'],
    marginRight: px2dp(15),
  },
  balanceTip: {
    flexDirection: 'row',
  },
});

export default style;
