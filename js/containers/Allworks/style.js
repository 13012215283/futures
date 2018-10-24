import { StyleSheet } from 'react-native';
import { px2dp } from 'futures/utils/px2dp';

import { colors, sizes } from 'futures/components/themes';

const { white, black } = colors;

export const styles = StyleSheet.create({
  tabBarStyle: {
    height: px2dp(88),
    backgroundColor: white,
    marginTop: 0,
  },
  labelStyle: {
    fontSize: sizes.f2,
  },
  indicatorStyle: {
    backgroundColor: colors[1001],
    height: 3,
  },
});

export const activeTintColor = colors[1001];

export const inactiveTintColor = black;
