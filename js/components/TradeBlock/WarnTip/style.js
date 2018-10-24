import { StyleSheet } from 'react-native';
import { px2dp } from 'futures/utils/px2dp';

import colors from 'futures/components/themes/colors';
import sizes from 'futures/components/themes/sizes';
import { alpha } from 'futures/utils/color';

const { f1 } = sizes;
const WARNTIPCOLOR = '#F7A35C';

const style = StyleSheet.create({
  borderStyle: {
    borderWidth: 1,
    borderColor: WARNTIPCOLOR,
    backgroundColor: alpha(WARNTIPCOLOR, 0.1),
  },
  WarnTip: {
    width: '100%',
    paddingLeft: px2dp(16),
    paddingRight: px2dp(16),
    paddingTop: px2dp(24),
    paddingBottom: px2dp(24),
  },
  WarnTipText: {
    color: colors[1102],
    fontSize: f1,
    lineHeight: px2dp(40),
  },
});

export default style;
