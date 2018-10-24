import { colors, sizes } from 'futures/components/themes';
import { px2dp } from 'futures/utils/px2dp';

const purchasePaymentStyle = {
  topArea: {
    backgroundColor: colors['1105'],
    paddingLeft: px2dp(32),
    paddingRight: px2dp(32),
    flex: 1,
  },
  container: {
    flex: 1,
  },
  infoList: {
    marginTop: px2dp(60),
    borderWidth: 1,
    borderColor: colors['1104'],
    backgroundColor: colors.white,
    paddingLeft: px2dp(32),
    paddingRight: px2dp(32),
  },

  adressView: {
    position: 'relative',
    backgroundColor: colors.white,
    alignItems: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors['1104'],
    height: px2dp(153),
  },

  adressNoti: {
    marginTop: px2dp(18),
    color: colors['1101'],
    fontWeight: 'bold',
    fontSize: sizes.f2,
    textAlign: 'center',
  },

  adressDetail: {
    marginTop: px2dp(16),
    color: colors['1101'],
    fontSize: sizes.f1,
    textAlign: 'center',
    marginLeft: px2dp(30 + 24 + 8),
    marginRight: px2dp(30 + 24 + 8),
  },

  icon: {
    position: 'absolute',
    right: px2dp(30),
    top: px2dp((153 - 24) / 2),
    fontSize: sizes.f1,
    fontFamily: 'iconfont',
  },

  adressDefaultView: {
    backgroundColor: colors.white,
    alignItems: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors['1104'],
    height: px2dp(149),
  },

  addAdressContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  addAdressButton: {
    width: px2dp(240),
    height: px2dp(60),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors['1001'],
    borderRadius: px2dp(30),
  },

  addAdressText: {
    color: colors['1001'],
    fontWeight: 'bold',
    fontSize: sizes.f1,
    textAlign: 'center',
  },
};

export default purchasePaymentStyle;
