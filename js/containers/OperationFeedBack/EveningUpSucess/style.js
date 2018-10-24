import { StyleSheet } from 'react-native';
import { px2dp } from 'futures/utils/px2dp';

import colors from 'futures/components/themes/colors';
import sizes from 'futures/components/themes/sizes';

const { white } = colors;
const { f2 } = sizes;

const styles = StyleSheet.create({
  headerStyle: {
    height: px2dp(99),
    borderBottomWidth: px2dp(1),
    borderBottomColor: colors[1104],
  },
  headerFont: {
    fontSize: f2,
  },
  body: {
    width: '100%',
    backgroundColor: white,
    paddingRight: px2dp(32),
    paddingLeft: px2dp(32),
  },
  containerStyle: {
    height: px2dp(88),
  },
  sureBtn: {
    width: px2dp(622),
  },
  redText: {
    color: colors['1001'],
  },
  greenText: {
    color: colors['1002'],
  },
});

export default styles;
