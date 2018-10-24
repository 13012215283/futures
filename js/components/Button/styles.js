import { StyleSheet } from 'react-native';

import { alpha } from '../../utils/color';
import { px2dp } from '../../utils/px2dp';
import { colors, sizes } from './../themes';

/**
 * 按钮根据规范有三种type：primary，operation及status
 * primary按钮：分为enable 和 disable
 * operation按钮：分为订单(order) 和 补款(fillMoney)
 * status按钮：未成交unsetted,交割中pending，已交割resolved，已撤单revoke及填入writeIn
 */
const primary = StyleSheet.create({
  container: {
    marginTop: px2dp(64),
    marginLeft: px2dp(64),
    marginRight: px2dp(64),
    borderRadius: px2dp(8),
    alignItems: 'center',
    justifyContent: 'center',
    height: px2dp(96),
  },
  text: {
    fontSize: sizes.f3,
    color: colors.white,
    textAlign: 'center',
  },
  enable: {
    backgroundColor: colors[1001],
  },
  disable: {
    backgroundColor: colors[1103],
  },
});

const operation = StyleSheet.create({
  container: {
    minWidth: px2dp(124),
    height: px2dp(60),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: px2dp(4),
    borderWidth: StyleSheet.hairlineWidth,
  },
  text: {
    paddingLeft: px2dp(30),
    paddingRight: px2dp(30),
    fontSize: sizes.f2,
  },
  fillMoney: {
    borderColor: colors[1001],
    backgroundColor: alpha(colors[1001], 0.8),
  },
  order: {
    borderColor: colors[1103],
    backgroundColor: colors[1105],
  },
  fillMoneyText: {
    color: colors.white,
  },
  orderText: {
    color: colors[1102],
  },
});

const status = StyleSheet.create({
  container: {
    height: px2dp(44),
    borderRadius: px2dp(22),
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: StyleSheet.hairlineWidth,
  },
  text: {
    textAlign: 'center',
    paddingLeft: px2dp(20),
    paddingRight: px2dp(20),
    alignItems: 'center',
    fontSize: sizes.f2,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  unsettled: {
    borderColor: colors[1001],
    backgroundColor: alpha(colors[1001], 0.2),
  },
  unsettledText: {
    color: colors[1001],
  },
  pending: {
    borderColor: colors[1002],
    backgroundColor: alpha(colors[1002], 0.2),
  },
  pendingText: {
    color: colors[1002],
  },
  resolved: {
    borderColor: colors[1003],
    backgroundColor: alpha(colors[1003], 0.2),
  },
  resolvedText: {
    color: colors[1003],
  },
  revoke: {
    borderColor: colors[1103],
    backgroundColor: alpha(colors[1103], 0.2),
  },
  revokeText: {
    color: colors[1103],
  },
  writeIn: {
    height: px2dp(40),
    borderRadius: px2dp(20),
    borderColor: colors[1004],
    paddingLeft: px2dp(12),
    paddingRight: px2dp(12),
  },
  writeInText: {
    fontSize: sizes.f1,
    color: colors[1004],
  },
});

export { primary, status, operation };
