import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

import noop from '../../../utils/noop';
import styles from './style';

export default class Skipinput extends Component {
  static defaultProps = {
    title: '',
    skipTo: noop,
    value: '',
  };

  constructor(props) {
    super(props);

    this.skipTo = this.skipTo.bind(this);
  }

  skipTo() {
    this.props.skipTo();
  }

  render() {
    const { value, title } = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.skipTo}>
        <View style={styles.inputRectangle}>
          <View style={[styles.inputContent, styles.inputTitle]}>
            <Text
              style={
                value === '' ? styles.inputTileText : styles.inputValueText
              }
            >
              {value || title}
            </Text>
          </View>
          <View style={[styles.inputContent, styles.inputRight]}>
            <Text style={styles.inputRightText}>&gt;</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Skipinput.propTypes = {
  skipTo: PropTypes.func,
  title: PropTypes.string,
  value: PropTypes.string,
};
