import { StyleSheet } from 'react-native';

import { px2dp } from 'futures/utils/px2dp';
import { colors, sizes } from 'futures/components/themes';

const { f3 } = sizes;

export default StyleSheet.create({
  line: {
    height: px2dp(88),
    paddingTop: px2dp(8),
    backgroundColor: colors.white,
  },
  inlineContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: px2dp(32),
    marginRight: px2dp(32),
    paddingBottom: px2dp(8),
    borderBottomWidth: px2dp(2),
    borderColor: colors[1104],
  },
  label: {
    fontSize: f3,
    color: colors[1102],
    padding: 0,
    width: px2dp(160),
  },
  input: {
    fontSize: f3,
    color: colors[1101],
    flex: 1,
    padding: 0,
  },
});
