import { StyleSheet } from 'react-native';
import { px2dp } from 'futures/utils/px2dp';

import { colors, sizes } from 'futures/components/themes';

const { white, black } = colors;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors[1005],
    marginTop: px2dp(20),
  },
  toastContainer: {
    backgroundColor: black,
    alignItems: 'center',
  },
  toastText: {
    color: white,
    fontSize: sizes.f1,
  },
});

export default styles;
