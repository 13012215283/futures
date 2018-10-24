import { StyleSheet, Platform } from 'react-native';

import { px2dp } from 'futures/utils/px2dp';
import { colors, sizes } from 'futures/components/themes';

export default StyleSheet.create({
  font: {
    fontFamily: 'iconfont',
    fontSize: px2dp(44),
    color: colors.white,
  },
  navContainer: {
    height: Platform.OS === 'ios' ? 20 + px2dp(88) : px2dp(88),
    backgroundColor: colors['1001'],
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: px2dp(32),
    paddingTop: Platform.OS === 'ios' ? 20 + px2dp(16) : px2dp(16),
    paddingBottom: px2dp(16),
  },
  inputView: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.white,
    marginRight: px2dp(32),
    borderRadius: px2dp(28),
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBtn: {
    fontSize: px2dp(30),
    color: colors['1001'],
    marginLeft: px2dp(16),
    marginRight: px2dp(16),
  },
  searchInput: {
    padding: 0,
    flex: 1,
    fontSize: sizes.f2,
  },
  listContainer: {
    marginTop: px2dp(10),
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors['1104'],
  },
  imgView: {
    width: px2dp(260),
    height: px2dp(260),
  },
  productImg: {
    flex: 1,
  },
  productInfo: {
    paddingBottom: px2dp(32),
    justifyContent: 'space-between',
  },
  productNameView: {
    height: px2dp(40),
    justifyContent: 'center',
    marginTop: px2dp(16),
  },
  productName: {
    fontSize: sizes.f2,
    color: colors['1101'],
    fontWeight: 'bold',
  },
  productTagView: {
    marginTop: px2dp(16),
    justifyContent: 'center',
  },
  tagText: {
    fontSize: sizes.f0,
    color: colors['1101'],
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastedPriceText: {
    fontSize: sizes.f4,
    color: colors['1001'],
    fontWeight: 'bold',
  },
  lastedPriceTagView: {
    paddingLeft: px2dp(8),
    paddingRight: px2dp(8),
    marginLeft: px2dp(20),
    borderRadius: px2dp(4),
    backgroundColor: colors['1001'],
  },
  lastedPriceTagText: {
    fontSize: sizes.f0,
    color: colors.white,
  },
  searchText: {
    color: colors.white,
    fontSize: px2dp(30),
  },
});
