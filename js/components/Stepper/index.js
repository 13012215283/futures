import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Text, StyleSheet } from 'react-native';
import equal from 'fast-deep-equal';

import { formatVal } from '../../utils/numberFormat';
import InputField from '../InputField';
import style from './Stepper.style';

const styles = StyleSheet.create(style);
const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 2 ** 53 - 1;

// @flow
type Props = {
  step?: number | string,
  min?: number,
  max?: number,
  value?: string,
  originalValue?: string,
  inputViewStyle?: Object,
  inputItemStyle?: Object,
  onChange?: Function,
  onEndEditing?: Function,
  editable?: boolean,
};

export default class Stepper extends Component<Props> {
  static defaultProps = {
    step: 0.01,
    max: MAX_SAFE_INTEGER,
    min: -MAX_SAFE_INTEGER,
    inputViewStyle: {},
    editable: true,
  };

  /* 数字精度 */
  static getPrecision(num) {
    const numStr = num.toString();
    let precision = 0;
    if (numStr.indexOf('.') >= 0) {
      precision = numStr.length - numStr.indexOf('.') - 1;
    }
    return precision;
  }

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      max: props.max,
      min: props.min,
      isWarning: false,
      editable: !!props.editable,
    };
    this.onChange = this.onChange.bind(this);
    this.stepDown = this.stepDown.bind(this);
    this.stepUp = this.stepUp.bind(this);
    this.onEndEditing = this.onEndEditing.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  // componentDidMount() {
  //   Keyboard.addListener('keyboardDidHide', () => {
  //     const { value } = this.state;
  //     const { max, min } = this.props;
  //     this.setState({
  //       isWarning: !(value <= max && value >= min),
  //     });
  //   });
  // }

  componentWillReceiveProps(nextProps) {
    this.setState({
      max: nextProps.max,
      min: nextProps.min,
      editable: nextProps.editable || true,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !equal(nextState, this.state);
  }

  onChange(value) {
    const toValue = formatVal(value, ',');
    const { onChange, max } = this.props;
    this.checkInput(toValue);
    this.setState({
      value: `${Number(toValue) > Number(max) ? max : toValue}`,
    });

    if (onChange) {
      onChange(toValue);
    }
  }

  onEndEditing(e) {
    const { text } = e.nativeEvent;
    const { max, min, onEndEditing } = this.props;
    this.setState({
      isWarning: !(text < max && text > min),
    });

    if (onEndEditing) {
      onEndEditing(text);
    }
  }

  getValue() {
    return this.state.value;
  }

  setValue(value, callback = () => {}) {
    this.setState(
      {
        value,
      },
      callback
    );
  }

  checkInput(value) {
    const { min } = this.props;
    this.setState({
      isWarning: !(value >= min),
    });
  }

  computeValue(action: 'up' | 'down') {
    const direct = action === 'up' ? 1 : -1;
    const { step, originalValue } = this.props;
    const { value } = this.state;
    const precision = Stepper.getPrecision(step);

    const parseVal = Number(value);
    const parseStep = Number(step);
    const parseOriginalPrice = Number(originalValue);
    const reminder = Math.abs(parseOriginalPrice - value) % parseStep;
    let result;
    const closedValue =
      (parseOriginalPrice - parseVal) * direct > 0
        ? direct * reminder
        : direct * (10 - reminder);

    if (originalValue && !Number.isNaN(parseOriginalPrice) && reminder !== 0) {
      result = (parseVal + closedValue).toFixed(precision);
    } else {
      result = (parseVal + direct * parseStep).toFixed(precision);
    }
    this.onChange(result);
  }

  stepDown() {
    if (this.state.value > this.props.min) {
      this.computeValue('down');
    }
  }

  stepUp() {
    if (this.state.value < this.props.max) {
      this.computeValue('up');
    }
  }

  render() {
    const value = +this.state.value;
    const { isWarning, max, min, editable } = this.state;
    const { inputViewStyle, inputItemStyle } = this.props;
    let upDisabledStyle = null;
    let downDisabledStyle = null;
    let upDisabledTextStyle = null;
    let downDisabledTextStyle = null;
    if (value >= max || !editable) {
      upDisabledStyle = style.disabledButton;
      upDisabledTextStyle = style.disabledText;
    }
    if (value <= min || !editable) {
      downDisabledStyle = style.disabledButton;
      downDisabledTextStyle = style.disabledText;
    }

    return (
      <View style={style.stepWrap}>
        <TouchableWithoutFeedback onPressIn={this.stepDown}>
          <View style={[styles.stepButton, downDisabledStyle]}>
            <Text style={[styles.stepText, downDisabledTextStyle]}>-</Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={[styles.inputItem, inputViewStyle]}>
          <InputField
            type="money"
            value={this.state.value}
            onChange={this.onChange}
            thousandSeparator=","
            inputStyle={isWarning ? styles.warningInput : inputItemStyle}
            editable={editable}
            // onEndEditing={this.onEndEditing}
          />
        </View>
        <TouchableWithoutFeedback onPressIn={this.stepUp}>
          <View style={[styles.stepButton, upDisabledStyle]}>
            <Text style={[styles.stepText, upDisabledTextStyle]}>+</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
