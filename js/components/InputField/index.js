import React, { Component } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import InputFieldStyle from './inputField.style';

// @flow

const InputFieldStyles = StyleSheet.create(InputFieldStyle);
const noop = () => {};
type Props = {
  type: string,
  inputStyle?: Object,
  onChange: Function,
  onBlur: Function,
  keyboardType: string,
};

type State = {
  text: string,
};
export default class InputField extends Component<Props, State> {
  static defaultProps = {
    type: 'text',
    inputStyle: {},
    onChange: noop,
    onBlur: noop,
    keyboardType: 'numeric',
  };

  onChange(text) {
    const { onChange } = this.props;

    if (onChange) {
      onChange(text);
    }
  }

  render() {
    const { inputStyle } = this.props;
    return (
      <TextInput
        {...this.props}
        underlineColorAndroid="transparent"
        onChange={e => {
          this.onChange(e.nativeEvent.text);
        }}
        style={[InputFieldStyles.input, inputStyle]}
        placeholder="请输入"
      />
    );
  }
}
