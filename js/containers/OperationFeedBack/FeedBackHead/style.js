import { StyleSheet } from 'react-native';
import { px2dp } from 'futures/utils/px2dp';
import { px2sp } from 'futures/utils/px2sp';

import colors from 'futures/components/themes/colors';
import sizes from 'futures/components/themes/sizes';

const { black } = colors;
const { f5 } = sizes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors[1005],
    paddingLeft: px2dp(32),
    paddingRight: px2dp(32),
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    height: px2dp(168),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconfont: {
    fontSize: px2sp(44),
    fontFamily: 'iconfont',
    color: colors[1001],
  },
  title: {
    color: black,
    fontSize: f5,
    marginLeft: px2dp(21),
  },
});

export default styles;
