import { StyleSheet } from 'react-native';
import { px2dp } from 'futures/utils/px2dp';

import colors from 'futures/components/themes/colors';

const { white } = colors;

const styles = StyleSheet.create({
  positionBlock: {
    backgroundColor: white,
    flexDirection: 'column',
    paddingLeft: px2dp(16),
    paddingRight: px2dp(16),
  },
  redTex: {
    color: colors[1001],
  },
  greenText: {
    color: colors[1002],
  },
});

export default styles;
