import { StyleSheet } from 'react-native';
import { colors } from 'futures/components/themes';
import { px2dp } from 'futures/utils/px2dp';

const styles = StyleSheet.create({
  listBlock: {
    width: '100%',
  },
  listBlockTitle: {
    height: px2dp(44),
    backgroundColor: colors[1105],
    justifyContent: 'center',
    paddingLeft: 20,
  },
});

export default styles;
