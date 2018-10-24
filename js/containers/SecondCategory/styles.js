import { StyleSheet } from 'react-native';

import { px2dp } from 'futures/utils/px2dp';
import { colors, sizes } from 'futures/components/themes';

export default StyleSheet.create({
  conatiner: {
    flex: 1,
  },
  categoryContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: colors.white,
  },
  productItem: {
    borderRightWidth: 1,
    borderRightColor: colors['1105'],
    borderBottomWidth: 1,
    borderBottomColor: colors['1105'],
    width: '33.3%',
    backgroundColor: colors.white,
  },
  productItemView: {},
  productItemNameView: {
    marginTop: px2dp(16),
    height: px2dp(32),
    justifyContent: 'center',
    paddingLeft: px2dp(32),
    paddingRight: px2dp(32),
  },
  productItemNameText: {
    fontSize: sizes.f2,
    fontWeight: 'bold',
    color: colors['1101'],
  },
  productItemDescView: {
    height: px2dp(20),
    justifyContent: 'center',
    marginTop: px2dp(8),
    paddingLeft: px2dp(32),
    paddingRight: px2dp(32),
  },
  productItemDescText: {
    fontSize: sizes.f0,
    fontWeight: 'bold',
    color: colors['1101'],
  },
  productItemImgView: {
    flex: 1,
    alignItems: 'center',
    marginTop: px2dp(8),
    marginBottom: px2dp(8),
  },
  productItemImg: {
    width: px2dp(198),
    height: px2dp(198),
  },
});
