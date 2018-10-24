import { StyleSheet } from 'react-native';
import { px2dp } from 'futures/utils/px2dp';

import colors from 'futures/components/themes/colors';
import sizes from 'futures/components/themes/sizes';

const { white } = colors;
const { f2, f3 } = sizes;

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
    paddingTop: px2dp(64),
    paddingBottom: px2dp(64),
    alignItems: 'center',
  },
  tip: {
    fontSize: f3,
    lineHeight: px2dp(48),
  },
  btnArea: {
    flexDirection: 'row',
    marginTop: px2dp(64),
  },
  btn: {
    width: px2dp(280),
    height: px2dp(96),
    marginLeft: px2dp(31),
    marginRight: px2dp(31),
  },
  bgWhite: {
    backgroundColor: white,
    borderColor: colors[1001],
    borderWidth: 1,
  },
  redFont: {
    color: colors[1001],
  },
});

export default styles;
