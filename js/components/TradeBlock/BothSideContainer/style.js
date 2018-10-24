import { StyleSheet } from 'react-native';
import { px2dp } from 'futures/utils/px2dp';

const style = StyleSheet.create({
  bothSideContainer: {
    width: '100%',
    height: px2dp(52),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: px2dp(16),
    paddingRight: px2dp(10),
  },
});

export default style;
