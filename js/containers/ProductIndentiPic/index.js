import React, { Component } from 'react';
import { View, DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';

import { Toast } from 'futures/components/Toast';
import errtips from 'futures/constants/errtips';
import { uploadPic } from 'futures/utils/uploadPic';
import { HandleImage, TakeCamera } from 'futures/components/Camera';

export default class CameraPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
    };

    this.emitEv = '';

    this.dismissPhoto = this.dismissPhoto.bind(this);
    this.tokenPhotoCb = this.tokenPhotoCb.bind(this);
    this.usePhoto = this.usePhoto.bind(this);
    this.turnBack = this.turnBack.bind(this);
  }

  componentWillMount() {
    DeviceEventEmitter.emit('hideBottomPicker');

    this.emitEv = this.props.navigation.state.params.emitEv;
  }

  /** 返回函数 */
  turnBack() {
    this.props.navigation.goBack();
  }

  tokenPhotoCb(data) {
    this.setState({
      data,
    });
  }

  dismissPhoto() {
    this.setState({ data: '' });
  }

  async usePhoto() {
    const { data } = this.state;

    try {
      const cloudPicData = await uploadPic(data.path);
      DeviceEventEmitter.emit(this.emitEv, cloudPicData);
      this.turnBack();
    } catch (err) {
      Toast.show(errtips[err.code], Toast.SHORT);
    }
  }

  render() {
    const { data } = this.state;
    return (
      <View style={{ backgroundColor: 'black', flex: 1 }}>
        {data === '' ? (
          <TakeCamera
            tokenPhotoCb={this.tokenPhotoCb}
            turnBack={this.turnBack}
          />
        ) : (
          <HandleImage
            path={data.path}
            dismissPhoto={this.dismissPhoto}
            usePhoto={this.usePhoto}
          />
        )}
      </View>
    );
  }
}

CameraPage.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.object).isRequired,
};
