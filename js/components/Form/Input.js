import React from 'react';
import PropTypes from 'prop-types';

import { Text, TextInput, View, StyleSheet } from 'react-native';
import { px2dp } from '../../utils/px2dp';
import noop from '../../utils/noop';

import { colors, sizes } from '../../components/themes';

const Input = ({
  label,
  placeholder,
  val,
  children,
  onChangeText,
  ...props
}) => (
  <View style={styles.containerStyle}>
    <View style={[{ justifyContent: 'center' }, styles.labelWrapperStyle]}>
      <Text style={[styles.labelText, { justifyContent: 'space-between' }]}>
        {label}
      </Text>
    </View>
    <View style={[{ flex: 1, justifyContent: 'center' }]}>
      <TextInput
        style={{ fontSize: sizes.f2 }}
        underlineColorAndroid="transparent"
        placeholder={placeholder}
        placeholderTextColor={colors[1102]}
        onChangeText={onChangeText}
        {...props}
      />
    </View>
    {React.Children.map(children, child => (
      <View style={styles.center}>{child}</View>
    ))}
  </View>
);

Input.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  val: PropTypes.string,
  children: PropTypes.node,
  onChangeText: PropTypes.func,
};

Input.defaultProps = {
  children: null,
  val: '',
  onChangeText: noop,
};

export default Input;

const styles = StyleSheet.create({
  center: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  containerStyle: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors[1104],
    height: px2dp(104),
  },
  labelWrapperStyle: {
    width: px2dp(88),
  },
  labelText: {
    color: colors[1101],
    fontSize: sizes.f2,
    textAlign: 'justify',
  },
});
