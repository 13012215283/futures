import { StyleSheet } from 'react-native';
import { px2dp } from 'futures/utils/px2dp';

const style = StyleSheet.create({
  btnArea: {
    paddingTop: px2dp(20),
    paddingBottom: px2dp(20),
    paddingLeft: px2dp(16),
    paddingRight: px2dp(16),
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default style;
