import React, { Component } from 'react';
import {
  View,
  Text,
  Switch,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import Input from 'futures/components/AddressInput';
import Dialog from 'futures/components/Dialog';
import Button from 'futures/components/Button';
import RegionPicker from 'futures/components/RegionPicker';
import { request } from 'futures/utils/request';
import { Toast } from 'futures/components/Toast';
import { errtips } from 'futures/constants';

import { colors } from 'futures/components/themes';
import { navOptions, BackBtn } from 'futures/navigations';

import style from './style';

// @flow
type Props = {
  navigation: object,
};

class AddAddress extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
    const title = {
      add: '新建地址',
      edit: '编辑地址',
    };
    const { params } = navigation.state;
    return navOptions(title[params.operation], navOptions.TYPE_RED, {
      headerLeft: <BackBtn navigation={navigation} />,
    });
  };

  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.uId = params.uId;
    this.data = params.data || {};
    const {
      name,
      mobile: phone,
      province,
      city,
      detailed: address,
      defaultAddress: isDefault,
    } = this.data;

    const region = params.operation === 'add' ? '' : `${province} ${city}`;

    this.state = {
      isDefault: Boolean(Number(isDefault)),
      dialogVisible: false,
      name,
      phone,
      isValid: '',
      address,
      province,
      city,
      region,
    };

    this.checkValid = this.checkValid.bind(this);
    this.checkDataValid = this.checkDataValid.bind(this);
    this.confirmSave = this.confirmSave.bind(this);
    this.renderDialog = this.renderDialog.bind(this);
  }

  /** 检验按钮是否可用 */
  checkValid(value) {
    this.setState(value, () => {
      const { name, phone, region, address } = this.state;
      const isValid = name && phone && region && address;

      this.setState({ isValid });
    });
  }

  /** 检验数据是否通过校验 */
  checkDataValid() {
    const { name, phone, address } = this.state;
    /* eslint-disable next-line */
    const namePattern = /^([a-zA-Z0-9\u4e00-\u9fa5]{1,10})$/;
    if (!namePattern.test(name)) {
      this.setState({
        dialogVisible: true,
        dialogText: '联系人姓名长度应为1-10位',
      });
      return false;
    }

    const phonePattern = /^\d{6,20}$/;
    if (!phonePattern.test(phone)) {
      this.setState({
        dialogVisible: true,
        dialogText: '联系方式必须为6-20位数字',
      });
      return false;
    }

    const addPattern = /^([a-zA-Z0-9\u4e00-\u9fa5]{2,50})$/;
    if (!addPattern.test(address)) {
      this.setState({
        dialogVisible: true,
        dialogText: '地址长度应为2-50位',
      });

      return false;
    }

    return true;
  }

  /** 保存地址 */
  async confirmSave() {
    const {
      city,
      province,
      address: detailed,
      phone: mobile,
      name,
      isDefault,
    } = this.state;
    const { updateAddress, updateList } = this.props.navigation.state.params;
    if (!this.checkDataValid()) return;
    try {
      const address = {
        city,
        province,
        detailed,
        mobile,
        name,
      };
      const body = {
        '00': this.uId,
        '53': address,
        '54': `${Number(isDefault)}`,
      };
      let reqCode = '0030';

      if (Object.keys(this.data).length !== 0) {
        body[55] = this.data.id;
        reqCode = '0031';
      }

      const response = await request(reqCode, body);
      Toast.show('操作成功', Toast.SHORT);
      if (updateAddress) {
        address.id = response.id;
        updateAddress(address);
      }

      if (updateList) {
        updateList();
      }

      this.props.navigation.pop();
    } catch (e) {
      Toast.show(errtips[e.code], Toast.SHORT);
    }
  }

  /** 渲染按钮 */
  renderBtn() {
    return (
      <Button
        type="primary"
        subStatus={this.state.isValid ? 'enable' : 'disable'}
        text="保 存"
        disabled={!this.state.isValid}
        onPress={this.confirmSave}
        containerStyle={style.btnContainer}
      />
    );
  }

  renderDialog() {
    const that = this;
    return (
      <Dialog
        visible={this.state.dialogVisible}
        content={this.state.dialogText}
        button={[
          {
            name: '确定',
            callback() {
              that.setState({ dialogVisible: false });
            },
          },
        ]}
      />
    );
  }

  renderRegionPicker() {
    const { province, city } = this.state;

    return (
      <RegionPicker
        onSubmit={params =>
          this.setState(
            {
              region: `${params.province} ${params.city} ${params.area}`,
              province: params.province,
              city: params.city,
            },
            () => {
              this.checkValid({ region: this.state.region });
            }
          )
        }
        selectedProvince={province}
        selectedCity={city}
        // selectedArea={area}
        /* eslint-disable no-console */
        onCancel={() => console.log('cancel')}
      >
        <Input label="所在区域" value={this.state.region} editable={false} />
        <View style={style.choose}>
          <Text style={style.iconText}>
            {this.state.region ? '' : '请选择'}
          </Text>
          <Text style={style.icon}>&#xe802;</Text>
        </View>
      </RegionPicker>
    );
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={style.container}>
          <KeyboardAvoidingView behavior="padding">
            <ScrollView
              keyboardShouldPersistTaps="always"
              scrollEnabled={false}
            >
              <Input
                label="收货人"
                value={this.state.name}
                onChangeText={name => this.checkValid({ name })}
              />
              <Input
                label="联系方式"
                keyboardType="numeric"
                onChangeText={phone => this.checkValid({ phone })}
                value={this.state.phone}
              />
              {this.renderRegionPicker()}
              <View style={style.addDetail}>
                <View style={style.detainContainer}>
                  <TextInput
                    style={style.detailInput}
                    underlineColorAndroid="transparent"
                    multiline
                    numberOfLines={4}
                    placeholder="请填写详细地址"
                    placeholderTextColor={colors[1103]}
                    value={this.state.address}
                    onChangeText={address => this.checkValid({ address })}
                  />
                </View>
              </View>
              <View style={style.setDefaultLine}>
                <Text style={style.setDefault}>设为默认</Text>
                <Switch
                  onValueChange={value => {
                    this.setState({ isDefault: value });
                    this.checkValid();
                  }}
                  value={this.state.isDefault}
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>

          <View>{this.renderDialog()}</View>

          <View style={style.primaryBtn}>{this.renderBtn()}</View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default AddAddress;
