import React, { Component } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Image,
  Text,
  DeviceEventEmitter,
} from 'react-native';
import PropTypes from 'prop-types';

import noop from 'futures/utils/noop';
import style from './style';

/**
 * 图片上传提示框
 * @property selfStyle:自定义属性样式
 * @property uri：背景图片
 * @property tip：提示文字
 * @property showPicOnpress: 点击展现图片时的操作
 */

export default class UploadImgIcon extends Component {
  static defaultProps = {
    selfStyle: { width: 200, height: 100 },
    tip: '',
    defaulturi: '',
    showPicOnpress: noop,
    opSize: style.opSize,
  };

  constructor(props) {
    super(props);

    this.state = {
      uri: this.props.defaulturi,
      showPic: false,
    };

    this.addPic = this.addPic.bind(this);
    this.deletePic = this.deletePic.bind(this);
    this.getPic = this.getPic.bind(this);
    this.showBottomPicker = this.showBottomPicker.bind(this);
  }
  /** 获取图片uri */
  getPic() {
    const { uri, showPic } = this.state;
    const pics = {
      uri,
      showPic,
    };
    return pics;
  }

  addPic(uri) {
    this.setState({
      uri,
      showPic: true,
    });
    DeviceEventEmitter.emit('picsIsNull');
  }

  deletePic() {
    this.setState({
      uri: this.props.defaulturi,
      showPic: false,
    });
  }

  /** 添加图片时弹出抽屉的操作 */
  showBottomPicker() {
    this.props.showPicOnpress();
  }

  render() {
    const { selfStyle, tip, opSize } = this.props;
    const { showPic, uri } = this.state;
    const opIconSize = Number(selfStyle.width) * 0.3;

    return (
      <View style={[style.IdentyImg, { width: selfStyle.width }]}>
        <Image
          style={[style.bgIcon, selfStyle]}
          source={{
            uri,
          }}
        />
        <View style={style.textLine}>
          <Text style={style.tip}>{tip}</Text>
        </View>
        <TouchableWithoutFeedback
          onPress={showPic ? this.deletePic : this.showBottomPicker}
        >
          <View
            style={[
              style.optIcon,
              {
                width: opIconSize,
                height: opIconSize,
                borderRadius: Math.ceil(opIconSize / 2),
                top: Math.ceil((selfStyle.height - opIconSize) / 2),
                left: Math.ceil((selfStyle.width - opIconSize) / 2),
              },
            ]}
          >
            {showPic ? (
              <Text style={[style.opIconText, opSize]}>&#xe804;</Text>
            ) : (
              <Text style={[style.opIconText, opSize]}>&#xe803;</Text>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

UploadImgIcon.propTypes = {
  selfStyle: PropTypes.objectOf(PropTypes.object),
  tip: PropTypes.string,
  defaulturi: PropTypes.string,
  showPicOnpress: PropTypes.func,
  opSize: PropTypes.objectOf(PropTypes.object),
};
