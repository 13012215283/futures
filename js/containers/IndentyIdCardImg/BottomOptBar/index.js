import React, { Component } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Text,
  PanResponder,
} from 'react-native';
import PropType from 'prop-types';

import noop from 'futures/utils/noop';
import style from './style';

/**
 * 底部弹出操作框的内容显示
 * @property cancel：取消函数
 */

export default class BottomOptBar extends Component {
  static defaultProps = {
    cancel: noop,
    openCamera: noop,
    openGallery: noop,
  };

  constructor(props) {
    super(props);

    this.cancel = this.cancel.bind(this);
    this.openCamera = this.openCamera.bind(this);
    this.openGallery = this.openGallery.bind(this);
  }

  cancel() {
    this.props.cancel();
  }

  openCamera() {
    this.props.openCamera();
  }

  openGallery() {
    this.props.openGallery();
  }

  render() {
    return (
      <View>
        <TouchableWithoutFeedback onPress={this.openCamera}>
          <View style={[style.opLine, style.topRadius]}>
            <Text style={[style.optext, style.redtext]}>拍照</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.openGallery}>
          <View
            style={[style.opLine, style.opLineTopBorder, style.bottomRadius]}
          >
            <Text style={[style.optext, style.redtext]}>相册</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.cancel}>
          <View style={[style.cancel, style.opLine]}>
            <Text style={style.optext}>取消</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

BottomOptBar.propTypes = {
  cancel: PropType.func,
  openCamera: PanResponder.func,
  openGallery: PanResponder.func,
};
