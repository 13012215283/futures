import { StyleSheet } from 'react-native';

import { px2dp } from 'futures/utils/px2dp';
import { px2sp } from 'futures/utils/px2sp';
import { colors, sizes } from 'futures/components/themes/index';
import { alpha } from 'futures/utils/color';

const { white } = colors;
const { f3, f2, f1 } = sizes;

export default StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: colors[1105],
  },
  middle: {
    alignItems: 'center',
    flex: 1,
    marginBottom: px2dp(124),
  },
  bankIcon: {
    width: px2dp(32),
    height: px2dp(32),
    marginRight: px2dp(13),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: f2,
    color: colors[1001],
    marginTop: px2sp(16),
  },
  authBox: {
    backgroundColor: alpha(colors[1105], 0.5),
    width: px2dp(686),
    borderRadius: px2dp(6),
    borderColor: colors[1103],
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: px2dp(20),
  },
  header: {
    fontSize: f3,
    color: colors[1101],
    height: px2dp(88),
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  operationBox: {
    backgroundColor: white,
    borderBottomLeftRadius: px2dp(6),
    borderBottomRightRadius: px2dp(6),
    paddingBottom: px2dp(32),
    paddingTop: px2dp(48),
  },
  notUploadText: {
    marginTop: px2dp(8),
    fontSize: f1,
    color: colors[1103],
    height: px2dp(44),
  },
});
