import { StyleSheet } from 'react-native';
import { px2dp } from 'futures/utils/px2dp';
import { colors, sizes } from 'futures/components/themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  productAreaTitle: {
    height: px2dp(90),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  productAreaTitleImg: {
    width: px2dp(220),
    height: px2dp(30),
  },
  categoryContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    flexWrap: 'wrap',
  },
  categoryView: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors['1105'],
    width: '25%',
    paddingBottom: px2dp(20),
  },
  imgView: {
    width: '100%',
    height: px2dp(187),
  },
  categoryImg: {
    width: '100%',
    height: '100%',
  },
  categoryName: {
    textAlign: 'center',
    color: colors.black,
    fontSize: sizes.f0,
  },
  textView: {
    justifyContent: 'center',
    height: px2dp(32),
  },
});
