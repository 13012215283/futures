import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput } from 'react-native';

import { colors } from 'futures/components/themes';

import style from './style';

const Input = ({ label, children, ...props }) => (
  <View style={style.line}>
    <View style={style.inlineContainer}>
      <Text style={style.label}>{label}</Text>
      <TextInput
        style={style.input}
        underlineColorAndroid="transparent"
        selectionColor={colors[1001]}
        {...props}
      />
      {children}
    </View>
  </View>
);

Input.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.element,
};

Input.defaultProps = {
  children: null,
};

export default Input;
