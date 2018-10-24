import { StyleSheet } from 'react-native';

import { colors } from 'futures/components/themes';
import { px2dp } from 'futures/utils/px2dp';

export default StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: colors[1105],
    paddingTop: px2dp(32),
    paddingBottom: px2dp(32),
  },
  divider: {
    height: px2dp(32),
  },
});
