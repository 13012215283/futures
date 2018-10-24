import { StyleSheet } from 'react-native';
import { colors, sizes } from 'futures/components/themes';
import { px2dp } from 'futures/utils/px2dp';

export default StyleSheet.create({
  swiper: {
    marginTop: 0,
    height: px2dp(750),
  },

  swiperImage: {
    flex: 1,
  },

  pagination: {
    position: 'absolute',
    width: px2dp(80),
    height: px2dp(40),
    borderRadius: px2dp(20),
    bottom: px2dp(20),
    right: px2dp(20),
    alignItems: 'center',
    backgroundColor: colors['1102'],
    opacity: 0.5,
  },

  paginationText: {
    flex: 1,
    lineHeight: px2dp(40),
    fontSize: sizes.f2,
    color: colors.white,
    fontWeight: 'bold',
  },
});
