import { StyleSheet } from 'react-native';

import { colors, sizes } from 'futures/components/themes';
import { px2dp } from 'futures/utils/px2dp';
import { alpha } from 'futures/utils/color';

export default StyleSheet.create({
  bottomPicker: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: alpha('black', 0.4),
    zIndex: 10,
    alignItems: 'center',
  },
  picker: {
    width: px2dp(686),
    position: 'absolute',
    height: px2dp(330),
  },
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
