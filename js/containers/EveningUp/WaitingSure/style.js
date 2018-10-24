import { StyleSheet, Dimensions } from 'react-native';
import { px2dp } from 'futures/utils/px2dp';
import { colors, sizes } from 'futures/components/themes';

const { white, black } = colors;
const { f2 } = sizes;

const style = StyleSheet.create({
  container: {
    backgroundColor: colors[1105],
    paddingLeft: px2dp(32),
    paddingRight: px2dp(32),
    paddingTop: px2dp(60),
    height: Dimensions.get('window').height,
  },
  totalList: {
    backgroundColor: white,
    width: '100%',
    paddingLeft: px2dp(28),
    paddingRight: px2dp(28),
    flexDirection: 'column',
  },
  inputOperation: {
    marginTop: px2dp(32),
  },
  headerStyle: {
    height: px2dp(99),
    borderBottomWidth: px2dp(1),
    borderBottomColor: colors[1104],
  },
  headerFont: {
    fontSize: f2,
  },
  containerStyle: {
    height: px2dp(88),
  },
  redText: {
    color: colors[1001],
  },
  greenText: {
    color: colors[1002],
  },
  blackText: {
    color: black,
  },
  sureBtn: {
    height: px2dp(96),
    marginTop: px2dp(16),
  },
});

export default style;
