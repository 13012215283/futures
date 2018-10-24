import { StyleSheet } from 'react-native';

import { px2dp } from 'futures/utils/px2dp';
import { px2sp } from 'futures/utils/px2sp';
import { colors, sizes } from 'futures/components/themes/index';

const { white } = colors;
const { f1, f2, f3 } = sizes;

export default StyleSheet.create({
  Info: {
    height: px2dp(104),
    backgroundColor: white,
    marginTop: px2dp(20),
    paddingLeft: px2dp(32),
    paddingRight: px2dp(32),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  uploadBox: {
    marginTop: px2dp(32),
    marginBottom: px2dp(32),
  },
  ListText: {
    fontSize: f3,
    color: colors[1101],
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterBg: {
    width: px2dp(50),
    height: px2dp(50),
    borderRadius: px2dp(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontFamily: 'iconfont',
    fontSize: px2sp(32),
  },
  uploadBtn: {
    width: px2dp(280),
    height: px2dp(96),
    backgroundColor: colors[1003],
    marginTop: 0,
  },

  Line: {
    flex: 1,
    backgroundColor: '#e6e6e6',
    height: px2dp(2),
  },
  statusText: {
    fontSize: f1,
    color: colors[1102],
    width: '33.3%',
  },
  chooseText: {
    fontSize: f2,
    width: '33.3%',
  },
  authOK: {
    fontSize: f2,
    color: colors[1002],
  },
  statusBar: {
    marginLeft: px2dp(88),
    marginRight: px2dp(88),
    marginTop: px2dp(32),
  },
  textBar: {
    marginLeft: px2dp(76),
    marginRight: px2dp(76),
    justifyContent: 'space-between',
    paddingTop: px2dp(16),
  },
  CardsBox: {
    marginLeft: px2dp(72),
    marginRight: px2dp(72),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    width: px2dp(130),
    height: px2dp(80),
    borderRadius: px2dp(4),
  },
  NotYetUpload: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    height: px2dp(356),
    backgroundColor: white,
  },
  Circle: {
    width: px2dp(36),
    height: px2dp(36),
    borderRadius: px2dp(28),
    backgroundColor: '#e6e6e6',
    marginRight: px2dp(14),
  },
  authInfo: {
    fontSize: f1,
    color: colors[1001],
    textAlign: 'center',
    height: px2dp(44),
    marginTop: px2dp(32),
  },
  NormalText: {
    fontSize: f1,
    color: colors[1101],
    height: px2dp(50),
    textAlign: 'center',
  },
  tipBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: px2dp(32),
  },
  ServiceBtn: {
    fontFamily: 'iconfont',
    fontSize: px2dp(44),
    color: colors.white,
    marginRight: px2dp(32),
  },
  dialogText: {
    fontSize: sizes.f2,
    color: colors[1102],
    lineHeight: px2dp(48),
  },
});
