import { StyleSheet } from 'react-native';
import { px2dp } from 'futures/utils/px2dp';

import colors from 'futures/components/themes/colors';
import sizes from 'futures/components/themes/sizes';

const { f3 } = sizes;

const style = StyleSheet.create({
  positionBlockHeader: {
    paddingLeft: px2dp(16),
    paddingRight: px2dp(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pBloHeadText: {
    height: px2dp(88),
    justifyContent: 'center',
  },
  headFont: {
    fontSize: f3,
    width: px2dp(497),
    color: colors['1101'],
  },
});

export default style;
