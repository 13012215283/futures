import React from 'react';
import { Text, TouchableOpacity, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';

const Tab = ({
  text,
  event,
  isActive,
  selectedTabStyle,
  selectedTextStyle,
  defaultTextStyle,
}) => (
  <TouchableOpacity
    style={[
      styles.iconView,
      isActive ? [styles.selectedWrapperStyle, selectedTabStyle] : {},
    ]}
    onPress={event}
  >
    <Text
      style={[
        styles.title,
        defaultTextStyle,
        isActive ? [styles.selectedTextStyle, selectedTextStyle] : {},
      ]}
    >
      {text}
    </Text>
  </TouchableOpacity>
);

export default Tab;

/* eslint-disable react/no-typos */
Tab.propTypes = {
  text: PropTypes.string.isRequired,
  event: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  selectedTabStyle: ViewPropTypes.style,
  selectedTextStyle: Text.propTypes.style,
  defaultTextStyle: Text.propTypes.style,
};

Tab.defaultProps = {
  selectedTabStyle: {},
  selectedTextStyle: {},
  defaultTextStyle: {},
};
