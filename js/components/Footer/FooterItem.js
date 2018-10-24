import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';

import { colors, sizes } from '../themes';
import { px2dp } from '../../utils/px2dp';
import noop from '../../utils/noop';

export default function FooterItem({ text, onPress, type }) {
  return (
    <View>
      <Text
        style={type === 'separating' ? styles.separating : styles.footerText}
        onPress={onPress}
      >
        {text}
      </Text>
    </View>
  );
}

FooterItem.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  onPress: PropTypes.func,
};

FooterItem.defaultProps = {
  type: '',
  onPress: noop,
};

const styles = StyleSheet.create({
  footerText: {
    color: colors[1004],
    fontSize: sizes.f1,
  },
  separating: {
    margin: px2dp(32),
  },
});
