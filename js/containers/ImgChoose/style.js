import { StyleSheet, Dimensions } from 'react-native';
import { px2dp } from 'futures/utils/px2dp';
import { alpha } from 'futures/utils/color';
import { colors, sizes } from 'futures/components/themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('window').height,
    backgroundColor: alpha(colors.black, 0.7),
  },
  image: {
    width: px2dp(240),
    height: px2dp(240),
    marginTop: px2dp(5),
    marginLeft: px2dp(5),
    marginRight: px2dp(5),
    marginBottom: px2dp(5),
  },
  noPicText: {
    color: colors.white,
    fontSize: sizes.f5,
  },
  noPic: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: alpha(colors.black, 0.7),
  },
  ImgScroll: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
