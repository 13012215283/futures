import { StyleSheet } from 'react-native';

import { colors, sizes } from 'futures/components/themes';
import { px2dp } from 'futures/utils/px2dp';

export default StyleSheet.create({
  opLine: {
    height: px2dp(94),
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  opLineTopBorder: {
    borderTopWidth: 1,
    borderColor: colors['1104'],
  },
  optext: {
    fontSize: sizes.f3,
  },
  redtext: {
    color: colors[1001],
  },
  cancel: {
    marginTop: px2dp(16),
    marginBottom: px2dp(32),
    borderRadius: 5,
  },
  topRadius: {
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  bottomRadius: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
});
