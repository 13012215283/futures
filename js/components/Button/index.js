import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View, ViewPropTypes } from 'react-native';
import * as styles from './styles';

class Button extends Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    return this.props.onPress || null;
  }

  render() {
    const {
      type,
      text,
      subStatus,
      disabled,
      containerStyle,
      textStyle,
    } = this.props;
    const style = styles[type];
    let tStyle = [style.text];
    let cStyle = [style.container, style[subStatus]];

    // 按钮分为三种状态，对应容器样式
    if (type === 'operation' || type === 'status') {
      tStyle = [style.text, style[`${subStatus}Text`]];
    }

    tStyle = tStyle.concat([textStyle]);
    cStyle = cStyle.concat([containerStyle]);
    return (
      <TouchableOpacity disabled={disabled} onPress={this.props.onPress}>
        <View style={[cStyle, { overflow: 'hidden' }]}>
          <Text style={tStyle}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  subStatus: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  containerStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
};

Button.defaultProps = {
  onPress() {},
  disabled: false,
  containerStyle: {},
  textStyle: {},
};

export default Button;
