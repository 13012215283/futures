import { StyleSheet } from 'react-native';

import { px2dp } from 'futures/utils/px2dp';
import { px2sp } from 'futures/utils/px2sp';
import { colors, sizes } from 'futures/components/themes';

const { f3 } = sizes;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors[1105],
    position: 'relative',
  },
  choose: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: px2dp(32),
    backgroundColor: colors.white,
    borderColor: colors[1104],
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  iconText: {
    fontSize: f3,
    color: colors[1103],
    marginRight: px2dp(16),
  },
  icon: {
    fontFamily: 'iconfont',
    fontSize: px2sp(32),
    color: colors[1103],
  },
  addDetail: {
    paddingTop: px2dp(8),
    paddingBottom: px2dp(8),
    backgroundColor: colors.white,
  },
  detainContainer: {
    marginLeft: px2dp(32),
    marginRight: px2dp(32),
  },
  detailInput: {
    height: px2dp(176),
    fontSize: f3,
    color: colors[1101],
    textAlignVertical: 'top',
    paddingLeft: 0,
  },
  setDefaultLine: {
    height: px2dp(88),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: px2dp(8),
    paddingBottom: px2dp(8),
    paddingLeft: px2dp(32),
    paddingRight: px2dp(32),
    marginTop: px2dp(16),
    backgroundColor: colors.white,
  },
  setDefault: {
    fontSize: f3,
    color: colors[1101],
  },
  primaryBtn: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  btnContainer: {
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 0,
  },
});
