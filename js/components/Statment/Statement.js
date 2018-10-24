import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { colors, sizes } from '../themes/index';

import { px2dp } from '../../utils/px2dp';
import noop from '../../utils/noop';

const Statement = ({ isRead, children, onPress }) => (
  <View style={styles.container}>
    <TouchableOpacity style={{ marginRight: px2dp(5) }} onPress={onPress}>
      <Text
        style={{
          fontSize: px2dp(20),
          color: isRead ? colors[1004] : colors[1102],
          fontFamily: 'iconfont',
        }}
      >
        &#xe6d6;
      </Text>
    </TouchableOpacity>
    <View>
      <Text style={styles.stateText}>
        {React.Children.map(children, child => child)}
      </Text>
    </View>
  </View>
);

export default Statement;

const styles = StyleSheet.create({
  container: {
    marginTop: px2dp(14),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stateText: {
    textAlign: 'center',
    fontSize: sizes.f0,
  },
});

Statement.propTypes = {
  isRead: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func,
};

Statement.defaultProps = {
  isRead: true,
  onPress: noop,
};
