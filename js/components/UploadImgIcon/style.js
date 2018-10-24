import { StyleSheet } from 'react-native';

import { colors, sizes } from 'futures/components/themes';
import { px2dp } from 'futures/utils/px2dp';
import { alpha } from 'futures/utils/color';

export default StyleSheet.create({
  IdentyImg: {
    flexDirection: 'column',
    position: 'relative',
  },
  bgIcon: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderColor: colors['1104'],
    borderRadius: 10,
  },
  textLine: {
    marginTop: px2dp(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tip: {
    color: colors['1102'],
    fontSize: sizes.f1,
  },
  optIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: alpha('black', 0.2),
    position: 'absolute',
  },
  border: {
    borderWidth: 1,
    borderColor: colors.black,
  },
  opIconText: {
    fontFamily: 'iconfont',
    color: colors.white,
  },
  opSize: {
    fontSize: sizes.f5,
  },
});
