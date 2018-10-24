import { StyleSheet } from 'react-native';

import { colors } from 'futures/components/themes';
import { px2dp } from 'futures/utils/px2dp';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors[1105],
  },
  btnPosition: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  btnContaier: {
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 0,
  },
  list: {
    marginBottom: px2dp(96),
  },
});

export default style;
