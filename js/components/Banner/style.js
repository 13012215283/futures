import { StyleSheet } from 'react-native';
import { px2dp } from 'futures/utils/px2dp';
import { colors } from 'futures/components/themes';
import { alpha } from 'futures/utils/color';

const styles = StyleSheet.create({
  container: {
    height: px2dp(300),
  },
  bannerContainer: {},
  bannerImageView: {},
  bannerImage: {
    width: '100%',
    height: px2dp(300),
  },
  paginationStyle: {
    bottom: px2dp(20),
  },
  inactiveDotStyle: {
    backgroundColor: alpha(colors.white, 0.5),
  },
  activeDotStyle: {
    backgroundColor: colors.white,
  },
  dotStyle: {
    width: px2dp(10),
    height: px2dp(10),
    borderRadius: px2dp(5),
    marginRight: px2dp(10),
  },
});

export default styles;
