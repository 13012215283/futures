import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';

import noop from 'futures/utils/noop';
import styles from '../style';

/**
 * 照完照片以后对图片的处理组件
 * @property dismissPhoto：抛弃图片方法
 * @property usePhoto：使用图片方法
 * @property path:图片
 */

export default class HandleImage extends Component {
  static defaultProps = {
    dismissPhoto: noop,
    usePhoto: noop,
    path: '',
  };

  constructor(props) {
    super(props);

    this.dismissPhoto = this.dismissPhoto.bind(this);
    this.usePhoto = this.usePhoto.bind(this);
  }

  dismissPhoto() {
    this.props.dismissPhoto();
  }

  usePhoto() {
    this.props.usePhoto();
  }

  render() {
    const { path } = this.props;
    return (
      <View style={styles.container}>
        <Image source={{ uri: path }} style={styles.camera} />
        <View style={[styles.opBar, { justifyContent: 'space-between' }]}>
          <TouchableOpacity
            style={[styles.optionSize]}
            onPress={this.props.dismissPhoto}
          >
            <Text style={[styles.opIconText]}>&#xe7f6;</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionSize]}
            onPress={this.props.usePhoto}
          >
            <Text style={[styles.opIconText]}>&#xe6d6;</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

HandleImage.propTypes = {
  dismissPhoto: PropTypes.func,
  usePhoto: PropTypes.func,
  path: PropTypes.string,
};
