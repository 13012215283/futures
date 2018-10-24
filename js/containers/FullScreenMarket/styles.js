import { StyleSheet } from 'react-native';
import { px2dp } from 'futures/utils/px2dp';
import { colors, sizes } from 'futures/components/themes';

const ContainerBgc = '#303030';
const volumeColor = '#ffff00';

const styles = StyleSheet.create({
  container: {
    backgroundColor: ContainerBgc,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    marginTop: px2dp(8),
    marginBottom: px2dp(8),
    paddingLeft: px2dp(32),
    paddingRight: px2dp(32),
  },
  productInfoContainer: {
    flexDirection: 'row',
  },
  productInfo: {
    // justifyContent: 'center',
    marginRight: px2dp(32),
  },
  productName: {
    fontSize: sizes.f3,
    color: colors.white,
    height: px2dp(48),
  },
  productId: {
    fontSize: sizes.f1,
    color: colors.white,
  },

  lastedPriceView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: px2dp(48),
  },
  priceTitle: {
    color: colors.white,
    fontSize: sizes.f4,
    marginRight: px2dp(20),
  },
  lastedPrice: {
    fontSize: sizes.f4,
    fontWeight: 'bold',
  },
  lastedPriceSubContainer: {
    flexDirection: 'row',
    height: px2dp(36),
    alignItems: 'center',
  },
  priceItem: {
    fontSize: sizes.f1,
    color: colors.white,
    marginRight: px2dp(10),
  },
  realtimeDeal: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: px2dp(16),
  },
  productPriceItem: {
    flexDirection: 'row',
    width: '33.33%',
  },
  productPriceItemTitle: {
    fontSize: sizes.f2,
    color: colors.white,
    marginLeft: px2dp(16),
    marginRight: px2dp(16),
  },
  productPriceText: {
    fontSize: sizes.f2,
  },
  headerProductTextCenter: {
    height: px2dp(48),
    justifyContent: 'center',
  },
  headerProductSubTextCenter: {
    height: px2dp(36),
    justifyContent: 'center',
  },
  volumeTextColor: {
    color: volumeColor,
  },
  whiteTextColor: {
    color: colors.white,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderTopColor: colors['1102'],
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors['1102'],
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: px2dp(80),
    alignItems: 'center',
  },
  tabsView: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: colors['1102'],
  },
  tabView: {
    marginLeft: px2dp(60),
    marginRight: px2dp(60),
  },
  tabText: {
    fontSize: sizes.f3,
    color: colors['1103'],
  },
  activeTabText: {
    fontSize: sizes.f3,
    fontWeight: 'bold',
    color: colors.white,
  },
  goBackView: {
    paddingLeft: px2dp(32),
    paddingRight: px2dp(32),
    flexDirection: 'row',
    alignItems: 'center',
  },
  goBackText: {
    fontSize: sizes.f2,
    color: colors.white,
  },
  goBackIcon: {
    fontFamily: 'iconfont',
    fontSize: px2dp(44),
    color: colors.white,
  },
  productChart: {
    flex: 1,
    flexDirection: 'row',
  },
  chartView: {
    flex: 1,
  },
  lastedDealView: {
    width: px2dp(255),
    marginLeft: px2dp(15),
    borderColor: colors['1102'],
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: px2dp(28),
    marginBottom: px2dp(26),
  },
  goLongDealView: {
    flex: 1,
    paddingTop: px2dp(10),
    paddingBottom: px2dp(10),
  },
  goShortDealView: {
    flex: 1,
    paddingTop: px2dp(10),
    paddingBottom: px2dp(10),
    borderBottomColor: colors['1102'],
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  dealTextView: {
    height: px2dp(48),
    alignItems: 'center',
  },
  dealTitleStyle: {
    color: colors.white,
    textAlign: 'center',
  },
  dealPriceStyle: {
    flex: 2,
    textAlign: 'center',
  },
  dealVolumeStyle: {
    color: volumeColor,
    textAlign: 'center',
  },
});

export default styles;
