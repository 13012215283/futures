import { StyleSheet } from 'react-native';
import { px2dp } from 'futures/utils/px2dp';
import { colors, sizes } from 'futures/components/themes';

const futureMarketBgc = '#303030';
const YELLOW = '#ffff00';

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: futureMarketBgc,
  },
  lastedDataView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: px2dp(2),
    paddingRight: px2dp(2),
    justifyContent: 'space-between',
  },
  mixText: {
    color: colors['1002'],
  },
  redText: {
    color: colors['1001'],
  },
  yellowText: {
    color: YELLOW,
  },
  whiteText: {
    color: colors.white,
  },
  greenText: {
    color: colors['1002'],
  },
  textView: {
    flexDirection: 'row',
    // flex: 1,
    width: '50%',
    paddingLeft: px2dp(30),
    paddingRight: px2dp(30),
    justifyContent: 'space-between',
    height: px2dp(36),
    marginTop: px2dp(20),
    alignItems: 'center',
  },
  dataTitle: {
    fontSize: sizes.f3,
    color: colors.white,
  },
  lastedData: {
    color: colors['1001'],
    fontWeight: 'bold',
  },
  market: {
    position: 'relative',
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors['1102'],
  },
  tabContainer: {
    overflow: 'hidden',
    marginTop: px2dp(20),
    height: px2dp(60),
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors['1102'],
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors['1102'],
  },
  selectedTextStyle: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: sizes.f3,
  },
  defaultTextStyle: {
    fontSize: sizes.f3,
    color: colors['1103'],
  },
  realtimeDealView: {
    flexDirection: 'row',
    paddingLeft: px2dp(12),
    paddingRight: px2dp(12),
    marginTop: px2dp(20),
  },
  dealContainer: {
    flex: 1,
    paddingBottom: px2dp(20),
  },
  textViewStyle: {
    height: px2dp(36),
    marginTop: px2dp(20),
  },
  titleStyle: {
    fontSize: sizes.f3,
    color: colors.white,
  },
  priceStyle: {
    fontSize: sizes.f3,
    color: colors['1001'],
    fontWeight: 'bold',
    textAlign: 'center',
  },
  volumeStyle: {
    fontSize: sizes.f3,
    color: YELLOW,
    textAlign: 'center',
  },
  thead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: px2dp(20),
    paddingRight: px2dp(20),
    height: px2dp(36),
    alignItems: 'center',
  },
  th: {
    fontSize: sizes.f2,
    color: colors.white,
    flex: 1,
    textAlign: 'center',
  },
  priceTh: {
    fontSize: sizes.f2,
    color: colors.white,
    flex: 3,
    textAlign: 'center',
  },
  fsBtnView: {
    position: 'absolute',
    right: px2dp(8),
    bottom: px2dp(8),
  },
  fsBtnText: {
    fontFamily: 'iconfont',
    fontSize: px2dp(44),
    color: colors.white,
  },
});

export default styles;
