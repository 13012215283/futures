import { StyleSheet } from 'react-native';
import colors from '../themes/colors';
import { px2dp } from '../../utils/px2dp';

export default {
  input: {
    width: px2dp(250),
    height: px2dp(60),
    borderWidth: StyleSheet.hairlineWidth,
    padding: 0,
    borderColor: colors['1103'],
    fontSize: px2dp(28),
    color: colors['1101'],
    textAlign: 'center',
  },
};
