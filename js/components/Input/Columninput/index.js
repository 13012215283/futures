import React, { Component } from 'react';
import { View, TextInput, DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';

import styles from './style';
import { colors } from '../../themes';

export default class Columninput extends Component {
  static defaultProps = {
    placeholder: '请输入值',
  };

  constructor(props) {
    super(props);

    this.state = {
      text: '',
    };

    this.changeText = this.changeText.bind(this);
    this.getValue = this.getValue.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange = () => {
    DeviceEventEmitter.emit('inputTextIsNull');
  };

  getValue = () => this.state.text;

  changeText(text) {
    this.setState({ text });
  }

  render() {
    const { placeholder } = this.props;

    return (
      <View style={styles.inputRectangle}>
        <TextInput
          style={styles.inputValue}
          underlineColorAndroid="transparent"
          placeholder={placeholder}
          placeholderTextColor={colors['1103']}
          onChangeText={this.changeText}
          onChange={this.onChange}
        />
      </View>
    );
  }
}

Columninput.propTypes = {
  placeholder: PropTypes.string,
};
