import { StyleSheet } from 'react-native';
import { colors, sizes } from 'futures/components/themes';
import { px2dp } from 'futures/utils/px2dp';

const { f2 } = sizes;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors[1105],
    position: 'relative',
  },
  info: {
    fontSize: f2,
    color: colors[1103],
    height: px2dp(40),
    marginTop: px2dp(8),
    marginLeft: px2dp(32),
  },
  btnPosition: {
    position: 'absolute',
    width: '100%',
    bottom: px2dp(64),
  },
  itemContainer: {
    height: px2dp(104),
    marginTop: px2dp(20),
    paddingLeft: px2dp(32),
    paddingRight: px2dp(32),
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 0,
    fontSize: f2,
  },
});
