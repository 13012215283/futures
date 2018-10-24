import { StyleSheet } from 'react-native';

import { colors, sizes } from 'futures/components/themes';
import { px2dp } from 'futures/utils/px2dp';
import { px2sp } from 'futures/utils/px2sp';

const { f1, f2, f3 } = sizes;

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingLeft: px2dp(32),
    paddingRight: px2dp(32),
    marginBottom: px2dp(10),
  },
  line: {
    paddingTop: px2dp(8),
    paddingBottom: px2dp(8),
  },
  info: {
    flex: 1,
    height: px2dp(88),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoText: {
    color: colors[1101],
    fontSize: f3,
  },
  addressText: {
    color: colors[1101],
    fontSize: f2,
    height: px2dp(60),
  },
  opertions: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors[1104],
    height: px2dp(60),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
  },
  icon: {
    fontFamily: 'iconfont',
    color: colors[1102],
    fontSize: px2sp(32),
    marginRight: px2dp(10),
  },
  iconText: {
    fontSize: f1,
  },
  selectIcon: {
    fontFamily: 'iconfont',
    color: colors[1001],
    fontSize: px2sp(40),
    marginTop: px2dp(80),
    marginRight: px2dp(14),
    paddingLeft: px2dp(14),
  },
  selectColor: {
    color: colors[1001],
  },
});
