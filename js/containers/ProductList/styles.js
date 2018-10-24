import { StyleSheet } from 'react-native';

import { px2dp } from 'futures/utils/px2dp';
import { colors, sizes } from 'futures/components/themes';

export default StyleSheet.create({
  container: {},
  listContainer: {},
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
});
