import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  Platform,
  PermissionsAndroid,
  ImagePickerIOS,
  DeviceEventEmitter,
} from 'react-native';
import PropTypes from 'prop-types';

import { sizes } from 'futures/components/themes';
import UploadImgIcon from 'futures/components/UploadImgIcon';
import BottomPicker from 'futures/components/BottomPicker';
import Button from 'futures/components/Button';
import { px2dp } from 'futures/utils/px2dp';
import EventListener from 'futures/utils/EventListener';
import ImagePickerAnd from 'futures/components/ImagePickerAnd';
import { uploadPic } from 'futures/utils/uploadPic';
import Dialog from 'futures/components/Dialog';
import { request } from 'futures/utils/request';

import { Toast } from 'futures/components/Toast';
import errtips from 'futures/constants/errtips';
import BottomOptBar from './BottomOptBar';
import style from './style';

const PERSONPIC = 'http://huisheng.ufile.ucloud.cn/1516676124071u2JJQ8.png';
const EMBLEMPIC = 'http://huisheng.ufile.ucloud.cn/1516772523989I3b644.png';
const HANDINPIC = 'http://huisheng.ufile.ucloud.cn/15167725706406XX45m.png';

export default class IndentyIdCardImg extends Component {
  constructor(props) {
    super(props);

    this.emitEv = '';
    this.uId = '';

    this.state = {
      alertHeader: '',
      alertContent: '',
      alertVisible: false,
      picsNull: true,
    };

    /** update pics */
    this.updatePersonPic = this.updatePersonPic.bind(this);
    this.updateEmblemPic = this.updateEmblemPic.bind(this);
    this.updateHandinPic = this.updateHandinPic.bind(this);

    /** opration to Camera and Gallery */
    this.requestCameraPermission = this.requestCameraPermission.bind(this);
    this.requestGalleryPermission = this.requestGalleryPermission.bind(this);
    this.openCamera = this.openCamera.bind(this);
    this.openAndroidGallery = this.openAndroidGallery.bind(this);
    this.openIosGallery = this.openIosGallery.bind(this);

    /** operation to all layers:Dialog and bottomDrawer */
    this.hideBottomPicker = this.hideBottomPicker.bind(this);
    this.showBottomPicker = this.showBottomPicker.bind(this);
    this.showAlert = this.showAlert.bind(this);

    /** operation to commit inform */
    this.validatePic = this.validatePic.bind(this);

    /** other operation */
    this.getAllPics = this.getAllPics.bind(this);
    this.picsIsNull = this.picsIsNull.bind(this);
    this.validatePic = this.validatePic.bind(this);
  }

  componentDidMount() {
    this.uId = this.props.navigation.state.params.uId;

    const event = {
      hideBottomPicker: this.hideBottomPicker,
      updatePersonPic: this.updatePersonPic,
      updateEmblemPic: this.updateEmblemPic,
      updateHandinPic: this.updateHandinPic,
      picsIsNull: this.picsIsNull,
    };

    EventListener.addEventListen(event);
  }

  componentWillUnmount() {
    EventListener.clearEventListen();
  }

  /** get all pics */
  getAllPics() {
    const picsInfo = {};

    picsInfo.personPic = this.personPic.getPic();
    picsInfo.emblemPic = this.emblemPic.getPic();
    picsInfo.handinPic = this.handinPic.getPic();

    return picsInfo;
  }

  /** check if pic is null */
  picsIsNull() {
    const pics = this.getAllPics();

    const picsVal = Object.keys(pics).map(item => pics[item].showPic);

    const picsNull = picsVal.includes(false);

    this.setState({ picsNull });
  }

  /** 更新人像照片函数 */
  updatePersonPic(uri) {
    this.personPic.addPic(uri);
  }

  /** 更新国徽函数 */
  updateEmblemPic(uri) {
    this.emblemPic.addPic(uri);
  }

  /** 更新手持证件照片 */
  updateHandinPic(uri) {
    this.handinPic.addPic(uri);
  }

  /** 获取相机权限 */
  async requestCameraPermission() {
    if (Platform.OS === 'android') {
      try {
        const result = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );

        if (result) {
          this.openCamera();
          return;
        }

        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: '权限申请',
            message: '软件想要访问您的照相机，是否允许？',
          }
        );

