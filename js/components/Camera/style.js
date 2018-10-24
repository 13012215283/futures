import { StyleSheet } from 'react-native';

import { colors } from 'futures/components/themes';
import { px2dp } from 'futures/utils/px2dp';
import { alpha } from 'futures/utils/color';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  optionSize: {
    width: px2dp(125),
    height: px2dp(125),
    borderRadius: px2dp(65),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: alpha(colors.black, 0.2),
  },
  switch: {
    width: px2dp(150),
    height: px2dp(150),
    borderRadius: px2dp(75),
    backgroundColor: colors.white,
    borderWidth: 5,
    borderColor: colors[1103],
  },
  opIconText: {
    fontFamily: 'iconfont',
    color: colors.white,
    fontSize: 60,
  },
  takeIconText: {
    fontFamily: 'iconfont',
    color: colors.white,
    fontSize: 40,
  },
  opBar: {
    width: '100%',
    height: 100,
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    paddingLeft: px2dp(100),
    paddingRight: px2dp(100),
    alignItems: 'center',
  },
});
