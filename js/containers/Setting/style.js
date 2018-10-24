import { StyleSheet } from 'react-native';
import { colors, sizes } from 'futures/components/themes';
import { px2dp } from 'futures/utils/px2dp';
import { px2sp } from 'futures/utils/px2sp';

const { white } = colors;
const { f3 } = sizes;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors[1105],
    position: 'relative',
  },
  itemContainer: {
    backgroundColor: white,
    marginTop: px2dp(20),
    height: px2dp(104),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: px2dp(32),
    paddingRight: px2dp(32),
  },
  text: {
    fontSize: f3,
    color: colors[1101],
  },
  icon: {
    fontFamily: 'iconfont',
    fontSize: px2sp(32),
    color: colors[1103],
  },
  btnPosition: {
    position: 'absolute',
    bottom: px2dp(64),
    width: '100%',
  },
});

export default style;
