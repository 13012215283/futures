import { StyleSheet } from 'react-native';
import { px2dp } from 'futures/utils/px2dp';

import colors from 'futures/components/themes/colors';

const style = StyleSheet.create({
  positionInfo: {
    paddingRight: px2dp(15),
    paddingLeft: px2dp(15),
    paddingTop: px2dp(9),
    paddingBottom: px2dp(9),
    backgroundColor: colors[1105],
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    borderColor: colors[1104],
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default style;
