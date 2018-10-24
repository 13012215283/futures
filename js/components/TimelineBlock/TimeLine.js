import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';

import { px2dp } from '../../utils/px2dp';
import { colors, sizes } from '../themes';

export default class Timeline extends Component {
  render() {
    const { year, date, isDone, isShowTimelineBar } = this.props;
    return (
      <View style={styles.container}>
        <View style={[styles.timeWrapper, { flex: 1 }]}>
          <Text
            style={{
              fontSize: sizes.f1,
              color: !isDone ? colors[1101] : colors[1001],
            }}
          >
            {year}
          </Text>
          <Text
            style={{
              fontSize: sizes.f0,
              color: !isDone ? colors[1102] : colors[1001],
            }}
          >
            {date}
          </Text>
        </View>
        <View style={styles.barWrapper}>
          <View
            style={[
              isDone ? styles.bigRound : styles.round,
              { backgroundColor: !isDone ? colors[1103] : colors[1001] },
            ]}
          />
          <View
            style={[
              styles.bar,
              { backgroundColor: !isDone ? colors[1103] : colors[1001] },
              !isShowTimelineBar && styles.lastBar,
            ]}
          />
        </View>
      </View>
    );
  }
}

Timeline.propTypes = {
  year: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  isDone: PropTypes.bool,
  isShowTimelineBar: PropTypes.bool,
};

Timeline.defaultProps = {
  isDone: false,
  isShowTimelineBar: true,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: px2dp(85),
    flexDirection: 'row',
  },
  timeWrapper: {
    alignItems: 'center',
  },
  barWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigRound: {
    width: px2dp(24),
    height: px2dp(24),
    borderRadius: px2dp(24),
  },
  round: {
    width: px2dp(18),
    height: px2dp(18),
    borderRadius: px2dp(18),
    backgroundColor: colors[1103],
  },
  bar: {
    flex: 1,
    width: px2dp(2),
    backgroundColor: colors[1103],
  },
  lastBar: {
    opacity: 0,
  },
});
