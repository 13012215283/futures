import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import Camera from 'react-native-camera';

import noop from 'futures/utils/noop';
import styles from '../style';

/**
 * 相机开关组件
 * @property takePhoto:按下快门后的方法
 */

export default class TakeCamera extends Component {
  static defaultProps = {
    turnBack: noop,
    tokenPhotoCb: noop,
  };

  constructor(props) {
    super(props);

    this.state = {
      cameraBack: true, // true 后置  false前置
    };

    this.takePhoto = this.takePhoto.bind(this);
    this.turnBack = this.turnBack.bind(this);
    this.changeCamera = this.changeCamera.bind(this);
  }

  takePhoto() {
    const options = { jpegQuality: 50 };

    this.camera.capture(options).then(data => {
      this.props.tokenPhotoCb(data);
    });
  }

  turnBack() {
    this.props.turnBack();
  }

  changeCamera() {
    const type = !this.state.cameraBack;
    this.setState({ cameraBack: type });
  }

  render() {
    const cameraType = this.state.cameraBack
      ? Camera.constants.Type.back
      : Camera.constants.Type.front;

    return (
      <View style={styles.container}>
        <Camera
          ref={cam => {
            this.camera = cam;
          }}
          captureTarget={Camera.constants.CaptureTarget.temp}
          mirrorImage={false}
          captureQuality="medium"
          style={styles.camera}
          type={cameraType}
          aspect={Camera.constants.Aspect.fill}
        />
        <View style={[styles.opBar, { justifyContent: 'space-around' }]}>
          <TouchableOpacity style={[styles.optionSize]} onPress={this.turnBack}>
            <Text style={[styles.takeIconText]}>&#xe811;</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.takePhoto}>
            <View style={styles.switch} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionSize]}
            onPress={this.changeCamera}
          >
            <Text style={[styles.takeIconText]}>&#xe810;</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

TakeCamera.propTypes = {
  tokenPhotoCb: PropTypes.func,
  turnBack: PropTypes.func,
};
