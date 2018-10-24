import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Linking } from 'react-native';

import {
  Info,
  NotYetUpload,
  Uploaded,
  ListText,
  UpLoadBtn,
  ServiceBtn,
} from 'futures/components/Personal';
import { request } from 'futures/utils/request';
import { replaceStar } from 'futures/utils/replaceStar';
import { errors } from 'futures/constants';
import { navOptions, BackBtn } from 'futures/navigations';
import { Toast } from 'futures/components/Toast';
import { banks } from 'futures/constants/banks';

import style from './style';

// @flow
type Props = {
  navigation: Object,
};
export default class PersonalDetails extends Component<Props> {
  static callService() {
    Linking.openURL('tel:022-58313111');
  }

  static navigationOptions = ({ navigation }) =>
    navOptions('个人信息', navOptions.TYPE_RED, {
      headerLeft: <BackBtn navigation={navigation} />,
      headerRight: <ServiceBtn />,
    });

  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
    this.getDataFromServer = this.getDataFromServer.bind(this);
    this.renderUpload = this.renderUpload.bind(this);
    this.goUpload = this.goUpload.bind(this);
    this.goAuth = this.goAuth.bind(this);
  }

  componentWillMount() {
    this.uId = this.props.navigation.state.params.uId;
  }

  componentDidMount() {
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.getDataFromServer(this.uId);
      }
    );
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  async getDataFromServer(id) {
    try {
      const data = await request('0007', { '00': id });
      this.setState({ data });
      return;
    } catch (e) {
      switch (e.code) {
        case errors.USER_NOT_EXIST:
          Toast.show('用户不存在', Toast.SHORT);
          break;
        default:
          Toast.show('网络错误, 请稍后重试', Toast.SHORT);
      }
    }
  }

  goUpload() {
    this.props.navigation.navigate('IndentyIdCardImg', { uId: this.uId });
  }

  goAuth() {
    this.props.navigation.navigate('Identity', { uId: this.uId });
  }

  renderUpload(info) {
    const { rmAnFlg } = this.state.data;

    if (rmAnFlg) {
      return (
        <View style={style.operationBox}>
          <Uploaded status={rmAnFlg} personal={info} onPress={this.goUpload} />
        </View>
      );
    }

    return null;
  }

  render() {
    const {
      realName,
      mobile,
      bankName,
      bankCardNo,
      idCard,
      rmAnFlg,
    } = this.state.data;

    const { goUpload, goAuth } = this;
    const name = realName && replaceStar(realName, 0, -1);
    const id = idCard && replaceStar(idCard, 1, 16);
    const bankInfo =
      bankName && `${banks[bankName].name}(尾号${bankCardNo.slice(-4)})`;
    const bankIcon = bankName && banks[bankName].icon;

    const authInfo = {
      '0': {
        btnText: '前往上传',
        infoText: ' 您目前尚未上传身份证信息！',
        jumpTo() {
          goUpload();
        },
      },
      '4': {
        btnText: '前往认证',
        infoText: ' 您目前尚未进行身份认证',
        jumpTo() {
          goAuth();
        },
      },
    };

    return (
      <ScrollView style={style.body}>
        <View>
          <Info>
            <ListText value="真实姓名" />
            <ListText value={name} />
          </Info>

          <Info>
            <ListText value="身份证号" />
            <ListText value={id} />
          </Info>

          <Info>
            <ListText value="手机号" />
            <ListText value={mobile && replaceStar(mobile, 3, 4)} />
          </Info>

          <Info>
            <ListText value="银行卡号" />
            <View style={style.row}>
              <Image source={{ uri: bankIcon }} style={style.bankIcon} />
              <ListText value={bankInfo} />
            </View>
          </Info>
        </View>
        <View style={style.middle}>
          <View style={style.authBox}>
            <Text style={style.header}>身份认证</Text>
            {rmAnFlg === '0' || rmAnFlg === '4' ? (
              <NotYetUpload>
                <UpLoadBtn
                  value={authInfo[rmAnFlg].btnText}
                  onPress={() => authInfo[rmAnFlg].jumpTo()}
                />
                <Text style={style.notUploadText}>
                  {authInfo[rmAnFlg].infoText}
                </Text>
              </NotYetUpload>
            ) : (
              this.renderUpload(`${name} (${id})`)
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
}
