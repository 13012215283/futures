import { StyleSheet } from 'react-native';
import { colors } from 'futures/components/themes';
import { px2dp } from 'futures/utils/px2dp';

const styles = StyleSheet.create({
  listItem: {
    width: '100%',
    height: px2dp(88),
    paddingLeft: 20,
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  botomBorder: {
    borderBottomColor: colors['1104'],
    borderBottomWidth: 1,
  },
});

export default styles;