        if (granted) {
          this.openCamera();
        }
      } catch (err) {
        // TODO: 处理获取权限的异常情况
      }
    } else if (Platform.OS === 'ios') {
      this.openCamera();
    }
  }

  /** 打开相机函数 */
  openCamera() {
    const params = { emitEv: this.emitEv };
    this.props.navigation.navigate('ProductIndentiPic', params);
    this.hideBottomPicker();
  }

  /** 获得相册权限 */
  async requestGalleryPermission() {
    if (Platform.OS === 'android') {
      try {
        const result = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );

        if (result) {
          this.openAndroidGallery();
          return;
        }

        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: '权限申请',
            message: '软件想要访问您的照相册，是否允许？',
          }
        );

        if (granted) {
          this.openAndroidGallery();
        }
      } catch (err) {
        // TODO: 处理获取权限的异常情况
      }
    } else if (Platform.OS === 'ios') {
      this.openIosGallery();
    }
  }

  /** open IOS Gallery */
  openIosGallery() {
    ImagePickerIOS.openSelectDialog(
      {},
      async imageUri => {
        this.hideBottomPicker();
        try {
          const cloudPicData = await uploadPic(imageUri);
          DeviceEventEmitter.emit(this.emitEv, cloudPicData);
        } catch (err) {
          Toast.show(errtips[err.code], Toast.SHORT);
        }
      },
      () => {
        this.hideBottomPicker();
      }
    );
  }

  /** 打开Android相册函数  */
  openAndroidGallery() {
    this.hideBottomPicker();
    ImagePickerAnd.openSelectDialog(
      { photoCount: 1 },
      async imageUri => {
        const uri = `file://${imageUri}`;
        try {
          const cloudPicData = await uploadPic(uri);
          DeviceEventEmitter.emit(this.emitEv, cloudPicData);
        } catch (err) {
          Toast.show(errtips[err.code], Toast.SHORT);
        }
      },
      () => {}
    );
  }

  showBottomPicker(emitEv) {
    this.emitEv = emitEv;
    this.bottomPicker.show();
  }

  hideBottomPicker() {
    this.bottomPicker.hide();
  }

  /** 上传身份证照片 */
  async validatePic() {
    const { personPic, emblemPic, handinPic } = this.getAllPics();

    const body = {
      '00': this.uId,
      '20': handinPic.uri,
      '19': `${personPic.uri}!=end=!${emblemPic.uri}`,
    };

    try {
      const result = await request('0023', body);
      if (result === 0) {
        this.ifPass = true;
        this.showAlert('', '上传照片成功，请在‘我的’中查看审核进度');
      }
    } catch (err) {
      Toast.show(errtips[err.code], Toast.SHORT);
    }
  }

  /** show Alert */
  showAlert(title, content) {
    this.setState({
      alertHeader: title,
      alertContent: content,
      alertVisible: true,
    });
  }

  render() {
    const smallPicSize = {
      width: px2dp(330),
      height: px2dp(232),
    };

    const bigPicSize = {
      width: px2dp(680),
      height: px2dp(448),
    };

    const { alertContent, alertHeader, alertVisible, picsNull } = this.state;

    return (
      <ScrollView contentContainerStyle={style.content}>
        <View style={style.picRow}>
          <UploadImgIcon
            showPicOnpress={() => {
              this.showBottomPicker('updatePersonPic');
            }}
            defaulturi={PERSONPIC}
            tip="上传人相照片"
            selfStyle={smallPicSize}
            ref={ref => {
              this.personPic = ref;
            }}
          />
          <UploadImgIcon
            showPicOnpress={() => {
              this.showBottomPicker('updateEmblemPic');
            }}
            defaulturi={EMBLEMPIC}
            tip="上传国徽页照片"
            selfStyle={smallPicSize}
            ref={ref => {
              this.emblemPic = ref;
            }}
          />
        </View>
        <View style={style.singlePic}>
          <UploadImgIcon
            showPicOnpress={() => {
              this.showBottomPicker('updateHandinPic');
            }}
            defaulturi={HANDINPIC}
            tip="上传手持证件照"
            selfStyle={bigPicSize}
            opSize={{ fontSize: sizes.f6 }}
            ref={ref => {
              this.handinPic = ref;
            }}
          />
        </View>
        <Button
          type="primary"
          text="提 交"
          subStatus={picsNull ? 'disable' : 'enable'}
          containerStyle={style.nextBtn}
          onPress={!picsNull && this.validatePic}
        />
        <View style={style.warnTip}>
          <Text style={style.warntext}>
            认证须知：身份证照内容必须包含整个身份证面板，文字及图片必须清晰可见，且未经任何软件进行修改，并在“手持证件照”中确保漏出您的手臂
          </Text>
        </View>
        <BottomPicker
          ref={ref => {
            this.bottomPicker = ref;
          }}
        >
          <BottomOptBar
            cancel={this.hideBottomPicker}
            openCamera={this.requestCameraPermission}
            openGallery={this.requestGalleryPermission}
          />
        </BottomPicker>
        <Dialog
          content={alertContent}
          header={alertHeader}
          button={[
            {
              name: '确定',
              callback: () => {
                if (this.ifPass) {
                  this.props.navigation.goBack();
                }
                this.setState({ alertVisible: false });
              },
            },
          ]}
          visible={alertVisible}
        />
      </ScrollView>
    );
  }
}

IndentyIdCardImg.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.object).isRequired,
};
