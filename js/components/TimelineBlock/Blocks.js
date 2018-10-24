import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { px2dp } from 'futures/utils/px2dp';

import PropTypes from 'prop-types';

import { colors, sizes } from '../themes/index';

export function Block({ title, isDone, children, desc }) {
  return (
    <View style={styles.blockContainer}>
      <Text
        style={[styles.title, { color: isDone ? colors[1001] : colors[1101] }]}
      >
        {title}
      </Text>
      <Text>{desc}</Text>
      <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
        {React.Children.map(children, child => child)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  clickable: {
    color: colors[1004],
  },
  blockContainer: {
    width: px2dp(554),
    padding: px2dp(17),
    marginBottom: px2dp(48),
    justifyContent: 'flex-end',
    borderWidth: px2dp(1),
    borderRadius: px2dp(8),
    borderColor: colors[1103],
    backgroundColor: colors.white,
  },
  title: {
    fontSize: sizes.f2,
  },
});

Block.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  desc: PropTypes.string.isRequired,
  isDone: PropTypes.bool, // 是否完成交割
};

Block.defaultProps = {
  children: null,
  isDone: false,
  title: '',
};
