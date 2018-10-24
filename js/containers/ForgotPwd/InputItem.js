import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { colors } from '../../components/themes';
import inputStyle from './InputItem.style';

const styles = StyleSheet.create(inputStyle);

// @flow
type Props = {
  leftText: string,
  rightComponent?: any,
  placeholder?: string,
  style?: Object,
  inputParams?: Object,
  onChange: Function,
};

export default class InputItem extends Component<Props> {
  static defaultProps = {
    inputParams: {},
  };

  onChange = event => {
    this.value = event.nativeEvent.text;
    if (this.props.onChange) {
      this.props.onChange(event.nativeEvent.text);
    }
  };

  getValue = () => this.value;

  render() {
    return (
      <View style={[styles.inputItem, this.props.style]}>
        <View style={styles.textView}>
          <Text style={styles.inputItemText}>{this.props.leftText}</Text>
        </View>
        <TextInput
          ref={input => {
            this.input = input;
          }}
          underlineColorAndroid="transparent"
          placeholderTextColor="#BDBDBD"
          style={styles.inputItemInput}
          selectionColor={colors['1001']}
          onChange={this.onChange}
          {...this.props.inputParams}
        />
        {this.props.rightComponent ? this.props.rightComponent : null}
      </View>
    );
  }
}
