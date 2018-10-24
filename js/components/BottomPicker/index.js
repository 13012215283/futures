import React, { Component } from 'react';
import { View, Animated, Dimensions, Modal } from 'react-native';
import PropTypes from 'prop-types';

import { px2dp } from 'futures/utils/px2dp';
import style from './style';

const DEVICEHEIGHT = Dimensions.get('window').height;

/**
 * 底部弹出框组件
 * @property pickerStyle：底部弹出框组件的样式
 */

export default class Bottompicker extends Component {
  static defaultProps = {
    pickerStyle: style.picker,
    children: <View />,
  };

  constructor(props) {
    super(props);

    this.state = {
      transferAnim: new Animated.Value(DEVICEHEIGHT),
      visible: false,
    };

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  componentDidMount() {}

  show() {
    this.setState({ visible: true });

    Animated.timing(this.state.transferAnim, {
      toValue: DEVICEHEIGHT - px2dp(380),
      duration: 400,
    }).start(() => {
      this.setState({
        transferAnim: new Animated.Value(DEVICEHEIGHT - px2dp(380)),
      });
    });
  }

  hide() {
    Animated.timing(this.state.transferAnim, {
      toValue: DEVICEHEIGHT,
      duration: 400,
    }).start(() => {
      this.setState({
        transferAnim: new Animated.Value(DEVICEHEIGHT),
        visible: false,
      });
    });
  }

  render() {
    const { transferAnim, visible } = this.state;
    const { pickerStyle } = this.props;

    return (
      <Modal visible={visible} animationType="none" transparent>
        <View style={[style.bottomPicker]}>
          <Animated.View
            style={[pickerStyle, { transform: [{ translateY: transferAnim }] }]}
          >
            {this.props.children}
          </Animated.View>
        </View>
      </Modal>
    );
  }
}

Bottompicker.propTypes = {
  pickerStyle: PropTypes.objectOf(PropTypes.object),
  children: PropTypes.element,
};
