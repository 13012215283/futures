import { StyleSheet } from 'react-native';
import { colors, sizes } from '../themes';
import { px2dp } from '../../utils/px2dp';

const style = StyleSheet.create({
  text: {
    color: colors[1102],
    fontSize: sizes.f2,
    marginBottom: px2dp(29.8),
  },
  surplusText: {
    marginTop: px2dp(31.2),
  },
});

export default style;
