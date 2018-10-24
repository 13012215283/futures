import { StyleSheet } from 'react-native';
import { colors, sizes } from 'futures/components/themes';
import { px2dp } from 'futures/utils/px2dp';

const OpenDealBgc = '#3B3B3B';
const OpenDealTitleBgc = '#303030';
const volumeColor = '#ffff00';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors['1105'],
  },
  openPosition: {
    flexDirection: 'row',
    marginTop: px2dp(20),
  },
  priceContainer: {
    flex: 1,
    marginLeft: 1,
    backgroundColor: OpenDealTitleBgc,
  },
  realtimePrice: {
    paddingTop: px2dp(16),
    paddingBottom: px2dp(16),
    backgroundColor: OpenDealBgc,
  },
  goLongContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors['1104'],
  },
  goLongView: {
    height: px2dp(52),
    alignItems: 'center',
    backgroundColor: OpenDealTitleBgc,
    paddingLeft: px2dp(20),
    flexDirection: 'row',
  },
  goLong: {
    fontSize: sizes.f1,
    color: colors.white,
    marginRight: px2dp(16),
  },
  avlBalanceView: {
    height: px2dp(100),
    marginTop: px2dp(20),
    paddingLeft: px2dp(32),
    paddingRight: px2dp(32),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
  },
  avlBalanceText: {
    color: colors['1102'],
    fontSize: sizes.f2,
  },
  currentBalanceView: {
    flexDirection: 'row',
  },
  insufficientView: {
    justifyContent: 'center',
  },
  insufficient: {
    fontSize: sizes.f1,
    color: colors['1004'],
    marginRight: px2dp(32),
  },
  currentBalanceText: {
    color: colors['1101'],
    fontSize: sizes.f2,
    fontWeight: 'bold',
  },
  total: {
    color: colors['1001'],
    fontSize: sizes.f3,
  },
  totalMoney: {
    fontSize: sizes.f4,
    color: colors['1001'],
    fontWeight: 'bold',
  },
  costTips: {
    fontSize: sizes.f0,
    color: colors['1102'],
  },
  toolbar: {
    height: px2dp(100),
    backgroundColor: colors.white,
    flexDirection: 'row',
  },
  totalView: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: px2dp(32),
    borderTopWidth: 1,
    borderTopColor: colors['1104'],
  },
  paymentBtn: {
    width: px2dp(300),
    height: '100%',
    justifyContent: 'center',
  },
  paymentText: {
    fontSize: sizes.f4,
    color: colors.white,
    textAlign: 'center',
  },
  activePayment: {
    backgroundColor: colors['1001'],
  },
  inactivePayment: {
    backgroundColor: colors['1103'],
  },
  lasted5PricePriceStyle: {
    textAlign: 'center',
    fontSize: sizes.f1,
  },
  lasted5PriceVolumeStyle: {
    textAlign: 'center',
    color: volumeColor,
    fontSize: sizes.f1,
  },
  openDealNum: {
    color: colors.white,
    fontSize: sizes.f1,
  },
  lasted5PriceTextView: {
    height: px2dp(52),
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
    color: colors['1101'],
    fontWeight: 'bold',
    fontSize: sizes.f2,
    textAlign: 'center',
    marginTop: px2dp(20),
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
    top: '50%',
    fontSize: sizes.f1,
    fontFamily: 'iconfont',
  },

  adressDefaultView: {
    backgroundColor: colors.white,
    alignItems: 'center',
    marginTop: px2dp(16),
    paddingBottom: px2dp(20),
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
});
