import { StyleSheet } from 'react-native';

import { colors, sizes } from 'futures/components/themes';
import { px2dp } from 'futures/utils/px2dp';
import { px2sp } from 'futures/utils/px2sp';

const { f1, f2 } = sizes;
const { white } = colors;

export default StyleSheet.create({
  container: {
    marginLeft: px2dp(32),
    marginRight: px2dp(32),
  },
  time: {
    fontSize: f1,
    height: px2dp(48),
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  image: {
    height: px2dp(90),
    width: px2dp(90),
  },
  contentContainer: {
    marginLeft: px2dp(16),
    flex: 1,
    flexDirection: 'row',
  },
  trangle: {
    width: 0,
    height: 0,
    borderTopWidth: px2dp(14),
    borderTopColor: 'transparent',
    borderRightWidth: px2dp(14),
    borderRightColor: white,
    borderLeftColor: 'transparent',
    borderBottomWidth: px2dp(14),
    borderBottomColor: 'transparent',
    marginTop: px2dp(18),
    zIndex: 999,
  },
  trangleBg: {
    width: 0,
    height: 0,
    borderTopWidth: px2dp(16),
    borderTopColor: 'transparent',
    borderRightWidth: px2dp(16),
    borderRightColor: colors[1104],
    borderLeftColor: 'transparent',
    borderBottomWidth: px2dp(16),
    borderBottomColor: 'transparent',
    marginTop: px2dp(16),
    position: 'absolute',
    left: px2dp(-2),
  },
  textContainer: {
    marginLeft: px2dp(-2),
    backgroundColor: white,
    padding: px2dp(20),
    borderRadius: px2dp(8),
    borderColor: colors[1104],
    borderWidth: px2dp(2),
    minHeight: px2dp(68),
  },
  text: {
    fontSize: f2,
    color: colors[1101],
    lineHeight: px2sp(48),
  },
});
