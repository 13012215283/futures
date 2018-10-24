import { StyleSheet } from 'react-native';
import { px2dp } from 'futures/utils/px2dp';
import { colors, sizes } from 'futures/components/themes';

const styles = StyleSheet.create({
  container: {
    width: px2dp(462),
    backgroundColor: colors.white,
    paddingLeft: px2dp(32),
    paddingRight: px2dp(32),
  },
  newPriceView: {
    marginTop: px2dp(16),
    height: px2dp(88),
    flexDirection: 'row',
    alignItems: 'center',
  },
  newPriceTitle: {
    fontSize: sizes.f3,
    fontWeight: 'bold',
    color: colors['1101'],
  },
  newPrice: {
    color: colors['1001'],
  },
  fillIn: {
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: px2dp(20),
  },
  inputFieldView: {
    height: px2dp(60),
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputFieldText: {
    fontSize: sizes.f2,
    color: colors['1102'],
  },
  stepperView: {
    height: px2dp(88),
    justifyContent: 'center',
  },
  tipsView: {
    padding: px2dp(10),
  },
  tips: {
    fontFamily: 'iconfont',
  },
  inputContainer: {
    paddingBottom: px2dp(16),
    borderBottomWidth: 1,
    borderBottomColor: colors['1104'],
  },
  margin: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: px2dp(60),
    marginTop: px2dp(16),
  },
  marginText: {
    fontSize: sizes.f2,
    color: colors['1101'],
    fontWeight: 'bold',
  },
});

export default styles;
