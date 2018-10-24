import { StyleSheet } from 'react-native';

import { colors, sizes } from './../themes';
import { alpha } from '../../utils/color';
import { px2dp } from '../../utils/px2dp';

const headerTextColor = '#212121';
const textColorAnd = '#757575';

const style = StyleSheet.create({
  mask: {
    backgroundColor: alpha(colors.black, 0.4),
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogContainer: {
    backgroundColor: colors.white,
    marginLeft: px2dp(86),
    marginRight: px2dp(85),
    minWidth: px2dp(576),
    borderRadius: px2dp(6),
  },
  textContainer: {
    marginLeft: px2dp(48),
    marginTop: px2dp(48),
    marginRight: px2dp(53),
  },
  header: {
    fontSize: sizes.f4,
    color: headerTextColor,
    marginBottom: px2dp(48),
  },
  contentBox: {
    marginBottom: px2dp(32),
  },
  content: {
    fontSize: sizes.f2,
    color: textColorAnd,
    lineHeight: px2dp(48),
    marginBottom: px2dp(32),
  },
  activeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: px2dp(16),
    height: px2dp(96),
    alignItems: 'center',
  },
  touchable: {
    borderColor: colors[1104],
    alignItems: 'center',
    justifyContent: 'center',
    width: px2dp(160),
    height: px2dp(72),
    marginRight: px2dp(32),
  },
  activeText: {
    flex: 1,
    fontSize: sizes.f3,
    textAlign: 'right',
    textAlignVertical: 'center',
    color: colors[1001],
  },
  text0: {
    color: colors[1102],
  },
});

export default style;
