import { StyleSheet } from 'react-native';
import { colors } from '../../components/themes';
import { px2dp } from '../../utils/px2dp';
import { px2sp } from '../../utils/px2sp';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  divideLine: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors[1104],
  },
  list: {
    paddingLeft: px2dp(32),
    paddingRight: px2dp(32),
  },
  icon: {
    fontFamily: 'iconfont',
    color: colors.white,
    fontSize: px2sp(44),
  },
});

export default style;
